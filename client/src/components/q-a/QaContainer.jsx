import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question.jsx';
import Answer from './Answer.jsx';

const QaContainer = () => {

  return (
    <div>
      <Question />
      <Answer />
    </div>
  );
};

export default QaContainer;
