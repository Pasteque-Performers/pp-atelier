import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Information from './Information.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';

// Define your styled components
const OverviewContainer = styled.div`
  // Define your styles here. Example:
  // padding: 100px;
  // color: #333;
`;

const Title = styled.h1`
  // Define your styles here.
`;

const ImageGalleryContainer = styled.div`
  // Define your styles here.
`;

const DetailsContainer = styled.div`
  // Define your styles here.
`;

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
    <OverviewContainer>
      <Title>Watermelon Wear</Title>
      {product && (
        <>
          <ImageGalleryContainer>
            {selectedStyle && <ImageGallery selectedStyle={selectedStyle} />}
          </ImageGalleryContainer>
          <DetailsContainer>
            <Information product={product} />
            <StyleSelector styles={product.styles} productId={product.id} onStyleSelect={setSelectedStyle} />
            {selectedStyle && <AddToCart selectedStyle={selectedStyle} />}
          </DetailsContainer>
        </>
      )}
    </OverviewContainer>
  );
};

export default Overview;
