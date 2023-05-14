import React from 'react';
import CreateImage from './CreateImage.jsx';

const Images = ({ setHoveredOnImages, images }) => (
<div className="images" onMouseEnter={() => { setHoveredOnImages(true); }} onMouseLeave={() => { setHoveredOnImages(false); }}>
  {images.map((image, index) => <CreateImage key={index}
  image={image.photos[0].thumbnail_url}/>)} </div>
);

export default Images;
