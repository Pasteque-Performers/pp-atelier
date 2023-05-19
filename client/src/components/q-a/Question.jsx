import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Answer from './Answer.jsx';
import AnswerModal from './AnswerModal.jsx';

const AnswerElement = styled.li`
  margin-top: 10px;
`;

const BoldTitle = styled.strong`
  font-size: 20px;
`;

const QuestionButtonContainer = styled.div`
  max-width: 1500px;
  height: auto;
  display: flex;
`;

const QuestionButton = styled.button`
  background-color: #20bf55;
  margin-top: 5px;
  border: none;
  color: white;
  padding: 5px 10px 5px 10px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease; /* Make the hover transition smooth */
  &:hover {
    background-color: #eb3b5a; /* Watermelon red/pink color on hover */
  }
`;

const QuestionAndReportBtns = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 20px;
  cursor: pointer;
`;

const HelpfulButton = styled.button`
  border: none;
  text-decoration: underline;
  background: none;
  color: #100E04;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
`;

const Question = ({
  question, getQuestions, questions, setQuestions,
  setShowQuestions, setReportedQuestion, loadedQuestions,
}) => {
  const [answers, setAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState([]);
  const [loadedAnswers, setLoadedAnswers] = useState(false);
  const [helpfulAnswers, setHelpfulAnswers] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);

  const loadMoreAnswers = () => {
    setLoadedAnswers(true);
    setShowAnswers(answers);
  };

  const collaposeAnswersList = () => {
    setLoadedAnswers(false);
    setShowAnswers(answers.slice(0, 4));
  };

  const updateQuestionHelpfulness = () => {
    const questionId = question.question_id;
    axios.put(`/classes/qa/questions/${questionId}/helpful`, null)
      .then(() => {
        localStorage[questionId] = questionId;
        const updatedQuestion = {
          ...question,
          question_helpfulness: question.question_helpfulness + 1,
        };
        const updatedQuestions = [...questions, updatedQuestion];
        const sortedArray = updatedQuestions.sort((a, b) => b.question_helpfulness
        - a.question_helpfulness);
        setQuestions(sortedArray);
        if (loadedQuestions) {
          setShowQuestions(sortedArray);
        } else {
          setShowQuestions(sortedArray.slice(0, 2));
        }
      })
      .catch((error) => console.log('Error updating question helpfulness:', error));
  };

  const reportQuestion = () => {
    const questionId = question.question_id;
    axios.put(`/classes/qa/questions/${questionId}/report`, null)
      .then(() => {
        setReportedQuestion(questionId);
      })
      .catch((error) => {
        console.log('Error reporting question', error);
      });
  };

  const setReportedAnswer = (answerId) => {
    const updatedAnswers = answers.filter((answer) => answer.answer_id !== answerId);
    setAnswers(updatedAnswers);
    if (loadedAnswers === false) {
      setShowAnswers(updatedAnswers.slice(0, 2));
    } else {
      setShowAnswers(updatedAnswers);
    }
  };

  const getAnswers = () => {
    const questionId = question.question_id;
    axios.get(`classes/qa/questions/${questionId}/answers`, {
      params: {
        page: 1,
        count: 10,
      },
    })
      .then((results) => {
        setAnswers(results.data);
        if (loadedAnswers) {
          setShowAnswers(results.data);
        } else {
          setShowAnswers(results.data.slice(0, 2));
        }
      })
      .catch((error) => console.log('Error getting answers after updating answer helpfulness', error));
  };

  useEffect(() => {
    setAnswers(question.answersList);
    if (loadedAnswers) {
      setShowAnswers(question.answersList);
    } else {
      setShowAnswers(question.answersList.slice(0, 4));
    }
  }, [question.question_id]);

  useEffect(() => {
    if (displayModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [displayModal]);

  return (
    <div>
      {displayModal && <AnswerModal setDisplayModal={setDisplayModal}
      questionId={question.question_id} getAnswers={getAnswers}
       question={question.question_body}/>}
      <QuestionButtonContainer>
        <div><BoldTitle>Q: </BoldTitle>{question.question_body}</div>
        <QuestionAndReportBtns>
            <div>Was this quesiton helpful? {!localStorage[question.question_id]
              ? <HelpfulButton onClick={updateQuestionHelpfulness}>
              Yes({question.question_helpfulness})</HelpfulButton>
              : <span>Yes({question.question_helpfulness})</span>}
            </div>
            <QuestionButton onClick={reportQuestion}>Report Question</QuestionButton>
        </QuestionAndReportBtns>
      </QuestionButtonContainer>
      <QuestionButton onClick={() => setDisplayModal(true)}>Add an Answer</QuestionButton>
      <ul>
          {question.answersList.length ? showAnswers.map((answer, i) => (
            <AnswerElement key={i}>
              <Answer answer={answer}
              getAnswers={getAnswers}
              helpfulAnswers={helpfulAnswers}
              setHelpfulAnswers={setHelpfulAnswers}
              setReportedAnswer={setReportedAnswer}
              BoldTitle={BoldTitle}
              QuestionButton={QuestionButton}
              HelpfulButton={HelpfulButton}/>
            </AnswerElement>
          )) : <li>No answers yet</li>}
        </ul>
        {showAnswers.length < answers.length && !loadedAnswers && (
        <QuestionButton onClick={loadMoreAnswers} style={{ marginTop: '5px' }}>Load More Answers</QuestionButton>
        )}
        {loadedAnswers && (
          <QuestionButton onClick={collaposeAnswersList}>Collapse Answers List</QuestionButton>
        )}
    </div>
  );
};

export default Question;
