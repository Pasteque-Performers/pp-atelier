import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Compare from './Compare.jsx';

const CreateRelated = ({ id, handler, defaultProduct }) => {
  const [list, setList] = useState([]);
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
      .then((res) => { setList(res.data); });
  }, []);
  return (
    <div onClick={() => {
      handler(id);
    }}>
      <button onClick={(e) => {
        e.stopPropagation();
        togglePopUp();
      }}>compare</button>
      {popUp && <Compare features1={list.features}
      features2={defaultProduct.features} name1={list.name} name2={defaultProduct.name} />}
    <div>Category: {list.category}</div>
    <div>Product Name: {list.name}</div>
    <div>Price: {list.default_price}</div>
    <div>Rating: to be implemented</div>
    </div>
  );
};

export default CreateRelated;
