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
    width: 80%;
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
    text-align: center;
`;

const AddReviewModalMain = () => (
  <ModalOverlay>
    <ModalContainer>
       <Title>Write your Review Here</Title>
       <OverallStarRating/>
       <DoYouRecommend/>
       <ProductCharacteristics/>
       <ReviewSummary/>
       <ReviewBody/>
       <UploadPhotos/>
       <DisplayName/>
       <ReviewEmail/>
    </ModalContainer>
  </ModalOverlay>
);

export default AddReviewModalMain;
