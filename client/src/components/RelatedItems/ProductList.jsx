import React from 'react';
import CreateRelated from './CreateRelated.jsx';

const ProductList = ({list, defaultProduct, defaultHandler, setDefault}) => (
    <>
    {list.map((product, index) => <CreateRelated
    key={index} id={product} handler={defaultHandler}
    defaultProduct={defaultProduct} list={list}/>)}
    </>
);

export default ProductList;
