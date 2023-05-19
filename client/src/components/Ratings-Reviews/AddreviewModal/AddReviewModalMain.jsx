import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ProductCharacteristics from './ProductCharacteristics.jsx';
import OverallStarRating from './OverallStarRating.jsx';
import DoYouRecommend from './DoYouRecommend.jsx';
import ReviewBody from './ReviewBody.jsx';
import ReviewSummary from './ReviewSummary.jsx';
import DisplayName from './DisplayName.jsx';
import UploadPhotos from './UploadPhotos.jsx';
import ReviewEmail from './ReviewEmail.jsx';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background-color: white;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0,0,0,0.25);
    z-index: 1000;
`;

const Title = styled.h2`
    margin-top: 0;
    color: #333;
    font-size: 24px;
    font-weight: 500;
    font-family: 'Manrope', sans-serif;
    text-align: center;
`;

const ComponentTitle = styled.h3`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  font-family: 'Manrope', sans-serif;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
padding: 10px 20px;
  border: none;
  background-color: #20bf55; /* Green color */
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease; /* Make the hover transition smooth */
  &:hover {
    background-color: #eb3b5a; /* Watermelon red/pink color on hover */
  }`;

const AddReviewModalMain = ({ metaData, productId, setShowModal }) => {
  const [formData, setFormData] = useState({
    body: '',
    name: '',
    rating: 0,
    summary: '',
    photos: [],
    email: '',
    recommend: null,
  });

  const [characteristics, setCharacteristics] = useState({});

  const handleFormDataChange = (event) => {
    const { value, name } = event.target;
    let parsedValue = value;
    if (name === 'recommend') {
      parsedValue = (value === 'true');
    }
    setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

  const handleSubmitClick = () => {
    axios.post('/classes/reviews', { ...formData, characteristics, productId })
      .then((response) => {
        console.log('successfully posted review data', response.data);
        setShowModal(false);
      })
      .catch((err) => {
        console.error('Error postong review data', err);
      });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <ModalOverlay>
    <ModalContainer>
       <Title>Write your Review Here</Title>
       <ComponentTitle>Overall rating (mandatory)</ComponentTitle>
       <OverallStarRating formData={formData} handleChange={handleFormDataChange}/>

       <ComponentTitle>Do you recommend this product? (mandatory)</ComponentTitle>
       <DoYouRecommend formData={formData} handleChange={handleFormDataChange}/>

       <ComponentTitle>Characteristics (mandatory)</ComponentTitle>
       <ProductCharacteristics characteristics={characteristics}
       setCharacteristics={setCharacteristics}
       characteristicsData={metaData.characteristics}/>

       <ComponentTitle>Review summary</ComponentTitle>
       <ReviewSummary formData={formData} handleChange={handleFormDataChange}/>

       <ComponentTitle>Review body (mandatory)</ComponentTitle>
       <ReviewBody formData={formData} handleChange={handleFormDataChange}/>

       <ComponentTitle>Upload your photos</ComponentTitle>
       <UploadPhotos formData={formData} handleChange={handleFormDataChange}/>

       <ComponentTitle>What is your nickname (mandatory)</ComponentTitle>
       <DisplayName formData={formData} handleChange={handleFormDataChange}/>

       <ComponentTitle>Your email (mandatory)</ComponentTitle>
       <ReviewEmail formData={formData} handleChange={handleFormDataChange}/>
       <ButtonContainer>
         <Button onClick={handleSubmitClick}>Submit review</Button>
         <Button onClick={handleClose}>Close</Button>
       </ButtonContainer>
    </ModalContainer>
  </ModalOverlay>
  );
};

export default AddReviewModalMain;
