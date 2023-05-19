import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Overview from './overview/Overview.jsx';
import QaSection from './q-a/QaSection.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import RatingsAndReviewsMain from './Ratings-Reviews/RatingsAndReviewsMain.jsx';

const App = () => {
  const [productId, setProductId] = useState(40344);

  return (
      <div>
      <Overview/>
      <RelatedItems/>
      <QaSection/>
      <RatingsAndReviewsMain productId={productId}/>
    </div>
  );
};

export default App;
