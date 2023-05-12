import React from 'react';
// import './ProductCard.css';

const ProductCard = ({ product }) => {
  if (!product) {
    return <div>Loading...</div>;
  }

  const {
    name,
    slogan,
    description,
    category,
    default_price,
  } = product;

  return (
    <div className="product-card">
      <h3 className="product-name">{name}</h3>
      <p className="product-slogan">{slogan}</p>
      <p className="product-description">{description}</p>
      <p className="product-category">{category}</p>
      <p className="product-price">${(default_price && !isNaN(parseFloat(default_price))) ? parseFloat(default_price).toFixed(2) : 'N/A'}</p>
    </div>
  );
};

export default ProductCard;
