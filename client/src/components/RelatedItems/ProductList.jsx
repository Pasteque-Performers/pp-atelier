import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateRelated from './CreateRelated.jsx';

const Products = () => {
  const [defaultProduct, setDefault] = useState(40344);
  const defaultHandler = (e) => {
    setDefault(e);
  };
  const [list, setList] = useState([]);
  useEffect(() => {
    console.log(defaultProduct);
    axios({
      url: '/classes/productsquery',
      method: 'get',
      params: {
        page: 'related',
        id: defaultProduct,
      },
    })
      .then((res) => { setList(res.data); });
  }, [defaultProduct]);
  return (
    <>
    {list.map((product, index) => <CreateRelated
    key={index} id={product} handler={defaultHandler} defaultProduct={defaultProduct}/>)}
    </>
  );
};

export default Products;
