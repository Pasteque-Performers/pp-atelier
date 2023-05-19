import React, { useState } from 'react';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  margin: 10px 0;
`;

const SummaryTextarea = styled.textarea`
  width: 80%;
  height: 60px;
  padding: 10px;
  font-size: 12px;
  font-family: 'Manrope', sans-serif;
  font-family: 'Manrope', sans-serif;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const ReviewSummary = ({ formData, handleChange }) => (
    <SummaryContainer>
      <SummaryTextarea placeholder='Example: Best purchase ever!'
      value={formData.summary}
      onChange={handleChange}
      maxLength={60}
      name='summary'/>
    </SummaryContainer>
);

export default ReviewSummary;
