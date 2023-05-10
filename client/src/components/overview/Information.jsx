import React from 'react';
// import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { image, category, title, price, overview } = product;

  return (
    <div className="product-card">
      <img className="product-image" src={image} alt={title} />
      <p className="product-category">{category}</p>
      <h3 className="product-title">{title}</h3>
      <p className="product-price">${price.toFixed(2)}</p>
      <p className="product-overview">{overview}</p>
    </div>
  );
};

export default ProductCard;
