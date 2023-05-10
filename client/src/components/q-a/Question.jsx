import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';

const Question = ({ question }) => {
  const [answers, setAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState([]);

  const getAnswers = (page) => {
    let pageCount = page;
    const count = 999;
    let answersList = [];

    const recursiveRequest = () => {
      axios.get(`/classes/qa/questions/${question.question_id}/answers/${pageCount}/${count}`)
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
          console.log('Error getting answers from question', error);
        });
    };
    recursiveRequest();
  };

  const loadMoreAnswers = () => {
    setShowAnswers(answers);
  };

  useEffect(() => {
    getAnswers(1);
  }, [question.question_id]);

  return (
    <div>
      <div>Q: {question.question_body}</div>
      <div>Helpful? <button>Yes({question.question_helpfulness})</button></div>
      <button>Add an Answer</button>
      <ul>
          {answers.length ? showAnswers.map((answer, i) => (
            <li key={i}>
              <Answer answer={answer}/>
            </li>
          )) : <li>No answers yet</li>}
        </ul>
        {showAnswers.length !== answers.length ? <button onClick={loadMoreAnswers}>
          Load More Answers</button> : null}
    </div>
  );
};

export default Question;
