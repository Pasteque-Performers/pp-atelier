import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewListTile from './ReviewListTile.jsx';
import AddReviewModalMain from '../AddReviewModal/AddReviewModalMain.jsx';
import styled from 'styled-components';

const ReviewListContainer = styled.div`
  max-height: 500px;
  overflowY: 'auto';
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ReviewButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #20bf55;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #eb3b5a;
  }
`;
const Title = styled.h2`
    margin-top: 0;
    color: #333;
    font-size: 20px;
    font-weight: 700;
    font-family: 'Manrope', sans-serif;
    text-align: center;
`;

const ReviewListMain = ({ reviews, metaData, productId }) => {
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [displayCount, setDisplayCount] = useState(2);

  const loadMoreReviews = () => {
    const moreReviews = reviews.slice(0, displayCount + 2);
    setDisplayCount(displayCount + 2);
    setDisplayedReviews(moreReviews);
  };
  const handleButtonClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    setDisplayedReviews(reviews.slice(0, displayCount));
  }, [reviews]);

  return (
    <ReviewListContainer>
      <Title>Customer Reviews</Title>
      {displayedReviews.map((review) => <ReviewListTile review={review} key={review.review_id} />)}
      <ButtonContainer>
        {reviews.length > displayedReviews.length
          && <ReviewButton onClick={loadMoreReviews}>More Reviews</ReviewButton>}
        <ReviewButton onClick={handleButtonClick}>Add a review</ReviewButton>
      </ButtonContainer>
      {showModal && <AddReviewModalMain metaData={metaData} productId={productId}
      setShowModal={setShowModal}/>}
    </ReviewListContainer>
  );
};

export default ReviewListMain;
