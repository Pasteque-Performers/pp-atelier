import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QaContainer from './QaContainer.jsx';

const QaBody = ({ productId }) => {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState([]);

  const getQuestons = (page) => {
    const pageCount = page;
    const questionsList = [];

    axios.get(`/classes/qa/questions?${productId}?page=${pageCount}&count=10`)
      .then((results) => {
        console.log(results);
        questionsList.concat(results);
        if (results.length > 0) {
          getQuestons(pageCount + 1);
        } else {
          setQuestions(questionsList);
        }
      })
      .catch((error) => {
        console.log('Error getting questions from product', error);
      });
  };

  useEffect(() => {
    getQuestons(1);
  }, [productId]);

  return (
    <div>
      <h3>QaBody</h3>
      <QaContainer />
    </div>
  );
};

export default QaBody;
