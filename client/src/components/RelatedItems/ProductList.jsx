import React from 'react';
import CreateRelated from './CreateRelated.jsx';

const ProductList = ({
  list, defaultProduct, defaultHandler, nextHandler, showNext, previousHandler, showPrevious,
}) => (
    <div className="relatedItems">
        <div className="toggleCurrent">
        {showPrevious && <button onClick={ previousHandler }>previous</button>}
        </div>
    {list.map((product, index) => <CreateRelated
    key={index} id={product} handler={defaultHandler}
    defaultProduct={defaultProduct} list={list}/>)}
    <div className="toggleCurrent">
    {showNext && <button onClick={ nextHandler }>next</button>}
    </div>
    </div>
);

export default ProductList;
