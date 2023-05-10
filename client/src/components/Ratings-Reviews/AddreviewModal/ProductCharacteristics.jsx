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
          A size too small
        </label>
        <label>
          <input type="radio" name="size" value="2" onChange={handleRadioChange} />
          ½ a size too small
        </label>
        <label>
          <input type="radio" name="size" value="3" onChange={handleRadioChange} />
          Perfect
        </label>
        <label>
          <input type="radio" name="size" value="4" onChange={handleRadioChange} />
          ½ a size too big
        </label>
        <label>
          <input type="radio" name="size" value="5" onChange={handleRadioChange} />
          A size too wide
        </label>
      </div>
    </div>
  );
}

export default ProductCharacteristics;
