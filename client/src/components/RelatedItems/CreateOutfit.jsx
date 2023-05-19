import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import StaticStarRating from '../overview/StaticStarRating.jsx';

const CreateOutfit = ({ product, handler }) => {
  const [image, setImage] = useState('');
  const [deleteHovered, setDeleteHovered] = useState(false);

  useEffect(() => {
    axios({
      url: '/classes/productsquery',
      method: 'get',
      params: {
        id: product.id,
        page: 'styles',
      },
    })
      .then((res) => {
        setImage(res.data.results[0].photos[0].thumbnail_url);
      });
  }, [product.id]);
  return (
    <div className="outfit">
      <div className="deleteButton">
      <FontAwesomeIcon icon={faCircleXmark} style={{
        color: deleteHovered ? 'Ea2213' : 'EC6F7F',
      }} onClick={() => { handler(product.id); }} onMouseEnter={() => { setDeleteHovered(true); }}
      onMouseLeave={() => { setDeleteHovered(false); }}/>
      </div>
      <div className='imageContainer'>
        <img className="image" src={image || 'image cannot be displayed'}/>
      </div>
    <div className="trait category">Category: {product.category}</div>
    <div className="trait name">Product Name: {product.name}</div>
    <div className="trait price">Price: {product.default_price}</div>
    <div className="trait rating">Rating:{<StaticStarRating rating={4}/>}</div>
    </div>
  );
};

export default CreateOutfit;
