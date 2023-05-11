import React, { useState } from 'react';

const UploadPhotos = () => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const handlePhotoInputChange = (event) => {
    const { files } = event.target;
    const selected = Array.from(files).slice(0, 5);
    setSelectedPhotos(selected);
  };

  return (
    <div>
      <div>Selected photos:</div>
      {selectedPhotos.map((photo, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(photo)} alt={photo.name} width='100'/>
            <div>{photo.name}</div>
          </div>
      ))}
      <input type='file' multiple onChange={handlePhotoInputChange}/>
    </div>
  );
}

export default UploadPhotos;