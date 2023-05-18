import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../../../dist/style.css';
import Information from './Information.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';

const Overview = () => {
  const [product, setProduct] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  useEffect(() => {
    axios.get('classes/products')
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error.response || error);
      });
  }, []);

  return (
    <div className="overview-container">
      <h1>Watermelon Wear</h1>
      {product && (
        <>
          <div className="image-gallery-container">
            {selectedStyle && <ImageGallery selectedStyle={selectedStyle} />}
          </div>
          <div className="details-container">
            <Information product={product} />
<<<<<<< HEAD
            {/* <OverallStarRating /> */}
=======
            <StyleSelector styles={product.styles} productId={product.id} onStyleSelect={setSelectedStyle} />
>>>>>>> styling-cleanup
            {selectedStyle && <AddToCart selectedStyle={selectedStyle} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
