import React, { useState } from 'react';
import styled from 'styled-components';

const StarIcon = styled.i`
  font-size: 24px;
  color: ${(props) => (props.filled ? '#ffd700' : 'lightgray')};
  cursor: pointer;
  font-variation-settings: ${(props) => (props.filled ? "'FILL' 1" : "'FILL' 0")};
  margin-right: 5px;
`;

const OverallStarRating = ({ formData, handleChange }) => {
  const handleClick = (value) => {
    handleChange({
      target: {
        name: 'rating',
        value,
      },
    });
  };

  return (
    <div>
    {[1, 2, 3, 4, 5].map((index) => (
      <StarIcon
        key={index}
        filled={index <= formData.rating }
        className={`material-symbols-outlined ${index <= formData.rating ? 'filled' : ''}`}
        onClick={() => handleClick(index)}
        data-testid="star-icon">
      star
      </StarIcon>
    ))}
      <span>
        {formData.rating === 1 && 'Poor'}
        {formData.rating === 2 && 'Fair'}
        {formData.rating === 3 && 'Average'}
        {formData.rating === 4 && 'Good'}
        {formData.rating === 5 && 'Great'}
      </span>
    </div>
  );
};

export default OverallStarRating;
