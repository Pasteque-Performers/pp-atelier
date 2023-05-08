import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateRelated = ({ id, handler, defaultProduct }) => {
  const [list, setList] = useState([]);
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
  console.log(list);
  return (
    <div onClick={() => {
      handler(id);
    }}>
      <button onClick={(e) => {
        e.stopPropagation();
        console.log('compared');
      }}>compare</button>
    <div>Category: {list.category}</div>
    <div>Product Name: {list.name}</div>
    <div>Price: {list.default_price}</div>
    <div>Rating: to be implemented</div>
    </div>
  );
};

export default CreateRelated;
