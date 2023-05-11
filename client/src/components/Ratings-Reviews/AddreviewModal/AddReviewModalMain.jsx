import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductCharacteristics from './ProductCharacteristics.jsx';
import OverallStarRating from './OverallStarRating.jsx';
import DoYouRecommend from './DoYouRecommend.jsx';
import ReviewBody from './ReviewBody.jsx';
import ReviewSummary from './ReviewSummary.jsx';
import DisplayName from './DisplayName.jsx';
import UploadPhotos from './UploadPhotos.jsx';

const AddReviewModalMain = () => (
    <div>
     <OverallStarRating/>
     <DoYouRecommend/>
      <ProductCharacteristics/>
      <ReviewSummary/>
      <ReviewBody/>
      <UploadPhotos/>
      <DisplayName/>
    </div>
);

export default AddReviewModalMain;
