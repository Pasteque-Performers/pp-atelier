import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import CreateRelated from './CreateRelated.jsx';

const ProductList = ({
  list, defaultProduct, defaultHandler, nextHandler, showNext, previousHandler, showPrevious,
  animationClass, imageList, currentPosition, products,
}) => {
  const [nextHovered, setNextHovered] = useState(false);
  const [previousHovered, setPreviousHovered] = useState(false);

  return (
    <div className="relatedItems" data-testid="relatedItems">
        <div className="toggleCurrent">
        {showPrevious && <FontAwesomeIcon icon={faCaretLeft} style={{
          color: previousHovered ? 'Ea2213' : 'EC6F7F',
          fontSize: '4em',
        }} onClick={ previousHandler } onMouseEnter={() => { setPreviousHovered(true); }}
        onMouseLeave={() => { setPreviousHovered(false); }} />}
        </div>
        <div className={`slider-container ${animationClass}`}>
    {list.map((product, index) => <CreateRelated
    key={index} id={product} handler={ (event) => { defaultHandler(event); }}
    defaultProduct={defaultProduct} list={list} imageList={imageList[index + currentPosition]}
    product={products[index + currentPosition]}/>)}
        </div>
    <div className="toggleCurrent">
    {showNext && <FontAwesomeIcon icon={faCaretRight} style={{
      color: nextHovered ? 'Ea2213' : 'EC6F7F',
      fontSize: '4em',
    }} onClick={ nextHandler } onMouseEnter={() => { setNextHovered(true); }}
    onMouseLeave={() => { setNextHovered(false); }} />}
    </div>
    </div>
  );
};

export default ProductList;
