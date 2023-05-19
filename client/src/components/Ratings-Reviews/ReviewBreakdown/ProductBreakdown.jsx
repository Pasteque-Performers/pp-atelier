import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

const BreakdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
  width: auto;
`;

const BreakdownBarContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 200px;
  height: 5px;
  background-color: #333;
  margin-bottom: 10px;
  position: relative;
`;

const BreakdownIcon = styled.div`
  position: absolute;
  bottom: 80%;
  left: ${(props) => props.value}%;
  transform: translateX(-40%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 20px solid #000;
`;

const BreakdownLabel = styled.div`
  font-size: 14px;
  font-family: 'Manrope', sans-serif;
  margin-bottom: 5px;
`;

const ScaleLabel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: 'Manrope', sans-serif;
  max-width: 200px;
  font-size: 12px;
  margin-top: 5px;
`;

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
    size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
    width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    comfort: ['A size too small', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    quality: ['Poor', 'Below average', 'Perfect', 'Pretty great', 'Perfect'],
    length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };

  const breakdownData = Object.keys(exampleData).map((key) => ({
    key,
    value: parseFloat(exampleData[key].value),
    scale: meanings[key.toLowerCase()],
  }));

  return (
    <div>
      {breakdownData.map(({ key, value, scale }) => (
        <BreakdownContainer key={key}>
          <BreakdownLabel>{key}</BreakdownLabel>
          <BreakdownBarContainer>
            <BreakdownIcon value={((value - 1) / 4) * 100} />
          </BreakdownBarContainer>
          <ScaleLabel>
            <span>{scale[0]}</span>
            <span>{scale[2]}</span>
            <span>{scale[4]}</span>
          </ScaleLabel>
        </BreakdownContainer>
      ))}
    </div>
  );
};

export default ProductBreakdown;
