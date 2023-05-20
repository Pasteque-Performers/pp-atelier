import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RatingSummary from './RatingSummary.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

const Title = styled.h2`
    margin-top: 0;
    color: #333;
    font-size: 20px;
    font-weight: 700;
    font-family: 'Manrope', sans-serif;
    text-align: left;
`;

const ReviewBreakdownMain = ({ metaData }) => (
    <div>
      <Title>Ratings</Title>
      <RatingSummary metaData={metaData}/>
      <ProductBreakdown metaData={metaData}/>
    </div>
);

export default ReviewBreakdownMain;
