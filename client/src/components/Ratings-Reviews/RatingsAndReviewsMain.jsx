import React, { useState, useEffect, useContext } from 'react';
import AddReviewModalMain from './AddReviewModal/AddReviewModalMain.jsx';
import ReviewBreakdownMain from './ReviewBreakdown/ReviewBreakdownMain.jsx';

const RatingsAndReviewsMain = () => {
  const [showModal, setShowModal] = useState(false);
  const handleButtonClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <ReviewBreakdownMain/>
      <button onClick={handleButtonClick}>Submit Review</button>
      {showModal && <AddReviewModalMain />}
    </div>
  );
};

export default RatingsAndReviewsMain;
