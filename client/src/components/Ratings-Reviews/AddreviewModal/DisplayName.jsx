import React, { useState } from 'react';

const DisplayName = () => {
  const [displayName, setDisplayName] = useState('');

  const handleDisplayNameChange = (event) => {
    const { value } = event.target;
    setDisplayName(value);
  };

  return (
    <div>
      <label>
        <textarea
        placeholder='Example: jackson11'
        value={displayName}
        onChange={handleDisplayNameChange}
        maxLength={60}/>
      </label>
      For authentication reasons, you will not be emailed
    </div>
  );
};

export default DisplayName;