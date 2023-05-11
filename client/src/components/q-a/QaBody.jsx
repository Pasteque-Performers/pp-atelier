import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Question from './Question.jsx';

const QaBody = ({ productId }) => {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState([]);
  const [searching, setSearching] = useState(false);

  const getQuestions = (page) => {
    let pageCount = page;
    const count = 100;
    let questionsList = [];

    const recursiveRequest = () => {
      axios.get('/classes/qa/questions', {
        params: {
          product_id: productId,
          page: pageCount,
          count,
        },
      })
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

  const searchQuestions = (input) => {
    if (input) {
      setSearching(true);
      const searchResult = questions.filter((question) => question.question_body
        .toLowerCase().includes(input.toLowerCase()));
      setShowQuestions(searchResult);
    }
    if (!input) {
      setSearching(false);
      setShowQuestions(questions.slice(0, 2));
    }
  };

  useEffect(() => {
    getQuestions(1);
  }, [productId]);

  return (
    <div>
      <h3>Search for a Question</h3>
      <input type="text" placeholder="Type in your question" onChange={(e) => searchQuestions(e.target.value)}/>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {questions.length ? showQuestions.map((question, i) => (
          <li key={i}>
            <Question question={question} getQuestions={getQuestions} />
          </li>
        )) : <li>Loading Questions...</li>}
      </ul>
      {showQuestions.length !== questions.length && searching === false
        ? <button onClick={loadMoreQuestions}>Load More Questions</button> : null}
      <button>Ask a Question</button>
    </div>
  );
};

export default QaBody;
