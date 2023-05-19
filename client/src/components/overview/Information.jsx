import React from 'react';
import styled from 'styled-components';
import StaticStarRating from './StaticStarRating.jsx';

// Define your styled components
const ProductCardContainer = styled.div`
  // Define your styles here. Example:
  // padding: 16px;
  // color: #333;
`;

const ProductName = styled.h3`
  // Define your styles here.
`;

const ProductSlogan = styled.p`
  // Define your styles here.
`;

const ProductDescription = styled.p`
  // Define your styles here.
`;

const ProductCategory = styled.p`
  // Define your styles here.
`;

const ProductPrice = styled.p`
  // Define your styles here.
`;

const ProductCard = ({ product }) => {
  if (!product) {
    return <ProductCardContainer>Loading...</ProductCardContainer>;
  }

  const {
    name,
    slogan,
    description,
    category,
    default_price,
  } = product;

  return (
    <ProductCardContainer>
      <ProductName>{name}</ProductName>
      <ProductSlogan>{slogan}</ProductSlogan>
      <StaticStarRating product={product} />
      <ProductDescription>{description}</ProductDescription>
      <ProductCategory>{category}</ProductCategory>
      <ProductPrice>${(default_price && !isNaN(parseFloat(default_price))) ? parseFloat(default_price).toFixed(2) : 'N/A'}</ProductPrice>
    </ProductCardContainer>
  );
};

export default ProductCard;
