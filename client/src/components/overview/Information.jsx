import React from 'react';
import styled from 'styled-components';
import StaticStarRating from './StaticStarRating.jsx';

const ProductCardContainer = styled.div`
  padding: 16px;
  color: #333;
`;

const ProductName = styled.h3`
  text-shadow: 1px 1px #eb3b5a;
`;

const ProductSlogan = styled.p`

`;

const ProductDescription = styled.p`

`;

const ProductCategory = styled.p`

`;

const ProductPrice = styled.p`

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
