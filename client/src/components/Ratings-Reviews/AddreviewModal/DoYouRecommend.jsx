import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; // Changes here
  margin-bottom: 1rem;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-right: 2rem; // Add some margin between the options
`;

const RadioInput = styled.input`
  margin-right: 0.5rem;
`;

const DoYouRecommend = ({ formData, handleChange }) => (
    <Container>
       <RadioOption>
         <RadioInput
           type='radio'
           value={'true'}
           checked={formData.recommend === true}
           onChange={handleChange}
           name='recommend'/>
         Yes
       </RadioOption>
       <RadioOption>
         <RadioInput
           type='radio'
           value={'false'}
           checked={formData.recommend === false}
           onChange={handleChange}
           name='recommend'/>
         No
       </RadioOption>
    </Container>
);

export default DoYouRecommend;
