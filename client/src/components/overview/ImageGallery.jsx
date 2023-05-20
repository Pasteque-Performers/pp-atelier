import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  width: 600px;
  padding: 5px 5px;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  justify-content: center;
  padding: 1px;
`;

const ThumbnailImage = styled.img`
  width: ${(props) => (props.isExpanded ? '50px' : '70px')};
  height: ${(props) => (props.isExpanded ? '50px' : '70px')};
  border-radius: 2px;
`;

const MainImage = styled.img`
  width: ${(props) => (props.isExpanded ? '1000px' : '500px')};
  height: ${(props) => (props.isExpanded ? '1000px' : '500px')};
  max-width: 100%;
  border-radius: 2px;
`;

const Button = styled.button`
  position: absolute;
  background: transparent;
  color: white;
  font-size: 2em;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const PrevButton = styled(Button)`
  left: 10%;
`;

const NextButton = styled(Button)`
  right: 10%;
`;

const ExpandButton = styled(Button)`
  bottom: 5px;
  right: 10%;
`;

const ImageGallery = ({ selectedStyle }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedStyle]);

  const handlePrevClick = () => {
    setSelectedImageIndex((oldIndex) => {
      if (oldIndex === 0) return selectedStyle.photos.length - 1;
      return oldIndex - 1;
    });
  };

  const handleNextClick = () => {
    setSelectedImageIndex((oldIndex) => {
      if (oldIndex === selectedStyle.photos.length - 1) return 0;
      return oldIndex + 1;
    });
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleMinimize = () => {
    setIsExpanded(false);
  };

  return (
    <Container>
      {selectedStyle && selectedStyle.photos && (
        <div>
          <ImageContainer isExpanded={isExpanded}>
            <PrevButton onClick={handlePrevClick}>
              <FontAwesomeIcon icon={faArrowLeft} />
              </PrevButton>
            <MainImage
              src={selectedStyle.photos[selectedImageIndex].url}
              alt="Selected"
              isExpanded={isExpanded}
            />
            <NextButton onClick={handleNextClick}>
              <FontAwesomeIcon icon={faArrowRight} />
            </NextButton>
            <ExpandButton onClick={isExpanded ? handleMinimize : handleExpand}>
              {isExpanded ? <FontAwesomeIcon icon={faCompress} /> : <FontAwesomeIcon icon={faExpand} />}
            </ExpandButton>
          </ImageContainer>
          <ThumbnailContainer>
            {selectedStyle.photos.map((photo, index) => (
              <ThumbnailImage
                key={index}
                src={photo.thumbnail_url}
                alt="Thumbnail"
                isExpanded={isExpanded}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </ThumbnailContainer>
        </div>
      )}
    </Container>
  );
};

export default ImageGallery;
