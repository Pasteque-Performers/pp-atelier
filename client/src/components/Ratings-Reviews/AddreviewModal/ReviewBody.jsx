import React, { useState } from 'react';

const ReviewBody = () => {
  const [reviewBody, setReviewBody] = useState();
  const [count, setCount] = useState(50);

  const handleChange = (event) => {
    const { value } = event.target;
    setReviewBody(value);
    setCount(50 - value.length);
  };

  return (
    <div>
      <label>
        <textarea
        placeholder='Why did you like the product or not?'
        value={reviewBody}
        onChange={handleChange}
        maxLength={1000}/>
      </label>
      {count >= 0 ? (
        <div>Minimum required characters left: {count}</div>
      ) : (
        <div>Minimum reached</div>
      )}
    </div>
  );
};

export default ReviewBody;
