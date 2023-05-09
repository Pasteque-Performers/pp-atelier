import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateRelated from './CreateRelated.jsx';

const Products = () => {
  const [defaultProductID, setDefault] = useState(40344);
  const [defaultProduct, setDefaultProduct] = useState([]);
  const defaultHandler = (e) => {
    setDefault(e);
  };
  const [list, setList] = useState([]);
  useEffect(() => {
    axios({
      url: '/classes/productsquery',
      method: 'get',
      params: {
        id: defaultProductID,
      },
    })
      .then((res) => { setDefaultProduct(res.data); });
    axios({
      url: '/classes/productsquery',
      method: 'get',
      params: {
        page: 'related',
        id: defaultProductID,
      },
    })
      .then((res) => { setList(res.data); });
  }, [defaultProductID]);
  return (
    <>
    {list.map((product, index) => <CreateRelated
    key={index} id={product} handler={defaultHandler} defaultProduct={defaultProduct}/>)}
    </>
  );
};

export default Products;
