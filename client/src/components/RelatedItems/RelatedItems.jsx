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
  const [animationClass, setAnimationClass] = useState('');
  const [imageList, setImageList] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);

  const defaultHandler = (event) => {
    setDefault(event);
    setCurrentPosition(0);
  };

  const nextHandler = () => {
    const first = list.indexOf(currentList[0]);
    if (currentList[currentList.length - 1] === list[list.length - 2]) {
      toggleShowNext(false);
    }
    toggleShowPrevious(true);
    setAnimationClass('slideEnter');
    setTimeout(() => {
      setAnimationClass('');
      setCurrentPosition(first + 1);
      setCurrentList(list.slice(first + 1, first + 5));
    }, 501);
  };
  const previousHandler = () => {
    const first = list.indexOf(currentList[0]);
    if (currentList[0] === list[1]) {
      toggleShowPrevious(false);
    }
    setAnimationClass('slideExit');
    setTimeout(() => {
      setCurrentPosition(first - 1);
      setAnimationClass('');
      setCurrentList(list.slice(first - 1, first + 3));
    }, 500);
    toggleShowNext(true);
  };
  useEffect(() => {
    axios({
      url: '/classes/productsquery',
      method: 'get',
      params: {
        id: defaultProductID,
      },
    }).then((res) => {
      setDefaultProduct(res.data);
    });
  }, [defaultProductID]);

  useEffect(() => {
    axios({
      url: '/classes/productsquery',
      method: 'get',
      params: {
        page: 'related',
        id: defaultProductID,
      },
    }).then((res) => {
      setList(res.data);
      setCurrentList([...res.data.slice(0, 4)]);
      if (res.data.length <= 4) {
        toggleShowNext(false);
      } else {
        toggleShowNext(true);
      }
    });
  }, [defaultProductID]);

  useEffect(() => {
    Promise.all(
      list.map((item) => axios({
        url: '/classes/productsquery',
        method: 'get',
        params: {
          id: item,
        },
      })
        .then((res) => (res.data))),
    ).then((res) => {
      setProducts(res);
    });
  }, [list]);

  useEffect(() => {
    Promise.all(
      list.map((item) => axios({
        url: '/classes/productsquery',
        method: 'get',
        params: {
          id: item,
          page: 'styles',
        },
      })
        .then((res) => res.data.results)),
    ).then((results) => {
      setImageList(results);
    });
  }, [list]);

  return (
    <div className='relatedItemsMain'>
    <div>
      <h2>related products</h2>
  <ProductList list={currentList} products={products} defaultProduct={defaultProduct}
  defaultHandler={(event) => { defaultHandler(event); }} nextHandler={nextHandler}
  showNext={showNext}
   previousHandler={previousHandler} showPrevious={showPrevious} animationClass={animationClass}
   imageList={imageList} currentPosition={currentPosition}/>
    </div>
    <div >
    <h2>your outfit</h2>
    <Outfit defaultProduct={defaultProduct} />
    </div>
    </div>
  );
};

export default RelatedItems;
