import React, { useState } from 'react';
import styled from 'styled-components';

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

const FileInput = styled.input`
  display: none;
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
  const handlePhotoInputChange = (event) => {
    const { files } = event.target;
    const selected = Array.from(files).slice(0, 5);

    Promise.all(selected.map((file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => (resolve(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })))
      .then((dataUrls) => {
        handleChange({
          target: {
            name: 'photos',
            value: dataUrls,
          },
        });
      })
      .catch((err) => {
        console.error(err);
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
      <FileInputLabel htmlFor="photo-upload">Upload Photos</FileInputLabel>
      <FileInput id="photo-upload" type='file' multiple onChange={handlePhotoInputChange} />
    </div>
  );
};

export default UploadPhotos;
