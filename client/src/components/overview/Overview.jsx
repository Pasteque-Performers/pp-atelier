import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Information from './Information.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';

const OverviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #eb3b5a;
  font-size: 50px;
`;

const ImageGalleryContainer = styled.div`
`;

const DetailsContainer = styled.div`
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
