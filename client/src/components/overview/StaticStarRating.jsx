import React from 'react';
import styled from 'styled-components';

const StarIcon = styled.i`
  font-size: 24px;
  color: ${(props) => (props.filled ? 'yellow' : 'lightgray')};
  cursor: pointer;
`;

const StaticStarRating = ({ rating }) => (
    <div>
    {[1, 2, 3, 4, 5].map((index) => (
      <StarIcon
        key={index}
        filled={index <= rating}
        className={'material-symbols-outlined'}
        data-testid="star-icon">
      star
      </StarIcon>
    ))}
      <span>
        {rating === 1}
        {rating === 2}
        {rating === 3}
        {rating === 4}
        {rating === 5}
      </span>
    </div>
);

export default StaticStarRating;
