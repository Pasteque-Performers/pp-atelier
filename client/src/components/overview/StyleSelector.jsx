import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StyleSelector = ({ productId, onStyleSelect }) => {
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('');

  useEffect(() => {
    axios({
      params: { id: productId, page: 'styles' },
      method: 'get',
      url: 'http://localhost:3000/classes/productsquery/',
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
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {styles.map((style) => (
          <div key={style.style_id} style={{
            position: 'relative', width: '25%', boxSizing: 'border-box', padding: '5px 2px',
          }}>
            <img
              src={style.photos[0].thumbnail_url}
              alt={style.name}
              onClick={() => {
                setSelectedStyle(style);
                onStyleSelect(style);
              }}
              style={{ width: '60px', height: '60px', borderRadius: '50%' }}
            />
            {style.style_id === selectedStyle.style_id
            && <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '65px',
              height: '65px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '50%',
            }}>
                ✔️
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  );

};

export default StyleSelector;
