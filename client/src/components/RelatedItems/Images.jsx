import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import CreateImage from './CreateImage.jsx';

const Images = ({
  setHoveredOnImages, images, showNext, nextHandler, showPrevious, previousHandler,
}) => {
  const [nextHovered, setNextHovered] = useState(false);
  const [previousHovered, setPreviousHovered] = useState(false);
  return (
  <div className="images" onMouseEnter={() => { setHoveredOnImages(true); }} onMouseLeave={() => { setHoveredOnImages(false); }}>
    <div className="toggleCurrent">
      {showPrevious && <FontAwesomeIcon icon={faCaretLeft} style={{
        color: previousHovered ? 'Ea2213' : 'EC6F7F',
        fontSize: '4em',
      }} onClick={(e) => {
        e.stopPropagation(); previousHandler();
      }} onMouseEnter={() => { setPreviousHovered(true); }}
      onMouseLeave={() => { setPreviousHovered(false); }}/>}
    </div>
    {images.map((image, index) => <CreateImage key={index}
    image={image.photos[0].thumbnail_url}/>)}
      <div className="toggleCurrent">
      {showNext && <FontAwesomeIcon icon={faCaretRight} style={{
        color: nextHovered ? 'Ea2213' : 'EC6F7F',
        fontSize: '4em',
      }}
      onClick={(e) => { e.stopPropagation(); nextHandler(); }}
      onMouseEnter={() => { setNextHovered(true); }}
      onMouseLeave={() => { setNextHovered(false); }}/>}
    </div>
    </div>
  );
};

export default Images;
