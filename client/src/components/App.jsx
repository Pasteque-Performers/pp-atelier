import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './overview/Overview.jsx';
import QaSection from './q-a/QaSection.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import RatingsAndReviewsMain from './Ratings-Reviews/RatingsAndReviewsMain.jsx';

const App = () => {
  const [productId, setProductId] = useState(40344);
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    axios.get('classes/reviews/meta', { params: { productId } })
      .then((response) => {
        console.log('successfully got meta data', response.data);
        setMetaData(response.data);
      })
      .catch((err) => {
        console.error('Error getting meta data', err);
      });
  }, [productId]);

  return (
    <div>
      <Overview productId={productId} metaData={metaData}/>
      <RelatedItems productId={productId} setProductId={setProductId}
        metaData={metaData} setMetaData={setMetaData}/>
      <QaSection productId={productId}/>
      <RatingsAndReviewsMain productId={productId} metaData={metaData}/>
    </div>
  );
};

export default App;
