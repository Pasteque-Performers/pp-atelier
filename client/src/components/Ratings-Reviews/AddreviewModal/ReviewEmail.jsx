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

const ReviewEmail = ({ formData, handleChange }) => (
    <div>
        <EmailInput
        type='email'
        placeholder='Example: jackson11@gmail.com'
        value={formData.email}
        onChange={handleChange}
        maxLength={60}
        name='email'/>
    </div>
);

export default ReviewEmail;
