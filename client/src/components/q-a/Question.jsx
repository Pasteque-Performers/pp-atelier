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
  max-width: 1100px;
  height: auto;
  display: flex;
  justify-content: space-between;
`;

const QuestionButton = styled.button`
  background-color: #100E04;
  color: white;
  border-radius: 25px;
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

  // const getAnswers = (page) => {
  //   let pageCount = page;
  //   const count = 900;
  //   let answersList = [];

  //   const recursiveRequest = () => {
  //     axios.get(`/classes/qa/questions/${question.question_id}/answers/`, {
  //       params: {
  //         page: pageCount,
  //         count,
  //       },
  //     })
  //       .then((results) => {
  //         answersList = [...answersList, ...results.data];
  //         if (results.data.length > 0) {
  //           pageCount += 1;
  //           recursiveRequest();
  //         } else {
  //           setAnswers(answersList);
  //           setShowAnswers(answersList.slice(0, 4));
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(`Error getting answers from question ${question.question_body}`, error);
  //       });
  //   };
  //   recursiveRequest();
  // };

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
      questionId={question.question_id} getAnswers={getAnswers} question={question.question_body}/>}
      <QuestionButtonContainer>
        <div><BoldTitle>Q: </BoldTitle>{question.question_body}</div>
        <QuestionAndReportBtns>
            <div>Helpful? {!helpfulQuestions.includes(question.question_id)
              ? <QuestionButton onClick={updateQuestionHelpfulness}>
              Yes({question.question_helpfulness})</QuestionButton>
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
              helpfulAnswers={helpfulAnswers}
              setHelpfulAnswers={setHelpfulAnswers}
              setReportedAnswer={setReportedAnswer}
              BoldTitle={BoldTitle}
              QuestionButton={QuestionButton}/>
            </AnswerElement>
          )) : <li>No answers yet</li>}
        </ul>
        {showAnswers.length < answers.length && !loadedAnswers && (
        <QuestionButton onClick={loadMoreAnswers}>Load More Answers</QuestionButton>
        )}
        {loadedAnswers && (
          <QuestionButton onClick={collaposeAnswersList}>Collapse Answers List</QuestionButton>
        )}
    </div>
  );
};

export default Question;
