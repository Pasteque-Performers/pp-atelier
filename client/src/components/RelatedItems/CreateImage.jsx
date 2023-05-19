import React from 'react';
import styled from 'styled-components';

const CarouselItem = styled.img`
    display: inline-flex;
    height: 200px;
  `;

const CreateImage = ({ image, width }) => (
    <CarouselItem src={image} style={{ width: width }} />
);

export default CreateImage;
