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
  align-items: center;
  padding: 40px;
`;

const QuestionForm = styled.form`
  background-color: white;
  max-height: 1200px;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CloseBtn = styled.input`
  width: 70px;
  height: 30px;
`;

const SubmitBtn = styled.input`
  width: 130px;
  height: 30px;
`;

const QuestionBody = styled.input`
  width: 500px;
  height: 350px;
  display: block;
`;

const UserInfo = styled.input`
  width: 300px;
  height: 30px;
  display: block;
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
    <ModalOverlay onClick={() => setDisplayModal(false)}>
      <QuestionForm onClick={(e) => e.stopPropagation()} onSubmit={() => {
        postQuestion();
        setDisplayModal(false);
      }}>
        <CloseBtn type='submit' onClick={(e) => {
          e.preventDefault();
          setDisplayModal(false);
        }} value='Close'/>
        <h1>Ask your question about the product</h1>
        <label>Your Question:
          <QuestionBody type='text' onChange={(e) => setBody(e.target.value)}/>
        </label>
        <label>Your Username:
          <UserInfo type='text' onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>Your Email Address:
          <UserInfo type='text' onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <SubmitBtn type="submit" value="Submit Question"/>
      </QuestionForm>
    </ModalOverlay>
  );
};

export default QuestionModal;
