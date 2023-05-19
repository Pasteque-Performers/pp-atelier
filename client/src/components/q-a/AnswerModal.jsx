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
  background-color: #100E04;
  color: white;
  border-radius: 25px;
`;

const ImgBox = styled.label`
  margin: 10px 15px 0 0;
  width: auto;
  height: 60px;
`;

const CloseButton = styled.input`
  background-color: #100E04;
  color: white;
  border-radius: 25px;
  margin-left: auto;
`;

const UserInfo = styled.input`
  flex-grow: 1;
  height: 30px;
  margin: 0px 0 0px 10px;
  border-radius: 25px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  width: 550px;
  flex-direction: column;
  margin: 10px 0 10px 0;
`;

const UserInfoLabel = styled.label`
  display: flex;
  margin: 10px 0 0 0;
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
        getAnswers(1);
      })
      .catch((error) => console.log('Error posting new answer', error));
  };

  return (
    <ModalOverlay onClick={() => setDisplayModal(false)}>
      <AnswerForm onClick={(e) => e.stopPropagation()} onSubmit={() => {
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
          <label style={{ display: 'flex', alignItems: 'justify-content' }}>Your Answer:
            <input
            type='text'
            onChange={(e) => setBody(e.target.value)}
            style={{ width: '500px', height: '300px', marginLeft: '10px' }}/>
          </label>
        </div>
        <UserInfoContainer>
          <UserInfoLabel>Your Username:
            <UserInfo type='text' onChange={(e) => setName(e.target.value)} style={{ width: '150px', height: '30px' }}/>
          </UserInfoLabel>
          <UserInfoLabel>Your Email Address:
            <UserInfo type='text' onChange={(e) => setEmail(e.target.value)} style={{ width: '150px', height: '30px' }}/>
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
        <CloseButton type='submit' value='Submit Answer' />
        </ImageUpload>
      </AnswerForm>
    </ModalOverlay>
  );
};

export default AnswerModal;
