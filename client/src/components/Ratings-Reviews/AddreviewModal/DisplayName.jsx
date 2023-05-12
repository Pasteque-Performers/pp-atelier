import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
margin-bottom: 1rem;
padding: 10px;
`;

const Input = styled.textarea`
width: 60%;
height: 15px;
padding: 6px;
font-size: 12px;
border: 1px solid #ccc;
border-radius: 4px;
resize: none;
`;

const PrivacyText = styled.p`
font-size: 0.8rem;
color: #888;
`;

const DisplayName = () => {
  const [displayName, setDisplayName] = useState('');

  const handleDisplayNameChange = (event) => {
    const { value } = event.target;
    setDisplayName(value);
  };

  return (
    <Container>
      <Input
        placeholder='Example: jackson11'
        value={displayName}
        onChange={handleDisplayNameChange}
        maxLength={60}/>
    <PrivacyText>For privacy reasons, do not use your full name or email address</PrivacyText>
  </Container>
  );
};

export default DisplayName;