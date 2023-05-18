// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Information from './Information.jsx';
// // import StaticStarRating from './StaticStarRating.jsx';
// // import OverallStarRating from './Ratings-Reviews/AddreviewModal/OverallStarRating.jsx';
// import StyleSelector from './StyleSelector.jsx';
// import AddToCart from './AddToCart.jsx';

// const Overview = () => {
//   const [product, setProduct] = useState(null);
//   const [selectedStyle, setSelectedStyle] = useState(null);

//   useEffect(() => {
//     // Replace 40344 with the actual product ID you want to fetch
//     axios.get('classes/products')
//       .then((response) => {
//         setProduct(response.data[0]);
//       })
//       .catch((error) => {
//         console.error('Error fetching data: ', error.response || error);
//       });
//   }, []);
//   console.log('selectedStyle in overview', selectedStyle);

//   return (
//     <div>
//       <h1>Overview</h1>
//       {/* <StaticStarRating /> */}
//       <Information product={product} />
//       {/* <OverallStarRating /> */}
//       {product && <StyleSelector styles={product.styles}
//       productId={product.id} onStyleSelect={setSelectedStyle} />}
//       {selectedStyle && <AddToCart selectedStyle={selectedStyle} />}
//     </div>
//   );
// };

// export default Overview;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../../../dist/style.css';
import Information from './Information.jsx';
import OverallStarRating from '../Ratings-Reviews/AddreviewModal/OverallStarRating.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';

const Overview = () => {
  const [product, setProduct] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  useEffect(() => {
    // Replace 40344 with the actual product ID you want to fetch
    axios.get('classes/products')
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error.response || error);
      });
  }, []);

  return (
    <div className="overview-container">
      <h1>Overview</h1>
      {product && (
        <>
          <div className="image-gallery-container">
            <StyleSelector styles={product.styles} productId={product.id}
            onStyleSelect={setSelectedStyle} />
            {selectedStyle && <ImageGallery selectedStyle={selectedStyle} />}
          </div>
          <div className="details-container">
            <Information product={product} />
            {/* <OverallStarRating /> */}
            {selectedStyle && <AddToCart selectedStyle={selectedStyle} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;