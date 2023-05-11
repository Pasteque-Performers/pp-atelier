import React, { useState } from 'react';

const ReviewSummary = () => {
  const [summary, setSummary] = useState('');

  const handleSummaryChange = (event) => {
    const { value } = event.target;
    setSummary(value);
  };

  return (
    <div>
      <label>
        <textarea
        placeholder='Example: Best purchase ever!'
        value={summary}
        onChange={handleSummaryChange}
        maxLength={60}/>
      </label>
    </div>
  );
};

export default ReviewSummary;
