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
  const [currentImages, setCurrentImages] = useState([]);
  const [showNext, toggleShowNext] = useState(false);
  const [showPrevious, toggleShowPrevious] = useState(false);
  const [starHovered, setStarHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);

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
    const first = imageList.indexOf(currentImages[0]);
    setCurrentImages(imageList.slice(first + 1, first + 5));
  };

  const previousHandler = () => {
    const first = imageList.indexOf(currentImages[0]);
    setCurrentImages(imageList.slice(first - 1, first + 3));
  };

  useEffect(() => {
    if (imageList) {
      setLoading(false);
    }
  }, [imageList]);

  useEffect(() => {
    if (imageList !== undefined) {
      setImage(imageList[0].photos[0].thumbnail_url);
      setCurrentImages(imageList.slice(0, 4));
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
    }
  }, [hoveredOnDefaultImage, hoveredOnImages]);

  useEffect(() => {
    if (imageList !== undefined) {
      if (images.length > currentImages.length) {
        toggleShowNext(true);
      }
      if (images.indexOf(currentImages[0]) > 0) {
        toggleShowPrevious(true);
      }
      if (images.indexOf(currentImages[0]) === 0) {
        toggleShowPrevious(false);
      }
      if (images.indexOf(currentImages[currentImages.length - 1]) === imageList.length - 1) {
        toggleShowNext(false);
      }
    }
  }, [currentImages, images]);

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
      {showImages && <Images setHoveredOnImages={setHoveredOnImages} images={currentImages}
       showNext={showNext} nextHandler={nextHandler} showPrevious={showPrevious}
       previousHandler={previousHandler}/>}
    <div className="trait category">Category: {category}</div>
    <div className="trait name">Product Name: {name}</div>
    <div className="trait price">Price: {price}</div>
    <div className="trait rating">Rating: {<StaticStarRating rating={4}/>}</div>
    </div>
  );
};

export default CreateRelated;
