import React, { useState } from 'react';

const OverallStarRating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div>
    {[1, 2, 3, 4, 5].map((index) => (
      <img
      key={index}
      src={index <= rating ? filledStar : emptyStar}
      alt='star'
      onClick={() => handleClick(index)}/>
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
