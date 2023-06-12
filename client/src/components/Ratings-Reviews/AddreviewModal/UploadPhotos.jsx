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

const Upload = styled.label`
padding: 10px 20px;
border: none;
background-color: #20bf55;
color: white;
border-radius: 5px;
cursor: pointer;
transition: all 0.3s ease;
&:hover {
  background-color: #eb3b5a;
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
            <Image src={photo} alt='user added review image'/>
            <ImageName>{`Image ${index + 1}`}</ImageName>
          </ImagePreview>
        ))}
      </ImagePreviewContainer>
      <Upload onClick={handleShowModal} aria-label='upload a photo' >Upload Photos</Upload>
      {showModal && <ImageUploadModal onHideModal={handleHideModal} />}
    </div>
  );
};

export default UploadPhotos;
