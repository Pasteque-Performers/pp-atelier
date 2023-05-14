import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Compare from './Compare.jsx';
import Images from './Images.jsx';

const CreateRelated = ({
  id, handler, defaultProduct, list,
}) => {
  const [product, setProduct] = useState([]);
  const [showTable, toggleShowTable] = useState(false);
  const tableRef = useRef(null);
  const [image, setImage] = useState('');
  const [showImages, toggleShowImages] = useState(false);
  const [hoveredOnDefaultImage, setHoveredOnDefaultImage] = useState(false);
  const [hoveredOnImages, setHoveredOnImages] = useState(false);
  const [images, setImages] = useState([]);

  const togglePopUp = () => {
    toggleShowTable(!showTable);
  };

  const handleOutsideClick = () => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      togglePopUp();
    }
  };

  const handleOpen = () => {
    const event = new CustomEvent('modalOpen', { detail: { id: id } });
    document.dispatchEvent(event);
    togglePopUp();
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
      .then((res) => {
        setImages(res.data.results);
        setImage(res.data.results[0].photos[0].thumbnail_url);
      });
  }, [...list]);

  useEffect(() => {
    if (showTable) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showTable]);

  useEffect(() => {
    const closeOtherModals = (event) => {
      if (event.detail.id !== id) {
        toggleShowTable(false);
      }
    };
    document.addEventListener('modalOpen', closeOtherModals);

    return () => {
      document.removeEventListener('modalOpen', closeOtherModals);
    };
  }, [id]);

  useEffect(() => {
    if (!hoveredOnDefaultImage && !hoveredOnImages) {
      toggleShowImages(false);
    }
  });

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
      {showTable && (
      <div className="compare" ref={tableRef}>
      <Compare features1={product.features}
      features2={defaultProduct.features} name1={product.name} name2={defaultProduct.name} />
      </div>)}
    <img className="image" src={image || 'image cannot be displayed'} onMouseEnter={() => { toggleShowImages(true); setHoveredOnDefaultImage(true); }} onMouseLeave={() => {
      setHoveredOnDefaultImage(false);
    }}/>
      {showImages && <Images setHoveredOnImages={setHoveredOnImages} images={images}/>}
    <div className="trait category">Category: {product.category}</div>
    <div className="trait name">Product Name: {product.name}</div>
    <div className="trait price">Price: {product.default_price}</div>
    <div className="trait rating">Rating: to be implemented</div>
    </div>
  );
};

export default CreateRelated;
