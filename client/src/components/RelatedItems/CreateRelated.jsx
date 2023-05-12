import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Compare from './Compare.jsx';

const CreateRelated = ({
  id, handler, defaultProduct, list,
}) => {
  const [product, setProduct] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const modalRef = useRef(null);
  const [image, setImage] = useState('');

  const togglePopUp = () => {
    setPopUp(!popUp);
  };

  useEffect(() => {
    axios({
      url: '/classes/productsquery',
      method: 'get',
      params: {
        id: id,
      },
    })
      .then((res) => { setProduct(res.data); });
  }, [...list]);

  useEffect(() => {
    axios({
      url: '/classes/productsquery',
      method: 'get',
      params: {
        id: id,
        page: 'styles',
      },
    })
      .then((res) => { setImage(res.data.results[0].photos[0].thumbnail_url); });
  }, [...list]);

  const handleOutsideClick = () => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      togglePopUp();
    }
  };

  useEffect(() => {
    if (popUp) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [popUp]);

  const handleOpen = () => {
    const event = new CustomEvent('modalOpen', { detail: { id: id } });
    document.dispatchEvent(event);
    togglePopUp();
  };

  useEffect(() => {
    const closeOtherModals = () => {
      if (event.detail.id !== id) {
        setPopUp(false);
      }
    };
    document.addEventListener('modalOpen', closeOtherModals);

    return () => {
      document.removeEventListener('modalOpen', closeOtherModals);
    };
  }, [id]);

  return (
    <div className="relatedItem" onClick={() => {
      handler(id);
    }}>
      <div className="compareButton">
      <button onClick={(e) => {
        e.stopPropagation();
        handleOpen();
      }}>compare</button>
      </div>
      {popUp && (
      <div className="compare" ref={modalRef}>
      <Compare features1={product.features}
      features2={defaultProduct.features} name1={product.name} name2={defaultProduct.name} />
      </div>)}
    <div>
    <img className="image" src={image || 'image cannot be displayed'}/>
    </div>
    <div className="trait category">Category: {product.category}</div>
    <div className="trait name">Product Name: {product.name}</div>
    <div className="trait price">Price: {product.default_price}</div>
    <div className="trait rating">Rating: to be implemented</div>
    </div>
  );
};

export default CreateRelated;
