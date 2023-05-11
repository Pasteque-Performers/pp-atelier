import React, { useState } from "react";

const ProductCharacteristics = () => {
  const [characteristics, setCharacteristics] = useState({
    size: null,
    width: null,
    comfort: null,
    quality: null,
    length: null,
    fit: null,
  });

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setCharacteristics((prevVals) => ({ ...prevVals, [name]: parseInt(value, 10) }));
  };
  const meanings = {
    size: {
      1: 'A size too small',
      2: '½ a size too small',
      3: 'Perfect',
      4: '½ a size too big',
      5: 'A size too wide',
    },
    width: {
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly wide',
      5: 'Too wide',
    },
    comfort: {
      1: 'A size too small',
      2: 'Slightly uncomfortable',
      3: 'Ok',
      4: 'Comfortable',
      5: 'Perfect',
    },
    quality:{
      1: 'Poor',
      2: 'Below average',
      3: 'Perfect',
      4: 'Pretty great',
      5: 'Perfect',
    },
    length: {
      1: 'Runs Short',
      2: 'Runs slightly short',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
    fit: {
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
  };

  return (
    <div>
      <div>{characteristics.size ? `Selected: ${characteristics.size} - ${meanings.size[characteristics.size]}` : 'None selected'}</div>
      <div>
        <label> Size:
          <input type='radio' name='size' value='1' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='size' value='2' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='size' value='3' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='size' value='4' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='size' value='5' onChange={handleRadioChange} />
        </label>
      </div>
      <div>{characteristics.width ? `Selected: ${characteristics.width} - ${meanings.width[characteristics.width]}` : 'None selected'}</div>
      <div>
        <label> Width:
          <input type='radio' name='width' value='1' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='width' value='2' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='width' value='3' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='width' value='4' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='width' value='5' onChange={handleRadioChange} />
        </label>
      </div>
      <div>{characteristics.comfort ? `Selected: ${characteristics.comfort} - ${meanings.comfort[characteristics.comfort]}` : 'None selected'}</div>
      <div>
        <label> Comfort:
          <input type='radio' name='comfort' value='1' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='comfort' value='2' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='comfort' value='3' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='comfort' value='4' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='comfort' value='5' onChange={handleRadioChange} />
        </label>
      </div>
      <div>{characteristics.quality ? `Selected: ${characteristics.quality} - ${meanings.quality[characteristics.quality]}` : 'None selected'}</div>
      <div>
        <label> Quality:
          <input type='radio' name='quality' value='1' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='quality' value='2' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='quality' value='3' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='quality' value='4' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='quality' value='5' onChange={handleRadioChange} />
        </label>
      </div>
      <div>{characteristics.length ? `Selected: ${characteristics.length} - ${meanings.length[characteristics.length]}` : 'None selected'}</div>
      <div>
        <label> Length:
          <input type='radio' name='length' value='1' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='length' value='2' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='length' value='3' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='length' value='4' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='length' value='5' onChange={handleRadioChange} />
        </label>
      </div>
      <div>{characteristics.fit ? `Selected: ${characteristics.fit} - ${meanings.fit[characteristics.fit]}` : 'None selected'}</div>
      <div>
        <label> Fit:
          <input type='radio' name='fit' value='1' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='fit' value='2' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='fit' value='3' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='fit' value='4' onChange={handleRadioChange} />
        </label>
        <label>
          <input type='radio' name='fit' value='5' onChange={handleRadioChange} />
        </label>
      </div>
    </div>
  );
};

export default ProductCharacteristics;
