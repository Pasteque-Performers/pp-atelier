import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Compare from './Compare.jsx';
import Images from './Images.jsx';
import StaticStarRating from '../overview/StaticStarRating.jsx';

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
  const [currentImages, setCurrentImages] = useState([]);
  const [showNext, toggleShowNext] = useState(false);
  const [showPrevious, toggleShowPrevious] = useState(false);

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

  const nextHandler = () => {
    const first = images.indexOf(currentImages[0]);
    setCurrentImages(images.slice(first + 1, first + 5));
  };

  const previousHandler = () => {
    const first = images.indexOf(currentImages[0]);
    setCurrentImages(images.slice(first - 1, first + 3));
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

  });

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
        setCurrentImages(res.data.results.slice(0, 4));
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

  useEffect(() => {
    if (images.length > currentImages.length) {
      toggleShowNext(true);
    }
    if (images.indexOf(currentImages[0]) > 0) {
      toggleShowPrevious(true);
    }
    if (images.indexOf(currentImages[0]) === 0) {
      toggleShowPrevious(false);
    }
    if (images.indexOf(currentImages[currentImages.length - 1]) === images.length - 1) {
      toggleShowNext(false);
    }
  }, [currentImages]);

  return (
    <div className="relatedItem" onClick={() => {
      handler(id);
    }}>
      <div className="compareButton">
      <FontAwesomeIcon icon={faStar} style={{ color: 'EC6F7F' }} onClick={(e) => {
        e.stopPropagation();
        handleOpen();
      }}/>
      </div>
      {showTable && (
      <div className="compare" ref={tableRef}>
      <Compare features1={product.features}
      features2={defaultProduct.features} name1={product.name} name2={defaultProduct.name} />
      </div>)}
    <img className="image" src={image || 'image cannot be displayed'} onMouseEnter={() => { toggleShowImages(true); setHoveredOnDefaultImage(true); }} onMouseLeave={() => {
      setHoveredOnDefaultImage(false);
    }}/>
      {showImages && <Images setHoveredOnImages={setHoveredOnImages} images={currentImages}
       showNext={showNext} nextHandler={nextHandler} showPrevious={showPrevious}
       previousHandler={previousHandler}/>}
    <div className="trait category">Category: {product.category}</div>
    <div className="trait name">Product Name: {product.name}</div>
    <div className="trait price">Price: {product.default_price}</div>
    <div className="trait rating">Rating: {<StaticStarRating rating={4}/>}</div>
    </div>
  );
};

export default CreateRelated;
