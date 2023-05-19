import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// Here are the styled-components:

const CartContainer = styled.div``;

const Message = styled.div`
  color: red;
`;

const SelectSize = styled.select`
  width: 200px;
  padding: 5px;
  margin: 5px;
`;

const SelectQuantity = styled.select`
  width: 60px;
  padding: 5px;
  margin: 5px;
`;

const AddToCartButton = styled.button`
  padding: 10px;
  margin: 5px;
`;

// And here's your AddToCart component:

const AddToCart = ({ selectedStyle }) => {
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('-');
  const [quantityOptions, setQuantityOptions] = useState([]);
  const [isSizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [sizeMessage, setSizeMessage] = useState('');
  const sizeDropdownRef = useRef(null);

  useEffect(() => {
    if (selectedStyle && selectedStyle.skus) {
      const availableSizes = Object.values(selectedStyle.skus).filter(sku => sku.quantity > 0).map(sku => sku.size);
      setSizes(availableSizes);
    }
  }, [selectedStyle]);

  useEffect(() => {
    if (selectedSize !== '' && selectedSize !== 'OUT OF STOCK') {
      const sizeObj = Object.values(selectedStyle.skus).find((sku) => sku.size === selectedSize);
      if (sizeObj) {
        const maxQuantity = Math.min(sizeObj.quantity, 15);
        setQuantityOptions(['-', ...Array.from({ length: maxQuantity }, (_, i) => i + 1)]);
      }
    } else {
      setQuantityOptions(['-']);
    }
  }, [selectedSize, selectedStyle]);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    setSelectedQuantity('-');
    setSizeDropdownOpen(false);
    setSizeMessage('');
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    if (selectedSize === '' || selectedSize === 'OUT OF STOCK') {
      setSizeDropdownOpen(true);
      setSizeMessage('Please select size');
      sizeDropdownRef.current.focus();
    } else if (selectedQuantity === '-') {
      alert('Please select quantity');
    } else {
      console.log(`Size: ${selectedSize}, Quantity: ${selectedQuantity}`);
      // Add the product to the user's cart here
    }
  };

  return (
    <CartContainer>
      {sizeMessage && <Message>{sizeMessage}</Message>}
      <SelectSize ref={sizeDropdownRef} value={selectedSize} onChange={handleSizeChange} open={isSizeDropdownOpen}>
        <option value="">Select Size</option>
        {sizes.length > 0 ? sizes.map((size) => <option key={size} value={size}>{size}</option>) : <option value="OUT OF STOCK">OUT OF STOCK</option>}
      </SelectSize>

      <SelectQuantity value={selectedQuantity} onChange={handleQuantityChange} disabled={selectedSize === '' || selectedSize === 'OUT OF STOCK'}>
        {quantityOptions.map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)}
      </SelectQuantity>

      {sizes.length > 0 && <AddToCartButton onClick={handleAddToCart} disabled={!selectedSize || !selectedQuantity || selectedSize === 'OUT OF STOCK' || selectedQuantity === '-'}>Add to Cart</AddToCartButton>}
    </CartContainer>
  );
};

export default AddToCart;
