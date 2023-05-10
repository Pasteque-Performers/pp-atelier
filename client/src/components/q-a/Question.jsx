import React, { useEffect, useState } from 'react';
import Answer from './Answer.jsx';

const Question = ({ question }) => {
  const [answers, setAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState([]);



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
          )) : <li>Loading Answers...</li>}
        </ul>
        {showAnswers.length !== answers.length ? <button>Load More Answers</button> : null}
    </div>
  );
};

export default Question;
