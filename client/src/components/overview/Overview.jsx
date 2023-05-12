import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Information from './Information.jsx';
import StaticStarRating from './StaticStarRating.jsx'

const Overview = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Replace 40344 with the actual product ID you want to fetch
    axios.get('classes/products/40344')
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error.response || error);
      });
  }, []);

  return (
    <div>
      <h1>Overview</h1>
      <StaticStarRating />
      <Information product={product} />
    </div>
  );
};

export default Overview;
