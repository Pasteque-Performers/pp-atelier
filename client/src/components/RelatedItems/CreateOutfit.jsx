import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StaticStarRating from '../overview/StaticStarRating.jsx';

const CreateOutfit = ({ product, handler }) => {
  const [image, setImage] = useState('');

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
      <button onClick={() => { handler(product.id); }}>delete</button>
      </div>
        <img className="image" src={image || 'image cannot be displayed'}/>
    <div className="trait">Category: {product.category}</div>
    <div className="trait">Product Name: {product.name}</div>
    <div className="trait">Price: {product.default_price}</div>
    <div className="trait">Rating:{<StaticStarRating rating={4}/>}</div>
    </div>
  );
};

export default CreateOutfit;
