import React, { useState } from "react";
import styled from 'styled-components';

const CharacteristicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const CharacteristicSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const CharacteristicLabel = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
`;

const RadioButton = styled.input.attrs({ type: 'radio' })`
  margin-right: 10px;
`;

const ProductCharacteristics = () => {
  const [characteristics, setCharacteristics] = useState({
    size: null,
    width: null,
    comfort: null,
    quality: null,
    length: null,
    fit: null,
  });

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setCharacteristics((prevVals) => ({ ...prevVals, [name]: parseInt(value, 10) }));
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
    quality:{
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
    <CharacteristicsContainer>
      <CharacteristicSection>
        <CharacteristicLabel>Size</CharacteristicLabel>
        <RadioContainer>
          {Object.entries(meanings.size).map(([value, meaning]) => (
            <div key={value}>
              <RadioButton
              name='size'
              value={value}
              onChange={handleRadioChange}/>
            </div>
          ))}
        </RadioContainer>
        <div>
          {characteristics.size ? `Selected: ${characteristics.size} - ${meanings.size[characteristics.size]}` : 'None Selected'}
        </div>
      </CharacteristicSection>

      <CharacteristicSection>
        <CharacteristicLabel>Width</CharacteristicLabel>
        <RadioContainer>
          {Object.entries(meanings.width).map(([value, meaning]) => (
            <div key={value}>
              <RadioButton
              name='width'
              value={value}
              onChange={handleRadioChange}/>
            </div>
          ))}
        </RadioContainer>
        <div>
        {characteristics.width ? `Selected: ${characteristics.width} - ${meanings.width[characteristics.width]}` : 'None Selected'}
        </div>
      </CharacteristicSection>
      <CharacteristicSection>
        <CharacteristicLabel>Comfort</CharacteristicLabel>
        <RadioContainer>
          {Object.entries(meanings.comfort).map(([value, meaning]) => (
            <div key={value}>
              <RadioButton
              name='comfort'
              value={value}
              onChange={handleRadioChange}/>
            </div>
          ))}
        </RadioContainer>
        <div>
          {characteristics.comfort ? `Selected: ${characteristics.comfort} - ${meanings.comfort[characteristics.comfort]}` : 'None Selected'}
        </div>
      </CharacteristicSection>
      <CharacteristicSection>
        <CharacteristicLabel>Quality</CharacteristicLabel>
        <RadioContainer>
          {Object.entries(meanings.quality).map(([value, meaning]) => (
            <div key={value}>
              <RadioButton
              name='quality'
              value={value}
              onChange={handleRadioChange}/>
            </div>
          ))}
        </RadioContainer>
        <div>
          {characteristics.quality ? `Selected: ${characteristics.quality} - ${meanings.quality[characteristics.quality]}` : 'None Selected'}
        </div>
      </CharacteristicSection>
      <CharacteristicSection>
        <CharacteristicLabel>Length</CharacteristicLabel>
        <RadioContainer>
          {Object.entries(meanings.length).map(([value, meaning]) => (
            <div key={value}>
              <RadioButton
              name='length'
              value={value}
              onChange={handleRadioChange}/>
            </div>
          ))}
        </RadioContainer>
        <div>
          {characteristics.length ? `Selected: ${characteristics.length} - ${meanings.length[characteristics.length]}` : 'None Selected'}
        </div>
      </CharacteristicSection>
      <CharacteristicSection>
        <CharacteristicLabel>Fit</CharacteristicLabel>
        <RadioContainer>
          {Object.entries(meanings.fit).map(([value, meaning]) => (
            <div key={value}>
              <RadioButton
              name='fit'
              value={value}
              onChange={handleRadioChange}/>
            </div>
          ))}
        </RadioContainer>
        <div>
          {characteristics.fit ? `Selected: ${characteristics.fit} - ${meanings.fit[characteristics.fit]}` : 'None Selected'}
        </div>
      </CharacteristicSection>
    </CharacteristicsContainer>
  );
};

export default ProductCharacteristics;
