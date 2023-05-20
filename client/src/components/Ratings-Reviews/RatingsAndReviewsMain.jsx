import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReviewListMain from './ReviewList/ReviewListMain.jsx';
import ReviewBreakdownMain from './ReviewBreakdown/ReviewBreakdownMain.jsx';
import styled from 'styled-components';

const ReviewContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin: 20px;
`;

const RatingsAndReviewsMain = ({ productId, metaData }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('classes/reviews', { params: { productId } })
      .then((response) => {
        console.log('successfully got review data', response.data);
        setReviews(response.data.results);
      })
      .catch((err) => {
        console.error('Error getting reviews', err);
      });
  }, [productId]);

  return (
    <ReviewContainer>
      <ReviewBreakdownMain metaData={metaData}/>
      <ReviewListMain metaData={metaData} reviews={reviews} setReviews={setReviews}
       productId={productId}/>
    </ReviewContainer>
  );
};

export default RatingsAndReviewsMain;
