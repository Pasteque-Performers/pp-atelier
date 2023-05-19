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
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CloseBtn = styled.input`
  width: 70px;
  height: 30px;
  background-color: #100E04;
  color: white;
  border-radius: 25px;
`;

const SubmitBtn = styled.input`
  width: 130px;
  height: 30px;
  background-color: #100E04;
  color: white;
  border-radius: 25px;
`;

const QuestionBody = styled.textarea`
  width: 500px;
  height: 350px;
  display: block;
  border-radius: 25px;
  vertical-align: top;
  padding: 10px;
  font-size: 15px;
  font-family: inherit;
`;

const UserInfo = styled.input`
  width: 300px;
  height: 30px;
  display: block;
  border-radius: 25px;
  font-size: 15px;
  padding: 0 0 0 10px;
  font-family: inherit;
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
        getQuestions();
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
        <label>Your Question*:
          <QuestionBody onChange={(e) => setBody(e.target.value)} required maxLength={1000}/>
        </label>
        <label>Your Username*:
          <UserInfo type='text' onChange={(e) => setName(e.target.value)} required maxLength={60}/>
        </label>
        <label>Your Email Address*:
          <UserInfo type='text' onChange={(e) => setEmail(e.target.value)} required maxLength={60}/>
        </label>
        <SubmitBtn type="submit" value="Submit Question"/>
      </QuestionForm>
    </ModalOverlay>
  );
};

export default QuestionModal;
