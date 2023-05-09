import React from 'react';
import Answer from './Answer.jsx';

const Question = ({ question }) => (
  <div>
    <div>Q: {question.question_body}</div>
    <div>Helpful? {question.question_helpfulness}</div>
    <button>Add an Answer</button>
    <Answer />
  </div>
);

export default Question;
