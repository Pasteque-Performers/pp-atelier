import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ProductList from './ProductList.jsx';
import Outfit from './Outfit.jsx';

const Body = styled.div`
  font-family: 'Manrope', sans-serif;
`;

const RelatedItemsMain = styled.div`
  position: relative;
  width: fit-content;
  height: 90vw;
  max-height: 950px;
  max-width: 1200px;
  margin-bottom: 5%;
  margin-top: 5%;
`;
const RelatedItems = ({ productId, setProductId }) => {
  const [defaultProduct, setDefaultProduct] = useState([]);
  const [list, setList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [showNext, toggleShowNext] = useState(true);
  const [showPrevious, toggleShowPrevious] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [imageList, setImageList] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [ratings, setRatings] = useState([]);

  const defaultHandler = (event) => {
    setProductId(event);
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
        id: productId,
      },
    }).then((res) => {
      setDefaultProduct(res.data);
    });
  }, [productId]);

  useEffect(() => {
    axios({
      url: '/classes/productsquery',
      method: 'get',
      params: {
        page: 'related',
        id: productId,
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
  }, [productId]);

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
    <Body>
        <RelatedItemsMain>
    <div>
      <h2>Related Products</h2>
  <ProductList list={currentList} products={products} defaultProduct={defaultProduct}
  defaultHandler={(event) => { defaultHandler(event); }} nextHandler={nextHandler}
  showNext={showNext}
  previousHandler={previousHandler} showPrevious={showPrevious} animationClass={animationClass}
  imageList={imageList} currentPosition={currentPosition}/>
    </div>
    <div >
    <h2>Your Outfit</h2>
    <Outfit defaultProduct={defaultProduct} defaultHandler={(event) => { defaultHandler(event); }}/>
    </div>
    </RelatedItemsMain>
    </Body>
  );
};

export default RelatedItems;
