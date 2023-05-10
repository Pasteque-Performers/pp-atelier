import React, { useState } from 'react';

const ProductOptions = () => {
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const addToCart = () => {
    alert(`Size: ${size}, Quantity: ${quantity} added to cart.`);
  };

  return (
    <div>
      <label htmlFor="size-select">Size:</label>
      <select id="size-select" value={size} onChange={handleSizeChange}>
        <option value="">Select size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>

      <label htmlFor="quantity-select">Quantity:</label>
      <select id="quantity-select" value={quantity} onChange={handleQuantityChange}>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductOptions;
