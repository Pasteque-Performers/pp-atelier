import React, { useState } from 'react';

const DoYouRecommend = () => {
  const [recommend, setRecommend] = useState(null);
  const handleRecommendChange = (event) => {
    setRecommend(event.target.value === 'yes');
  };
  return (
    <div>
      <h3>Do you recommend this product?</h3>
       <div>
         <label>
           <input
           type='radio'
           value='yes'
           checked={recommend === true}
           onChange={handleRecommendChange}/>
           Yes
         </label>
       </div>
       <div>
         <label>
           <input
           type='radio'
           value='no'
           checked={recommend === false}
           onChange={handleRecommendChange}/>
           No
         </label>
       </div>
    </div>
  );
};

export default DoYouRecommend;