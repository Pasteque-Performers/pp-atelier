import React from 'react';
import CreateImage from './CreateImage.jsx';

const Images = ({
  setHoveredOnImages, images, showNext, nextHandler, showPrevious, previousHandler,
}) => (
<div className="images" onMouseEnter={() => { setHoveredOnImages(true); }} onMouseLeave={() => { setHoveredOnImages(false); }}>
  <div className="toggleCurrent">
    {showPrevious && <button onClick={(e) => {
      e.stopPropagation(); previousHandler();
    }}>Previous</button>}
  </div>
  {images.map((image, index) => <CreateImage key={index}
  image={image.photos[0].thumbnail_url}/>)}
    <div className="toggleCurrent">
    {showNext && <button onClick={(e) => { e.stopPropagation(); nextHandler(); }}>Next</button>}
  </div>
  </div>
);

export default Images;
