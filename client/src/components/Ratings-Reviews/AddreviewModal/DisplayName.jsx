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
font-family: 'Manrope', sans-serif;
border: 1px solid #ccc;
border-radius: 4px;
resize: none;
`;

const PrivacyText = styled.p`
font-size: 0.8rem;
font-family: 'Manrope', sans-serif;
color: #888;
`;

const DisplayName = ({ formData, handleChange }) => (
    <Container>
      <Input
        placeholder='Example: jackson11'
        value={formData.name}
        onChange={handleChange}
        maxLength={60}
        name='name'/>
    <PrivacyText>For privacy reasons, do not use your full name or email address</PrivacyText>
  </Container>
);

export default DisplayName;
