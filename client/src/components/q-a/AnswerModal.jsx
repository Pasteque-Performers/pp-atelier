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

const AnswerForm = styled.form`
  margin-top: 40px;
  width: 50vw;
  height: 800px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const CloseBtn = styled.input`
  width: 70px;
  height: 30px;
`;

const ImgBox = styled.label`
  margin-top: 10px;
  width: 60px;
  height: 60px;
  border: 2px solid black;
`;

const AnswerModal = ({
  questionId, setDisplayModal, getAnswers, question,
}) => {
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);

  // const handlePhotoChange = (event, index) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onLoad = (e) => {
  //     const dataUrl = reader.result;
  //     const cloudinaryUrl = `https://res.cloudinary.com/fec-cars/image/upload/${index + 1}/${encodeURIComponent(file.name)}`;
  //     const updatedPhotos = [...photos];
  //     updatedPhotos[index] = cloudinaryUrl;
  //     setPhotos(updatedPhotos);
  //   };

  //   reader.readAsDataURL(file);
  // };

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
        <div>
          <label>Your Username:
            <input type='text' onChange={(e) => setName(e.target.value)} style={{ width: '150px', height: '30px' }}/>
          </label>
        </div>
        <div>
          <label>Your Email Address:
            <input type='text' onChange={(e) => setEmail(e.target.value)} style={{ width: '150px', height: '30px' }}/>
          </label>
        </div>
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
        <input type='submit' value='Submit Answer' />
      </AnswerForm>
    </ModalOverlay>
  );
};

export default AnswerModal;
