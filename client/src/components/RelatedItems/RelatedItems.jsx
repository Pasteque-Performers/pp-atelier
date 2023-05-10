import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList.jsx';
import Outfit from './Outfit.jsx';

const RelatedItems = () => {
  const [defaultProductID, setDefault] = useState(40344);
  const [defaultProduct, setDefaultProduct] = useState([]);
  const [list, setList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [showNext, toggleShowNext] = useState(true);
  const [showPrevious, toggleShowPrevious] = useState(false);
  const defaultHandler = (e) => {
    setDefault(e);
  };
  const nextHandler = () => {
    const first = list.indexOf(currentList[0]);
    setCurrentList(list.slice(first + 1, first + 5));
    if (currentList[currentList.length - 1] === list[list.length - 2]) {
      toggleShowNext(false);
    }
    toggleShowPrevious(true);
  };
  const previousHandler = () => {
    const first = list.indexOf(currentList[0]);
    setCurrentList(list.slice(first - 1, first + 3));
    if (currentList[0] === list[1]) {
      toggleShowPrevious(false);
    }
    toggleShowNext(true);
  };
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
    }, [defaultProductID])
      .then((res) => { setList(res.data); setCurrentList([...res.data.slice(0, 4)]);
        if (res.data.length <= 4) { toggleShowNext(false); } else {toggleShowNext(true); } });
  }, [defaultProductID]);
  return (
    <>
    <div>
      <h2>related products</h2>
      {showPrevious && <button onClick={ previousHandler }>previous</button>}
  <ProductList list={currentList} defaultProduct={defaultProduct}
  defaultHandler={defaultHandler}/>
      {showNext && <button onClick={ nextHandler }>next</button>}
    </div>
    <div>
    <h2>your outfit</h2>
    <Outfit defaultProduct={defaultProduct} />
    </div>
    </>
  );
};

export default RelatedItems;
