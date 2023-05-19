import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
`;

const StyleItem = styled.div`
  position: relative;
  width: 25%;
  box-sizing: border-box;
  padding: 5px 2px;
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 35%;
`;

const SelectedStyleIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 35%;
`;

const StyleSelector = ({ productId, onStyleSelect }) => {
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('');

  useEffect(() => {
    axios({
      params: { id: productId, page: 'styles' },
      method: 'get',
      url: '/classes/productsquery/',
    })
      .then((response) => {
        setStyles(response.data.results);
        setSelectedStyle(response.data.results[0]);
        onStyleSelect(response.data.results[0]);
      })
      .catch((error) => {
        console.error('Error fetching style data: ', error.response || error);
      });
  }, [onStyleSelect]);

  return (
    <StyleContainer>
      {styles.map((style) => (
        <StyleItem key={style.style_id}>
          <Thumbnail
            src={style.photos[0].thumbnail_url}
            alt={style.name}
            onClick={() => {
              setSelectedStyle(style);
              onStyleSelect(style);
            }}
          />
          {style.style_id === selectedStyle.style_id && (
            <SelectedStyleIndicator>✔️</SelectedStyleIndicator>
          )}
        </StyleItem>
      ))}
    </StyleContainer>
  );
};

export default StyleSelector;
