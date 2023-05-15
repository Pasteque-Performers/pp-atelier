// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddToCart = ({ selectedStyleId }) => {
//   const [sizes, setSizes] = useState([]);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedQuantity, setSelectedQuantity] = useState(1);
//   const [quantityOptions, setQuantityOptions] = useState([]);

//   useEffect(() => {
//     axios.get(`classes/products/${selectedStyleId}/styles`)
//       .then((response) => {
//         setSizes(response.data.results[0].skus);
//       })
//       .catch((error) => {
//         console.error('Error fetching data: ', error.response || error);
//       });
//   }, [selectedStyleId]);

//   useEffect(() => {
//     const sizeObj = sizes.find((size) => size.size === selectedSize);
//     if (sizeObj) {
//       const maxQuantity = Math.min(sizeObj.quantity, 15);
//       setQuantityOptions(Array.from({ length: maxQuantity }, (_, i) => i + 1));
//     }
//   }, [selectedSize, sizes]);

//   const handleSizeChange = (e) => {
//     setSelectedSize(e.target.value);
//     setSelectedQuantity(1);
//   };

//   const handleQuantityChange = (e) => {
//     setSelectedQuantity(e.target.value);
//   };

//   const handleAddToCart = () => {
//     console.log(`Size: ${selectedSize}, Quantity: ${selectedQuantity}`);
//   };

//   return (
//     <div>
//       <select value={selectedSize} onChange={handleSizeChange}>
//         <option value="">Select Size</option>
//         {sizes.map((sizeObj) => <option key={sizeObj.size} value={sizeObj.size}>{sizeObj.size}</option>)}
//       </select>

//       <select value={selectedQuantity} onChange={handleQuantityChange} disabled={!selectedSize}>
//         {quantityOptions.map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)}
//       </select>

//       <button onClick={handleAddToCart} disabled={!selectedSize || !selectedQuantity}>Add to Cart</button>
//     </div>
//   );
// };

// export default AddToCart;

import React, { useState, useEffect } from 'react';

const AddToCart = ({ selectedStyle }) => {
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [quantityOptions, setQuantityOptions] = useState([]);

  useEffect(() => {
    if (selectedStyle && selectedStyle.skus) {
      const availableSizes = Object.values(selectedStyle.skus).map(sku => sku.size);
      setSizes(availableSizes);
      setSelectedSize(availableSizes[0]);
    }
  }, [selectedStyle]);

  useEffect(() => {
    const sizeObj = sizes.find((size) => size === selectedSize);
    if (sizeObj) {
      const maxQuantity = Math.min(sizeObj.quantity, 15);
      setQuantityOptions(Array.from({ length: maxQuantity }, (_, i) => i + 1));
    }
  }, [selectedSize, sizes]);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    setSelectedQuantity(1);
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    console.log(`Size: ${selectedSize}, Quantity: ${selectedQuantity}`);
  };

  return (
    <div>
      <select value={selectedSize} onChange={handleSizeChange}>
        <option value="">Select Size</option>
        {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
      </select>

      <select value={selectedQuantity} onChange={handleQuantityChange} disabled={!selectedSize}>
        {quantityOptions.map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)}
      </select>

      <button onClick={handleAddToCart} disabled={!selectedSize || !selectedQuantity}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;
