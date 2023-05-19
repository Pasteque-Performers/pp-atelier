import React, { useState } from 'react';
import styled from 'styled-components';
import ImageUploadModal from './ImageUploadModal.jsx';

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const ImagePreview = styled.div`
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const ImageName = styled.div`
  text-align: center;
  font-size: 0.8rem;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const UploadPhotos = ({ formData, handleChange }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = (photos) => {
    setShowModal(false);
    handleChange({
      target: {
        name: 'photos',
        value: photos,
      },
    });
  };

  return (
    <div>
      <ImagePreviewContainer>
        {formData.photos.map((photo, index) => (
          <ImagePreview key={index}>
            <Image src={photo} />
            <ImageName>{`Image ${index + 1}`}</ImageName>
          </ImagePreview>
        ))}
      </ImagePreviewContainer>
      <FileInputLabel onClick={handleShowModal}>Upload Photos</FileInputLabel>
      {showModal && <ImageUploadModal onHideModal={handleHideModal} />}
    </div>
  );
};

export default UploadPhotos;
