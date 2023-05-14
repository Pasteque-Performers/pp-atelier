import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Answer from './Answer.jsx';
import AnswerModal from './AnswerModal.jsx';

const AnswerElement = styled.li`
  margin-top: 10px;
`;

const QuestionButtonContainer = styled.div`
  max-width: 1100px;
  height: auto;
  display: flex;
  justify-content: space-between;
`;

const QuestionAndReportBtns = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  gap: 20px;
`;

const Question = ({
  question, getQuestions, helpfulQuestions, setHelpfulQuestions, setReportedQuestion,
}) => {
  const [answers, setAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState([]);
  const [loadedAnswers, setLoadedAnswers] = useState(false);
  const [helpfulAnswers, setHelpfulAnswers] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);

  const getAnswers = (page) => {
    let pageCount = page;
    const count = 900;
    let answersList = [];

    const recursiveRequest = () => {
      axios.get(`/classes/qa/questions/${question.question_id}/answers/`, {
        params: {
          page: pageCount,
          count,
        },
      })
        .then((results) => {
          answersList = [...answersList, ...results.data];
          if (results.data.length > 0) {
            pageCount += 1;
            recursiveRequest();
          } else {
            setAnswers(answersList);
            setShowAnswers(answersList.slice(0, 4));
          }
        })
        .catch((error) => {
          console.log(`Error getting answers from question ${question.question_body}`, error);
        });
    };
    recursiveRequest();
  };

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
        setHelpfulQuestions([...helpfulQuestions, questionId]);
        getQuestions(1);
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

  useEffect(() => {
    getAnswers(1);
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
      questionId={question.question_id} getAnswers={getAnswers} question={question.question_body}/>}
      <QuestionButtonContainer>
        <div><strong>Q: </strong>{question.question_body}</div>
        <QuestionAndReportBtns>
            <div>Helpful? {!helpfulQuestions.includes(question.question_id)
              ? <button onClick={updateQuestionHelpfulness}>
              Yes({question.question_helpfulness})</button>
              : <span>Yes({question.question_helpfulness})</span>}
            </div>
            <button onClick={reportQuestion}>Report Question</button>
        </QuestionAndReportBtns>
      </QuestionButtonContainer>
      <button onClick={() => setDisplayModal(true)}>Add an Answer</button>
      <ul>
          {answers.length ? showAnswers.map((answer, i) => (
            <AnswerElement key={i}>
              <Answer answer={answer} getAnswers={getAnswers}
              helpfulAnswers={helpfulAnswers} setHelpfulAnswers={setHelpfulAnswers}
              setReportedAnswer={setReportedAnswer}/>
            </AnswerElement>
          )) : <li>No answers yet</li>}
        </ul>
        {showAnswers.length < answers.length && !loadedAnswers && (
        <button onClick={loadMoreAnswers}>Load More Answers</button>
        )}
        {loadedAnswers && (
          <button onClick={collaposeAnswersList}>Collapse Answers List</button>
        )}
    </div>
  );
};

export default Question;
