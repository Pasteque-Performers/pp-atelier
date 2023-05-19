import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  max-width: 500px;
  width: 100%;
`;

const ImageInput = styled.input`
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 90px;
  right: 90px;
  padding: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  font-family: 'Manrope', sans-serif;
  color: black;
  cursor: pointer;
`;

const ImageName = styled.div`
  text-align: center;
  font-size: 0.8rem;
  font-family: 'Manrope', sans-serif;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;
const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;
const ImagePreview = styled.div`
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const ImageUploadModal = ({ onHideModal }) => {
  const [photos, setPhotos] = useState([]);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState('');

  const handleAddPhoto = () => {
    if (photos.length < 5) {
      setPhotos([...photos, currentPhotoUrl]);
      setCurrentPhotoUrl('');
    }
  };

  const handleCloseModal = () => {
    onHideModal(photos);
  };

  return (
    <ModalBackground>
      <ModalContent>
        <CloseButton onClick={handleCloseModal}>×</CloseButton>
        <ImagePreviewContainer>
          {photos.map((photo, index) => (
            <ImagePreview key={index}>
              <Image src={photo} />
              <ImageName>{`Image ${index + 1}`}</ImageName>
            </ImagePreview>
          ))}
        </ImagePreviewContainer>
        <ImageInput
          type='url'
          value={currentPhotoUrl}
          onChange={(e) => setCurrentPhotoUrl(e.target.value)}
          placeholder='Image URL'
        />
        <button onClick={handleAddPhoto} disabled={photos.length >= 5}>Add Photo</button>
      </ModalContent>
    </ModalBackground>
  );
};

export default ImageUploadModal;
