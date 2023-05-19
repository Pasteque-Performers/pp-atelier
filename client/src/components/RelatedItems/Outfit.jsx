import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateOutfit from './CreateOutfit.jsx';

const Outfit = ({ defaultProduct, animationClass }) => {
  const [list, setList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [showNext, toggleShowNext] = useState(false);
  const [showPrevious, toggleShowPrevious] = useState(false);
  const [nextHovered, setNextHovered] = useState(false);
  const [previousHovered, setPreviousHovered] = useState(false);
  const [addHovered, setAddHovered] = useState(false);

  const addHandler = () => {
    let isDuplicate = false;
    list.forEach((product) => {
      if (product.id === defaultProduct.id) {
        isDuplicate = true;
      }
    });
    if (!isDuplicate) {
      setList([...list, defaultProduct]);
    }
  };
  const deleteHandler = (id) => {
    const filteredList = list.filter((product) => product.id !== id);
    setList(filteredList);
  };
  const nextHandler = () => {
    const first = list.indexOf(currentList[0]);
    setCurrentList(list.slice(first + 1, first + 4));
  };
  const previousHandler = () => {
    const first = list.indexOf(currentList[0]);
    setCurrentList(list.slice(first - 1, first + 2));
  };

  useEffect(() => {
    if (list.length <= 3) {
      toggleShowNext(false);
    } else {
      toggleShowNext(true);
    }
    if (currentList[currentList.length - 1] === list[list.length - 1]) {
      toggleShowNext(false);
    }
    if (currentList[0] === list[0]) {
      toggleShowPrevious(false);
    } else {
      toggleShowPrevious(true);
    }
  }, [currentList, list]);

  useEffect(() => {
    setCurrentList(list.slice(0, 3));
  }, [list]);

  return (
    <div className="outfits">
      {showPrevious ? <div className='empty'><FontAwesomeIcon className='autowidth' icon={faCaretLeft} style={{
        color: previousHovered ? 'Ea2213' : 'EC6F7F',
      }} onClick={previousHandler} onMouseEnter={() => { setPreviousHovered(true); }}
      onMouseLeave={() => { setPreviousHovered(false); }}/></div> : <div className="empty"/>}
      <div className={`slider-container ${animationClass}`}>
        <div className='addContainer'>
      <FontAwesomeIcon icon={faPlus} className='add' style={{
        color: addHovered ? 'Ea2213' : 'EC6F7F',
        fontSize: '50%',
      }} onClick={addHandler} onMouseEnter={() => { setAddHovered(true); }}
      onMouseLeave={() => { setAddHovered(false); }} />
        </div>
      {currentList.map((product, index) => <CreateOutfit
    key={index} product={product} handler={deleteHandler} />)}
      </div>
    {showNext ? <div className='empty'><FontAwesomeIcon className='autowidth' icon={faCaretRight} style={{
      color: nextHovered ? 'Ea2213' : 'EC6F7F',
    }} onClick={nextHandler} onMouseEnter={() => { setNextHovered(true); }}
    onMouseLeave={() => { setNextHovered(false); }}/></div> : <div className="empty"/>}
    </div>
  );
};

export default Outfit;
