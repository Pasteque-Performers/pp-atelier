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
`;

const ImageUpload = styled.div`
  width: auto;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-items: space-between;
`;

const AnswerForm = styled.form`
  margin-top: 40px;
  width: 50vw;
  height: auto;
  background-color: white;
  padding: 20px;
  border-radius: 25px;
`;

const CloseBtn = styled.input`
  width: 70px;
  height: 30px;
  background-color: #20bf55;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease; /* Make the hover transition smooth */
  &:hover {
    background-color: #eb3b5a; /* Watermelon red/pink color on hover */
  }
`;

const ImgBox = styled.label`
  margin: 10px 15px 0 0;
  width: auto;
  height: 60px;
`;

const SubmitBtn = styled.input`
  background-color: #20bf55;
  color: white;
  border-radius: 25px;
  border: none;
  padding: 10px 15px 10px 15px;
  margin-left: auto;
  cursor: pointer;
  transition: all 0.3s ease; /* Make the hover transition smooth */
  &:hover {
    background-color: #eb3b5a; /* Watermelon red/pink color on hover */
  }
`;

const UserInfo = styled.input`
  flex-grow: 1;
  height: 30px;
  margin: 5px 0 0 0;
  border-radius: 25px;
  padding-left: 10px;
  font-family: inherit;
  font-size: 15px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  width: 550px;
  flex-direction: column;
  margin: 10px 0 10px 0;
`;

const UserInfoLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 90px;
`;

const AnswerTextBox = styled.textarea`
  width: 500px;
  height: 300px;
  display: block;
  vertical-align: top;
  padding: 10px;
  font-family: inherit;
  font-size: 15px;
  margin: 10px 0 0 0;
  border: 2px solid;
  border-radius: 25px;
`;

const AnswerTextBoxLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-left: 90px;
`;

const AnswerModal = ({
  questionId, setDisplayModal, getAnswers, question,
}) => {
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);

  const insertPhotos = (index, url) => {
    const updatedPhoto = [...photos];
    updatedPhoto[index] = url;
    setPhotos(updatedPhoto);
  };

  const postAnswer = () => {
    const filteredPhotos = photos.filter((photo) => !!photo);
    axios.post(`/classes/qa/questions/${questionId}/answers`, {
      body,
      name,
      email,
      photos: filteredPhotos,
    })
      .then(() => {
        getAnswers();
      })
      .catch((error) => console.log('Error posting new answer', error));
  };

  return (
    <ModalOverlay onClick={() => setDisplayModal(false)}>
      <AnswerForm onClick={(e) => e.stopPropagation()} onSubmit={(e) => {
        e.preventDefault();
        postAnswer();
        setDisplayModal(false);
      }}>
        <CloseBtn type='submit' onClick={(e) => {
          e.preventDefault();
          setDisplayModal(false);
        }} value='Close'/>
        <h1>Add an answer for:</h1>
        <h3>{question}</h3>
        <div>
          <AnswerTextBoxLabel >Your Answer*:
            <AnswerTextBox
            type='text'
            onChange={(e) => setBody(e.target.value)}
            required
            maxLength={1000}/>
          </AnswerTextBoxLabel>
        </div>
        <UserInfoContainer>
          <UserInfoLabel>Your Username*:
            <UserInfo type='text' onChange={(e) => setName(e.target.value)} required maxLength={60}/>
          </UserInfoLabel>
          <UserInfoLabel>Your Email Address*:
            <UserInfo type='text' onChange={(e) => setEmail(e.target.value)} required maxLength={60}/>
          </UserInfoLabel>
        </UserInfoContainer>
        <ImageUpload>
        <ImgBox>Photo 1:
          <input type='text' placeholder='Insert Photo URL' onChange={(e) => insertPhotos(0, e.target.value)} />
        </ImgBox>
        <ImgBox>Photo 2:
          <input type='text' placeholder='Insert Photo URL' onChange={(e) => insertPhotos(1, e.target.value)} />
        </ImgBox>
        <ImgBox>Photo 3:
          <input type='text' placeholder='Insert Photo URL' onChange={(e) => insertPhotos(2, e.target.value)} />
        </ImgBox>
        <ImgBox>Photo 4:
          <input type='text' placeholder='Insert Photo URL' onChange={(e) => insertPhotos(3, e.target.value)} />
        </ImgBox>
        <ImgBox>Photo 5:
          <input type='text' placeholder='Insert Photo URL' onChange={(e) => insertPhotos(4, e.target.value)} />
        </ImgBox>
        <SubmitBtn type='submit' value='Submit Answer' />
        </ImageUpload>
      </AnswerForm>
    </ModalOverlay>
  );
};

export default AnswerModal;
