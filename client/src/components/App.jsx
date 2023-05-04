import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Overview from './components/overview/Overview.jsx';
import Q-A-Section from './components/q-a/Q-A-Section.jsx';
import RelatedItems from './components/RelatedItems/RelatedItems.jsx';
import RatingsAndReviewsMain from './components/Ratings-Reviews/RatingsAndReviewsMain.jsx'

const App = () => {
  return (
   <Overview/>
   <RelatedItems/>
   <Q-A-Section/>
   <RatingsAndReviewsMain/>
  )
};

export default App;
