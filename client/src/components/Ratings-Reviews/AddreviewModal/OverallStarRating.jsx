import React, { useState } from 'react';
import styled from 'styled-components';

const StarIcon = styled.i`
  font-size: 24px;
  color: ${(props) => (props.filled ? 'yellow' : 'lightgray')};
  cursor: pointer;
`;

const OverallStarRating = () => {
  const [rating, setRating] = useState(0);
  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div>
    {[1, 2, 3, 4, 5].map((index) => (
      <StarIcon
        key={index}
        filled={index <= rating}
        className={'material-symbols-outlined'}
        onClick={() => handleClick(index)}
      >
      star
      </StarIcon>
    ))}
      <span>
        {rating === 1 && 'Poor'}
        {rating === 2 && 'Fair'}
        {rating === 3 && 'Average'}
        {rating === 4 && 'Good'}
        {rating === 5 && 'Great'}
      </span>
    </div>
  );
};

export default OverallStarRating;
