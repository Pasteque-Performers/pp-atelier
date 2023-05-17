// import React, { useState, useEffect } from 'react';

// const AddToCart = ({ selectedStyle }) => {
//   const [sizes, setSizes] = useState([]);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedQuantity, setSelectedQuantity] = useState(1);
//   const [quantityOptions, setQuantityOptions] = useState([]);

//   useEffect(() => {
//     if (selectedStyle && selectedStyle.skus) {
//       const skusArray = Object.values(selectedStyle.skus);
//       setSizes(skusArray);
//     }
//   }, [selectedStyle]);

//   useEffect(() => {
//     if (selectedStyle && selectedStyle.skus && selectedSize !== '') {
//       const sizeObj = sizes.find((sku) => sku.size === selectedSize);
//       if (sizeObj) {
//         const maxQuantity = Math.min(sizeObj.quantity, 15);
//         setQuantityOptions(Array.from({ length: maxQuantity }, (_, i) => i + 1));
//       }
//     }
//   }, [selectedSize, selectedStyle, sizes]);

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

//   console.log('SelectedStyle in AddToCart: ', selectedStyle);

//   return (
//     <div>
//       <select value={selectedSize} onChange={handleSizeChange}>
//         <option value="">Select Size</option>
//         {sizes.map((sku) => <option key={sku.size} value={sku.size} disabled={sku.quantity === 0}>
//             {sku.quantity === 0 ? 'OUT OF STOCK' : sku.size}
//           </option>,
//         )}
//       </select>

//       <select value={selectedQuantity} onChange={handleQuantityChange} disabled={!selectedSize}>
//         {quantityOptions.map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)}
//       </select>

//       <button onClick={handleAddToCart} disabled={!selectedSize || !selectedQuantity}>Add to Cart</button>
//     </div>
//   );
// };

// export default AddToCart;

// import React, { useState, useEffect } from 'react';

// const AddToCart = ({ selectedStyle }) => {
//   const [sizes, setSizes] = useState([]);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedQuantity, setSelectedQuantity] = useState(1);
//   const [quantityOptions, setQuantityOptions] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [showError, setShowError] = useState(false);

//   useEffect(() => {
//     if (selectedStyle && selectedStyle.skus) {
//       const availableSizes = Object.values(selectedStyle.skus).filter(sku => sku.quantity > 0).map(sku => sku.size);
//       setSizes(availableSizes);
//       setSelectedSize('');
//     }
//   }, [selectedStyle]);

//   useEffect(() => {
//     if (selectedSize !== '') {
//       const sizeObj = Object.values(selectedStyle.skus).find((sku) => sku.size === selectedSize);
//       if (sizeObj) {
//         const maxQuantity = Math.min(sizeObj.quantity, 15);
//         setQuantityOptions(Array.from({ length: maxQuantity }, (_, i) => i + 1));
//       }
//     } else {
//       setQuantityOptions([]);
//     }
//   }, [selectedSize, selectedStyle]);

//   const handleSizeChange = (e) => {
//     setSelectedSize(e.target.value);
//     setSelectedQuantity(1);
//     setDropdownOpen(false);
//     setShowError(false);
//   };

//   const handleQuantityChange = (e) => {
//     setSelectedQuantity(e.target.value);
//   };

//   const handleAddToCart = () => {
//     if (selectedSize === '') {
//       // Open the dropdown and show an error message
//       setDropdownOpen(true);
//       setShowError(true);
//     } else {
//       // Add the item to the cart
//       console.log(`Size: ${selectedSize}, Quantity: ${selectedQuantity}`);
//       // Reset error message
//       setShowError(false);
//     }
//   };

//   return (
//     <div>
//       {sizes.length > 0 ? (
//         <>
//           {showError && <p>Please select size</p>}
//           <select value={selectedSize} onChange={handleSizeChange} size={dropdownOpen ? sizes.length : 1}>
//             <option value="">Select Size</option>
//             {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
//           </select>

//           <select value={selectedQuantity} onChange={handleQuantityChange} disabled={!selectedSize}>
//             <option value="">-</option>
//             {quantityOptions.map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)}
//           </select>

//           <button onClick={handleAddToCart} disabled={!selectedSize || !selectedQuantity}>Add to Cart</button>
//         </>
//       ) : <p>Out of Stock</p>}
//     </div>
//   );
// };

// export default AddToCart;

import React, { useState, useEffect, useRef } from 'react';

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
    <div>
      {sizeMessage && <div>{sizeMessage}</div>}
      <select ref={sizeDropdownRef} value={selectedSize} onChange={handleSizeChange} open={isSizeDropdownOpen}>
        <option value="">Select Size</option>
        {sizes.length > 0 ? sizes.map((size) => <option key={size} value={size}>{size}</option>) : <option value="OUT OF STOCK">OUT OF STOCK</option>}
      </select>

      <select value={selectedQuantity} onChange={handleQuantityChange} disabled={selectedSize === '' || selectedSize === 'OUT OF STOCK'}>
        {quantityOptions.map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)}
      </select>

      {sizes.length > 0 && <button onClick={handleAddToCart} disabled={!selectedSize || !selectedQuantity || selectedSize === 'OUT OF STOCK' || selectedQuantity === '-'}>Add to Cart</button>}
    </div>
  );
};

export default AddToCart;