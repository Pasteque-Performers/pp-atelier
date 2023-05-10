import React from 'react';

const CreateOutfit = ({ product, handler }) => (
  <div>
    <button onClick={() => { handler(product.id); }}>delete</button>
  <div>Category: {product.category}</div>
  <div>Product Name: {product.name}</div>
  <div>Price: {product.default_price}</div>
  <div>Rating: to be implemented</div>
  </div>
);

export default CreateOutfit;
