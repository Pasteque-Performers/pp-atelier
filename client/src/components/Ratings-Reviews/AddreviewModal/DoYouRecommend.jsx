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

const DoYouRecommend = () => {
  const [recommend, setRecommend] = useState(null);

  const handleRecommendChange = (event) => {
    setRecommend(event.target.value === 'yes');
  };

  return (
    <Container>
       <RadioOption>
         <RadioInput
           type='radio'
           value='yes'
           checked={recommend === true}
           onChange={handleRecommendChange}/>
         Yes
       </RadioOption>
       <RadioOption>
         <RadioInput
           type='radio'
           value='no'
           checked={recommend === false}
           onChange={handleRecommendChange}/>
         No
       </RadioOption>
    </Container>
  );
};

export default DoYouRecommend;