import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styled from 'styled-components';
import StaticStarRating from '../overview/StaticStarRating.jsx';

const Outfit = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: start;
  overflow-wrap: break-word;
  border: solid;
  width: 20%;
  margin-right: 2%;
  margin-left: 2%;
  height: 100%;
  border-radius: 5px;
  `;

const RelatedItem = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: start;
  overflow-wrap: break-word;
  border: solid;
  width: 20%;
  margin-right: 2%;
  margin-left: 2%;
  height: 100%;
  border-radius: 5px;
  `;

const Category = styled.div`
    display: flex;
    width: 100%;
    font-size: 1em;
  `;

const Name = styled.div`
  display: flex;
  width: 100%;
  font-size: 1em;
`;

const Price = styled.div`
  display: flex;
  width: 100%;
  font-size: 1em;
`;

const Rating = styled.div`
  display: flex;
  width: 100%;
  font-size: 1em;
  width: 200px;
`;

const CategoryTitle = styled.div`
  display: flex;
  width: 100%;
  font-size: 15px;
`;
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
    <Outfit>
      <div className="deleteButton">
      <FontAwesomeIcon icon={faCircleXmark} style={{
        color: deleteHovered ? 'Ea2213' : 'EC6F7F',
      }} onClick={() => { handler(product.id); }} onMouseEnter={() => { setDeleteHovered(true); }}
      onMouseLeave={() => { setDeleteHovered(false); }}/>
      </div>
      <div className='imageContainer'>
        <img className="image" src={image || 'image cannot be displayed'}/>
      </div>
    <CategoryTitle>Category</CategoryTitle>
    <Category>Category: {product.category}</Category>
    <Name>Product Name: {product.name}</Name>
    <Price>Price: ${product.default_price}</Price>
    <Rating>Rating:{<StaticStarRating rating={4}/>}</Rating>
    </Outfit>
  );
};

export default CreateOutfit;
