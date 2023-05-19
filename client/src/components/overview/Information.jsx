import React from 'react';
import { createGlobalStyle, styled } from 'styled-components';
import StaticStarRating from './StaticStarRating.jsx';

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
`;

const ProductCardContainer = styled.div`
  border: solid;
  display: block;
  justify-content: space-around;
  padding: 16px;
  color: #333;
`;

const ProductName = styled.h3`
  font-weight: 900;
`;

const ProductSlogan = styled.p`
  font-style: italic;
`;

const ProductDescription = styled.p`
  margin-bottom: 15px;
  color: #222;
`;

const ProductCategory = styled.p`
`;

const ProductPrice = styled.p`
  font-weight: bold;
`;

const StyledScrollLink = styled.a`
  color: #20bf55;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: #eb3b5a;
  }
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

  const handleScroll = () => {
    const element = document.getElementById('ratingsAndReviews');
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <GlobalStyle />
    <ProductCardContainer>
      <ProductName>{name}</ProductName>
      <ProductSlogan>{slogan}</ProductSlogan>
      <StaticStarRating product={product} />
      <StyledScrollLink href="#reviews">see all reviews</StyledScrollLink>
      <ProductDescription>{description}</ProductDescription>
      <ProductCategory>{category}</ProductCategory>
      <ProductPrice>${(default_price && !isNaN(parseFloat(default_price))) ? parseFloat(default_price).toFixed(2) : 'N/A'}</ProductPrice>
    </ProductCardContainer>
    </>
  );
};

export default ProductCard;
