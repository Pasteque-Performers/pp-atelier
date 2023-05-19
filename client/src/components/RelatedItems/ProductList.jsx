import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faRectangleVertical } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import CreateRelated from './CreateRelated.jsx';

const RelatedItems = styled.div`
display: inline-flex;
flex-direction: row;
width: 1100px;
height: 300px;
background-color: #EBEBEB;
padding: 3%;
border: solid black;
border-radius: 25px;
`;

const ProductList = ({
  list, defaultProduct, defaultHandler, nextHandler, showNext, previousHandler, showPrevious,
  animationClass, imageList, currentPosition, products,
}) => {
  const [nextHovered, setNextHovered] = useState(false);
  const [previousHovered, setPreviousHovered] = useState(false);

  return (
    <RelatedItems data-testid="relatedItems">
        {showPrevious ? <div className='empty'><FontAwesomeIcon className='autowidth' icon={faCaretLeft} style={{
          color: previousHovered ? 'Ea2213' : 'EC6F7F',
        }} onClick={ previousHandler } onMouseEnter={() => { setPreviousHovered(true); }}
        onMouseLeave={() => { setPreviousHovered(false); }} /></div> : <div className='empty'/>}
        <div className={`slider-container ${animationClass}`} data-testid='slider-container'>
    {list.map((product, index) => <CreateRelated
    key={index} id={product} handler={ (event) => { defaultHandler(event); }}
    defaultProduct={defaultProduct} list={list} imageList={imageList[index + currentPosition]}
    product={products[index + currentPosition]}/>)}
        </div>
    {showNext ? <div className='empty'><FontAwesomeIcon className='autowidth' icon={faCaretRight} style={{
      color: nextHovered ? 'Ea2213' : 'EC6F7F',
    }} onClick={ nextHandler } onMouseEnter={() => { setNextHovered(true); }}
    onMouseLeave={() => { setNextHovered(false); }} /></div> : <div className="empty"/>}
    </RelatedItems>
  );
};

export default ProductList;
