import React, { useState } from 'react';

const ReviewEmail = () => {
  const [email, setEmail] = useState('');

  const handleSummaryChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  return (
    <div>
      <label>
        <input type='email'
        placeholder='Example: jackson11@gmail.com'
        value={email}
        onChange={handleSummaryChange}
        maxLength={60}/>
      </label>
    </div>
  );
}

export default ReviewEmail;