import React, { useState } from "react";

function ProductCharacteristics() {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (event) => {
    setSelectedValue(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <div>{selectedValue ? `Selected: ${selectedValue}` : 'None selected'}</div>
      <div>
        <label> Size:
          <input type="radio" name="size" value="1" onChange={handleRadioChange} />
        </label>
        <label>
          <input type="radio" name="size" value="2" onChange={handleRadioChange} />
        </label>
        <label>
          <input type="radio" name="size" value="3" onChange={handleRadioChange} />
        </label>
        <label>
          <input type="radio" name="size" value="4" onChange={handleRadioChange} />
        </label>
        <label>
          <input type="radio" name="size" value="5" onChange={handleRadioChange} />
        </label>
      </div>
    </div>
  );
}

export default ProductCharacteristics;
