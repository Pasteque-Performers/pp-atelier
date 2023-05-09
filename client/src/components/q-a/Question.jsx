import React from 'react';

const Question = ({ question }) => (
  <div>Individual Question
    <div>Q: {question.id}</div>
    <div>Helpful? {question.helpfulness}</div>
    <button>Add an Answer</button>
    <div></div>
  </div>
);

export default Question;
