import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductCharacteristics from './ProductCharacteristics.jsx';
import OverallStarRating from './OverallStarRating.jsx';

const AddReviewModalMain = () => {
  const [recommend, setRecommend] = useState(null);
  return (
    <div>
     <OverallStarRating/>
     
      <ProductCharacteristics/>
    </div>
  );
};

export default AddReviewModalMain;
