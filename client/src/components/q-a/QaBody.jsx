import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Question from './Question.jsx';

const QaBody = ({ productId }) => {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState([]);

  const getQuestions = (page) => {
    let pageCount = page;
    const count = 999;
    let questionsList = [];

    const recursiveRequest = () => {
      axios.get(`/classes/qa/questions/${productId}/${pageCount}/${count}`)
        .then((results) => {
          questionsList = [...questionsList, ...results.data];
          if (results.data.length > 0) {
            pageCount += 1;
            recursiveRequest();
          } else {
            setQuestions(questionsList);
            setShowQuestions(questionsList.slice(0, 2));
          }
        })
        .catch((error) => {
          console.log('Error getting questions from product', error);
        });
    };
    recursiveRequest();
  };

  const loadMoreQuestions = () => {
    setShowQuestions(questions);
  };

  useEffect(() => {
    getQuestions(1);
  }, [productId]);

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {questions.length ? showQuestions.map((question, i) => (
          <li key={i}>
            <Question question={question} />
          </li>
        )) : <li>Loading Questions...</li>}
      </ul>
      {showQuestions.length !== questions.length ? <button onClick={loadMoreQuestions}>
        Load More Questions</button> : null}
      <button>Ask a Question</button>
    </div>
  );
};

export default QaBody;
