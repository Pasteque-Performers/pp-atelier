import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Information from './Information.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';

const OverviewContainer = styled.div`

  font-family: 'Manrope', sans-serif;
  display: flex;
  justify-content: space-around;
  padding: 10 10px;
  max-width: 1400px;

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

const Overview = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  useEffect(() => {
    axios.get(`classes/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error.response || error);
      });
  }, [productId]);

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
