import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductCharacteristics from './ProductCharacteristics.jsx';
import OverallStarRating from './OverallStarRating.jsx';

const AddReviewModalMain = () => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <ProductCharacteristics/>
      <OverallStarRating rating={rating}
      setRating={setRating}/>
    </div>

  );
};

export default AddReviewModalMain;