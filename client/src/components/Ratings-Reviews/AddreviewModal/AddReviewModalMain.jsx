import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductCharacteristics from './ProductCharacteristics.jsx';
import OverallStarRating from './OverallStarRating.jsx';

const AddReviewModalMain = () => {
  

  return (
    <div>
      <ProductCharacteristics/>
      <OverallStarRating/>
    </div>

  );
};

export default AddReviewModalMain;