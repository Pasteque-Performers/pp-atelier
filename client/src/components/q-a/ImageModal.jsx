import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-item: center;
`;

const EnlargedImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  display: block;
  margin: auto;
`;

const ImageModal = ({ image, setShowFullImg }) => (
  <ModalOverlay onClick={() => setShowFullImg(false)}>
      <EnlargedImage src={image} alt="Enlarged Image" />
    </ModalOverlay>
);

export default ImageModal;
