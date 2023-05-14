import React, { useState } from 'react';
import styled from 'styled-components';
import QaBody from './QaBody.jsx';

const StyledSection = styled.section`
  border: 2px solid black;
  border-radius: 25px;
  padding: 10px;
  margin: 20px 0px 20px 10px;
  display: flex;
  flex-direction: column;
  max-height: 700px;
`;

const ScrollableList = styled.ul`
  list-style: none;
  padding: 0;
  overflow-y: auto;
  max-height: 300px;

  /* Scrollbar Styles */
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const QaSection = () => {
  const [productId, setProductId] = useState(40344);

  return (
    <StyledSection>
        <h1>Questions and Answers</h1>
        <QaBody productId = {productId} ScrollableList={ScrollableList}/>
    </StyledSection>
  );
};

export default QaSection;
