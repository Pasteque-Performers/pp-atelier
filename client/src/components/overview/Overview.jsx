import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Information from './Information.jsx';
// import StaticStarRating from './StaticStarRating.jsx';
// import OverallStarRating from './Ratings-Reviews/AddreviewModal/OverallStarRating.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

const Overview = () => {
  const [product, setProduct] = useState(null);
  const [selectedStyleId, setSelectedStyleId] = useState(null);

  useEffect(() => {
    // Replace 40344 with the actual product ID you want to fetch
    axios.get('classes/products')
      .then((response) => {
        setProduct(response.data[0]);
        // Set the selected style ID to the ID of the first style in the response
        setSelectedStyleId(response.data[0]?.styles?.[0]?.style_id ?? null);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error.response || error);
      });
  }, []);

  return (
    <div>
      <h1>Overview</h1>
      {/* <StaticStarRating /> */}
      <Information product={product} />
      {/* <OverallStarRating /> */}
      {product && <StyleSelector styles={product.styles} productId={product.id} onStyleSelect={setSelectedStyleId} />}
      {selectedStyleId && <AddToCart selectedStyleId={selectedStyleId} />}
    </div>
  );
};

export default Overview;
