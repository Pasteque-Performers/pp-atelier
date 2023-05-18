import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;
const ThumbnailContainer = styled.div`
  display: flex;
  overflowX: 'scroll';
`;
const ThumbnailImage = styled.img`
  width: ${(props) => (props.isExpanded ? '50px' : '70px')};
  height: ${(props) => (props.isExpanded ? '50px' : '70px')};
  margin: 5px;
`;
const MainImage = styled.img`
  width: ${(props) => (props.isExpanded ? '1000px' : '500px')};
  height: ${(props) => (props.isExpanded ? '1000px' : '500px')};
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
          <ImageContainer>
            <button onClick={handlePrevClick}>Prev</button>
            <MainImage
              src={selectedStyle.photos[selectedImageIndex].url}
              alt="Selected"
              isExpanded={isExpanded}
            />
            <button onClick={handleNextClick}>Next</button>
          </ImageContainer>

          <button onClick={isExpanded ? handleMinimize : handleExpand}>
            {isExpanded ? 'Minimize' : 'Expand'}
          </button>

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
