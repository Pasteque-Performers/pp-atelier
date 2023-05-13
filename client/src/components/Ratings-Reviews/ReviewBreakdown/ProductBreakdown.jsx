import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

const ProductBreakdown = () => {
  const exampleData = {
    Fit: {
      id: 135219,
      value: '3.3014705882352941',
    },
    Length: {
      id: 135220,
      value: '3.3251072961373391',
    },
    Comfort: {
      id: 135221,
      value: '3.3782559456398641',
    },
    Quality: {
      id: 135222,
      value: '3.3322222222222222',
    },
  };

  const meanings = {
    size: {
      1: 'A size too small',
      2: '½ a size too small',
      3: 'Perfect',
      4: '½ a size too big',
      5: 'A size too wide',
    },
    width: {
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly wide',
      5: 'Too wide',
    },
    comfort: {
      1: 'A size too small',
      2: 'Slightly uncomfortable',
      3: 'Ok',
      4: 'Comfortable',
      5: 'Perfect',
    },
    quality: {
      1: 'Poor',
      2: 'Below average',
      3: 'Perfect',
      4: 'Pretty great',
      5: 'Perfect',
    },
    length: {
      1: 'Runs Short',
      2: 'Runs slightly short',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
    fit: {
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
  };
  return (
    <div>Characteristics</div>
  );
};

export default ProductBreakdown;
