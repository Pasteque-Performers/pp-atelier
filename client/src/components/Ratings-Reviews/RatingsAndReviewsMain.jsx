import React, { useState, useEffect, useContext } from 'react';
import AddReviewModalMain from './AddReviewModal/AddReviewModalMain.jsx';

const RatingsAndReviewsMain = () => {
  const [showModal, setShowModal] = useState(false);
  const handleButtonClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Submit Review</button>
      {showModal && <AddReviewModalMain />}
    </div>
  );
};

export default RatingsAndReviewsMain;
