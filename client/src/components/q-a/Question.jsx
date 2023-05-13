import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';
import AnswerModal from './AnswerModal.jsx';

const Question = ({
  question, getQuestions, helpfulQuestions, setHelpfulQuestions,
}) => {
  const [answers, setAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState([]);
  const [loadedAnswers, setLoadedAnswers] = useState(false);
  const [helpfulAnswers, setHelpfulAnswers] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);

  const getAnswers = (page) => {
    let pageCount = page;
    const count = 100;
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
        getQuestions(1);
      })
      .catch((error) => {
        console.log('Error reporting question', error);
      });
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
      <div>Q: {question.question_body}</div>
      <div>Helpful? {!helpfulQuestions.includes(question.question_id)
        ? <button onClick={updateQuestionHelpfulness}>
        Yes({question.question_helpfulness})</button>
        : <span>Yes({question.question_helpfulness})</span>}
        <button onClick={reportQuestion}>Report Question</button>
        </div>
      <button onClick={() => setDisplayModal(true)}>Add an Answer</button>
      <ul>
          {answers.length ? showAnswers.map((answer, i) => (
            <li key={i}>
              <Answer answer={answer} getAnswers={getAnswers}
              helpfulAnswers={helpfulAnswers} setHelpfulAnswers={setHelpfulAnswers}/>
            </li>
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
