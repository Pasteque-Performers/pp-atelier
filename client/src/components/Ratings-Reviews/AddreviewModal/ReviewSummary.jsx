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
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const ReviewSummary = () => {
  const [summary, setSummary] = useState('');

  const handleSummaryChange = (event) => {
    const { value } = event.target;
    setSummary(value);
  };

  return (
    <SummaryContainer>
      <SummaryTextarea placeholder='Example: Best purchase ever!'
      value={summary}
      onChange={handleSummaryChange}
      maxLength={60}/>
    </SummaryContainer>
  );
};

export default ReviewSummary;
