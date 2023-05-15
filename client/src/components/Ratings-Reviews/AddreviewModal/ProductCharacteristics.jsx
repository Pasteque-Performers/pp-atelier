import React, { useState } from "react";
import styled from 'styled-components';

const CharacteristicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const CharacteristicSection = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(5, 1fr);
  grid-template-rows: 50px 30px 30px;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const CharacteristicLabel = styled.div`
  grid-column: 1 / span 1;
  grid-row: 2 / span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 2;
`;

const MeaningContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 3;
  padding: 5px;
  font-size: 10px;
`;

const SelectedCharacteristic = styled.div`
  grid-column: 2 / span 5;
  padding: 10px;
`;

const RadioButton = styled.input.attrs({ type: 'radio' })``;

const ProductCharacteristics = () => {
  const [characteristics, setCharacteristics] = useState({
    size: null,
    width: null,
    comfort: null,
    quality: null,
    length: null,
    fit: null,
  });

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

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setCharacteristics((prevVals) => ({ ...prevVals, [name]: parseInt(value, 10) }));
  };
  const meanings = {
    Size: {
      1: 'A size too small',
      2: '½ a size too small',
      3: 'Perfect',
      4: '½ a size too big',
      5: 'A size too wide',
    },
    Width: {
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly wide',
      5: 'Too wide',
    },
    Comfort: {
      1: 'A size too small',
      2: 'Slightly uncomfortable',
      3: 'Ok',
      4: 'Comfortable',
      5: 'Perfect',
    },
    Quality:{
      1: 'Poor',
      2: 'Below average',
      3: 'Perfect',
      4: 'Pretty great',
      5: 'Perfect',
    },
    Length: {
      1: 'Runs Short',
      2: 'Runs slightly short',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
    Fit: {
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
  };

  const renderCharacteristic = (characteristic, label) => {
    if (exampleData[label]) {
      return (
        <CharacteristicSection key={label}>
          <CharacteristicLabel>{label}</CharacteristicLabel>
          <SelectedCharacteristic>
            {characteristics[label] ? `Selected: ${characteristics[label]} - ${characteristic[characteristics[label]]}` : 'None Selected'}
          </SelectedCharacteristic>
          {Object.entries(characteristic).map(([value, meaning]) => (
            <React.Fragment key={value}>
              <RadioButtonContainer>
                <RadioButton
                  name={label}
                  value={value}
                  onChange={handleRadioChange}
                />
              </RadioButtonContainer>
              <MeaningContainer>{meaning}</MeaningContainer>
            </React.Fragment>
          ))}
        </CharacteristicSection>
      );
    }
  };

  return (
    <CharacteristicsContainer>
      {Object.entries(meanings).map(([key, value]) => renderCharacteristic(value, key))}
    </CharacteristicsContainer>
  );
};

export default ProductCharacteristics;
