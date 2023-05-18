import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AddReviewModalMain from './AddReviewModal/AddReviewModalMain.jsx';
import ReviewBreakdownMain from './ReviewBreakdown/ReviewBreakdownMain.jsx';

const RatingsAndReviewsMain = () => {
  const [showModal, setShowModal] = useState(false);
  const [metaData, setMetaData] = useState({});

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const productId = 40347;

  useEffect(() => {
    axios.get('classes/reviews/meta', { params: { productId } })
      .then((response) => {
        console.log('successfully got meta data', response.data);
        setMetaData(response.data);
        console.log('this is metaData >>>>>>>>>>>>>>>>>>>> ', metaData);
      })
      .catch((err) => {
        console.error('Error getting meta data', err);
      });
  }, [productId]);

  return (
    <div>
      <ReviewBreakdownMain/>
      <button onClick={handleButtonClick}>Add a review</button>
      {showModal && <AddReviewModalMain metaData={metaData} />}
    </div>
  );
};

export default RatingsAndReviewsMain;
