import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import QaBody from './QaBody.jsx';

const theme = {
  fontFamily: "'Manrope', serif",
  fontWeight: {
    light: 200,
    regular: 300,
    bold: 700,
    extraBold: 800,
  },
};

const QaHeader = styled.h2`
  font-family: ${(props) => props.theme.fontFamily};
  font-weight: ${(props) => props.theme.fontWeight.extraBold};
  font-size: 35px;
`;

const StyledSection = styled.section`
  background-color: #EBEBEB;
  border: 2px solid black;
  border-radius: 25px;
  padding: 10px;
  margin: 15px 0px 10px 10px;
  display: flex;
  flex-direction: column;
  max-height: 800px;
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

const QaSection = ({ productId }) => (
    <ThemeProvider theme={theme}>
      <StyledSection>
        <QaHeader>Questions and Answers</QaHeader>
        <QaBody productId = {productId} ScrollableList={ScrollableList}/>
      </StyledSection>
    </ThemeProvider>
);

export default QaSection;
