import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Compare from './Compare.jsx';

const CreateRelated = ({ id, handler, defaultProduct, list }) => {
  const [product, setProduct] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const togglePopUp = () => {
    setPopUp(!popUp);
  };
  useEffect(() => {
    axios({
      url: '/classes/productsquery',
      method: 'get',
      params: {
        id: id,
      },
    })
      .then((res) => { setProduct(res.data); });
  }, [...list]);
  return (
    <div onClick={() => {
      handler(id);
    }}>
      <button onClick={(e) => {
        e.stopPropagation();
        togglePopUp();
      }}>compare</button>
      {popUp && <Compare features1={product.features}
      features2={defaultProduct.features} name1={product.name} name2={defaultProduct.name} />}
    <div>Category: {product.category}</div>
    <div>Product Name: {product.name}</div>
    <div>Price: {product.default_price}</div>
    <div>Rating: to be implemented</div>
    </div>
  );
};

export default CreateRelated;
