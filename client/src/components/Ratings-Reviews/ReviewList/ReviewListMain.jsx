import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewListTile from './ReviewListTile.jsx';
import AddReviewModalMain from '../AddReviewModal/AddReviewModalMain.jsx';
import styled from 'styled-components';



const ReviewListMain = ({ reviews, setReviews, metaData, productId }) => {
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
    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
      {displayedReviews.map((review) => <ReviewListTile review={review} key={review.review_id} />)}
      {reviews.length > displayedReviews.length
        && <button onClick={loadMoreReviews}>More Reviews</button>}
        <button onClick={handleButtonClick}>Add a review</button>
      {showModal && <AddReviewModalMain metaData={metaData} productId={productId}
      setShowModal={setShowModal}/>}
    </div>
  );
};

export default ReviewListMain;
