import React, { useState } from 'react';
import styled from 'styled-components';

const ReviewContainer = styled.div`
  margin: 20px 0;
`;

const ReviewLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ReviewTextArea = styled.textarea`
  width: 90%;
  height: 170px;
  padding: 10px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const CharacterCount = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: ${(props) => (props.count >= 0 ? '#333' : '#f00')};
`;

const ReviewBody = () => {
  const [reviewBody, setReviewBody] = useState();
  const [count, setCount] = useState(50);

  const handleChange = (event) => {
    const { value } = event.target;
    setReviewBody(value);
    setCount(50 - value.length);
  };

  return (
  <ReviewContainer>
      <ReviewTextArea
        placeholder='Why did you like the product or not?'
        value={reviewBody}
        onChange={handleChange}
        maxLength={1000}
        />
        <CharacterCount count={count}>
          {count >= 0 ? `Minimum required characters left: ${count}` : 'Minimum reached'}
        </CharacterCount>
  </ReviewContainer>
  );
};

export default ReviewBody;
