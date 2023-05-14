import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RatingSummary from './RatingSummary.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

const ReviewBreakdownMain = () => (
    <div>This is the review Breakdown
    <RatingSummary/>
    <ProductBreakdown/>
    </div>
);

export default ReviewBreakdownMain;
