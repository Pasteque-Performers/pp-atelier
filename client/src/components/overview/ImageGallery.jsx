// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   width: 600px;
// `;

// const ImageContainer = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center; // Added to vertically center the buttons
// `;

// const ThumbnailContainer = styled.div`
//   display: flex;
//   overflowX: 'scroll';
// `;

// const ThumbnailImage = styled.img`
//   width: ${(props) => (props.isExpanded ? '50px' : '70px')};
//   height: ${(props) => (props.isExpanded ? '50px' : '70px')};
//   margin: 5px;
// `;

// const MainImage = styled.img`
//   width: ${(props) => (props.isExpanded ? '1000px' : '500px')};
//   height: ${(props) => (props.isExpanded ? '1000px' : '500px')};
// `;

// const Button = styled.button`
//   position: absolute; // Added
//   background-color: #f0f0f0;
//   border: none;
//   color: #333;
//   padding: 10px;
//   cursor: pointer;
//   &:hover {
//     background-color: #ddd;
//   }
// `;

// const PrevButton = styled(Button)`
//   left: 5px; // Added to position the button on the left side of the container
// `;

// const NextButton = styled(Button)`
//   right: 5px; // Added to position the button on the right side of the container
// `;

// const ExpandButton = styled(Button)`
//   bottom: 5px; // Added to position the button on the bottom of the container
// `;

// const ImageGallery = ({ selectedStyle }) => {
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [isExpanded, setIsExpanded] = useState(false);

//   useEffect(() => {
//     setSelectedImageIndex(0);
//   }, [selectedStyle]);

//   const handlePrevClick = () => {
//     setSelectedImageIndex((oldIndex) => {
//       if (oldIndex === 0) return selectedStyle.photos.length - 1;
//       return oldIndex - 1;
//     });
//   };

//   const handleNextClick = () => {
//     setSelectedImageIndex((oldIndex) => {
//       if (oldIndex === selectedStyle.photos.length - 1) return 0;
//       return oldIndex + 1;
//     });
//   };

//   const handleExpand = () => {
//     setIsExpanded(true);
//   };

//   const handleMinimize = () => {
//     setIsExpanded(false);
//   };

//   return (
//     <Container>
//       {selectedStyle && selectedStyle.photos && (
//         <div>
//           <ImageContainer>
//             <PrevButton onClick={handlePrevClick}>Prev</PrevButton>
//             <MainImage
//               src={selectedStyle.photos[selectedImageIndex].url}
//               alt="Selected"
//               isExpanded={isExpanded}
//             />
//             <NextButton onClick={handleNextClick}>Next</NextButton>
//           </ImageContainer>

//           <ExpandButton onClick={isExpanded ? handleMinimize : handleExpand}>
//             {isExpanded ? 'Minimize' : 'Expand'}
//           </ExpandButton>

//           <ThumbnailContainer>
//             {selectedStyle.photos.map((photo, index) => (
//               <ThumbnailImage
//                 key={index}
//                 src={photo.thumbnail_url}
//                 alt="Thumbnail"
//                 isExpanded={isExpanded}
//                 onClick={() => setSelectedImageIndex(index)}
//               />
//             ))}
//           </ThumbnailContainer>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default ImageGallery;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 600px;
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
`;

const ThumbnailImage = styled.img`
  width: ${(props) => (props.isExpanded ? '50px' : '70px')};
  height: ${(props) => (props.isExpanded ? '50px' : '70px')};
  margin: 5px;
`;

const MainImage = styled.img`
  width: ${(props) => (props.isExpanded ? '1000px' : '500px')};
  height: ${(props) => (props.isExpanded ? '1000px' : '500px')};
  max-width: 100%;
`;

const Button = styled.button`
  position: absolute;
  background: transparent;
  color: white;
  font-size: 2em;
  border: none;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const PrevButton = styled(Button)`
  left: 5px;
`;

const NextButton = styled(Button)`
  right: 5px;
`;

const ExpandButton = styled(Button)`
  top: 5px;
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
            <PrevButton onClick={handlePrevClick}>⬅️</PrevButton>
            <MainImage
              src={selectedStyle.photos[selectedImageIndex].url}
              alt="Selected"
              isExpanded={isExpanded}
            />
            <NextButton onClick={handleNextClick}>➡️</NextButton>
            <ExpandButton onClick={isExpanded ? handleMinimize : handleExpand}>
              {isExpanded ? '[  ]' : '[  ]'}
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
