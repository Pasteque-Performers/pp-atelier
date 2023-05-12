import React, { useState } from 'react';
import styled from 'styled-components';

const EmailInput = styled.input`
width: 60%;
height: 15px;
padding: 6px;
font-size: 12px;
border: 1px solid #ccc;
border-radius: 4px;
resize: none;
`;

const ReviewEmail = () => {
  const [email, setEmail] = useState('');

  const handleSummaryChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  return (
    <div>
        <EmailInput
        type='email'
        placeholder='Example: jackson11@gmail.com'
        value={email}
        onChange={handleSummaryChange}
        maxLength={60}/>
    </div>
  );
}

export default ReviewEmail;