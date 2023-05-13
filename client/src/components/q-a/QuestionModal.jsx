import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-item: center;
`;

const QuestionForm = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const QuestionModal = ({ getQuestions, productId, setDisplayModal }) => {
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const postQuestion = () => {
    axios.post('/classes/qa/questions', {
      body,
      name,
      email,
      product_id: productId,
    })
      .then(() => {
        getQuestions(1);
      })
      .catch((error) => {
        console.log('Error attempting to post new question', error);
      });
  };

  return (
    <ModalOverlay>
      <button onClick={() => setDisplayModal(false)}>Close</button>
      <QuestionForm onSubmit={() => {
        postQuestion();
        setDisplayModal(false);
      }}>
        <h1>Ask your question about the product</h1>
        <label>Your Question:
          <input type='text' onChange={(e) => setBody(e.target.value)}/>
        </label>
        <label>Your Username:
          <input type='text' onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>Your Email Address:
          <input type='text' onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <input type="submit" value="Submit Question"></input>
      </QuestionForm>
    </ModalOverlay>
  );
};

export default QuestionModal;
