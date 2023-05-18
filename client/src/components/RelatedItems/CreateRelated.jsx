import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Compare from './Compare.jsx';
import Images from './Images.jsx';
import StaticStarRating from '../overview/StaticStarRating.jsx';

const CreateRelated = ({
  id, handler, defaultProduct, imageList, product, list,
}) => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [showTable, toggleShowTable] = useState(false);
  const tableRef = useRef(null);
  const [showImages, toggleShowImages] = useState(false);
  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);
  const [hoveredOnDefaultImage, setHoveredOnDefaultImage] = useState(false);
  const [hoveredOnImages, setHoveredOnImages] = useState(false);
  const [showNext, toggleShowNext] = useState(false);
  const [showPrevious, toggleShowPrevious] = useState(false);
  const [starHovered, setStarHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (product) {
      setProductLoading(false);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      setCategory(product.category);
      setName(product.name);
      setPrice(product.default_price);
    }
  }, [id, product, productLoading, defaultProduct]);

  const togglePopUp = () => {
    toggleShowTable(!showTable);
  };

  const handleOutsideClick = (event) => {
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
    setActive(active + 1);
  };

  const previousHandler = () => {
    setActive(active - 1);
  };

  useEffect(() => {
    if (imageList) {
      setLoading(false);
    }
  }, [imageList]);

  useEffect(() => {
    if (imageList !== undefined) {
      setImage(imageList[0].photos[0].thumbnail_url);
      setImages(imageList);
    }
  }, [id, imageList, loading, defaultProduct]);

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
      setActive(0);
    }
  }, [hoveredOnDefaultImage, hoveredOnImages]);

  useEffect(() => {
    if (images.length < 4) {
      toggleShowNext(false);
    }
    if (active < images.length - 5) {
      toggleShowNext(true);
    } else {
      toggleShowNext(false);
    }
    if (active > 0) {
      toggleShowPrevious(true);
    } else {
      toggleShowPrevious(false);
    }
  }, [images, active]);

  return (
    <div className="relatedItem" onClick={() => { handler(id); }}>
      <div className="compareButton">
      <FontAwesomeIcon icon={faStar} style={{
        color: starHovered ? 'Ea2213' : 'EC6F7F',
      }} onClick={(e) => {
        e.stopPropagation();
        handleOpen();
      }} onMouseEnter={() => { setStarHovered(true); }}
      onMouseLeave={() => { setStarHovered(false); }}/>
      </div>
      {showTable && (
      <div className="compare" ref={tableRef}>
      <Compare features1={product.features}
      features2={defaultProduct.features} name1={product.name} name2={defaultProduct.name} />
      </div>)}
    <img className="image" src={image} onMouseEnter={() => { toggleShowImages(true); setHoveredOnDefaultImage(true); }} onMouseLeave={() => {
      setHoveredOnDefaultImage(false);
    }}/>
      {showImages && <Images setHoveredOnImages={setHoveredOnImages} images={images}
       showNext={showNext} nextHandler={nextHandler} showPrevious={showPrevious}
       previousHandler={previousHandler} active={active}/>}
    <div className="trait category">Category: {category}</div>
    <div className="trait name">Product Name: {name}</div>
    <div className="trait price">Price: {price}</div>
    <div className="trait rating">Rating: {<StaticStarRating rating={4}/>}</div>
    </div>
  );
};

export default CreateRelated;
