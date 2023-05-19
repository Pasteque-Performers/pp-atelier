import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import CreateImage from './CreateImage.jsx';

const ImageList = styled.div`
  position: absolute;
  z-index: 6;
  display: flex;
  background-color: white;
  top: 60%;
  height: 200px;
  padding: 5%;
  border: black solid;
`;

const Carousel = styled.div`
  overflow: hidden;
`;

const Inner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
  width: 600px;
`;

const Images = ({
  setHoveredOnImages, images, showNext, nextHandler, showPrevious, previousHandler, active,
}) => {
  const [nextHovered, setNextHovered] = useState(false);
  const [previousHovered, setPreviousHovered] = useState(false);
  return (
  <ImageList onMouseEnter={() => { setHoveredOnImages(true); }}
  onMouseLeave={() => { setHoveredOnImages(false); }}>
    <div className="toggleCurrent">
      {showPrevious && <FontAwesomeIcon icon={faCaretLeft} style={{
        color: previousHovered ? 'Ea2213' : 'EC6F7F',
        fontSize: '4em',
      }} onClick={(e) => {
        e.stopPropagation(); previousHandler();
      }} onMouseEnter={() => { setPreviousHovered(true); }}
      onMouseLeave={() => { setPreviousHovered(false); }}/>}
    </div>
    <Carousel>
      <Inner style={{ transform: `translateX(-${active * 25}%)` }}>
    {images.map((image, index) => <CreateImage key={index}
    image={image.photos[0].thumbnail_url} width={'25%'}/>)}
      </Inner>
    </Carousel>
      <div className="toggleCurrent">
      {showNext && <FontAwesomeIcon icon={faCaretRight} style={{
        color: nextHovered ? 'Ea2213' : 'EC6F7F',
        fontSize: '4em',
      }}
      onClick={(e) => { e.stopPropagation(); nextHandler(); }}
      onMouseEnter={() => { setNextHovered(true); }}
      onMouseLeave={() => { setNextHovered(false); }}/>}
    </div>
    </ImageList>
  );
};

export default Images;
