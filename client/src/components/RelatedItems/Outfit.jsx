import React, { useState, useEffect } from 'react';
import CreateOutfit from './CreateOutfit.jsx';

const Outfit = ({ defaultProduct }) => {
  const [list, setList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [showNext, toggleShowNext] = useState(false);
  const [showPrevious, toggleShowPrevious] = useState(false);

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
      <div className="toggleCurrent">
      {showPrevious && <button onClick={previousHandler}>previous</button>}
      </div>
      <div className="add">
      <button onClick={addHandler}>add outfit</button>
      </div>
      {currentList.map((product, index) => <CreateOutfit
    key={index} product={product} handler={deleteHandler} />)}
    <div className="toggleCurrent">
    {showNext && <button onClick={nextHandler}>next</button>}
    </div>
    </div>
  );
};

export default Outfit;