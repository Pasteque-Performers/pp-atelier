import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios({
      url: '/classes/products',
      method: 'get',
      params: {
        page: 'related',
        id: 40344,
      },
    })
      .then((res) => { setList(res.data); });
  }, []);
  return (
    <>this is related products</>
  );
};

export default Products;
