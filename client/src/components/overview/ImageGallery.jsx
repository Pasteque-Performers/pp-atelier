import React, { useState } from 'react';

const ImageGallery = ({ selectedStyle }) => {
  const [selectedImage, setSelectedImage] = useState('');

  // Set the first image as the selected image when a new style is selected
  React.useEffect(() => {
    if (selectedStyle && selectedStyle.photos && selectedStyle.photos.length > 0) {
      setSelectedImage(selectedStyle.photos[0].url);
    }
  }, [selectedStyle]);

  const handleThumbnailClick = (url) => {
    setSelectedImage(url);
  };

  return (
    <div>
      {selectedStyle && selectedStyle.photos && (
        <div>
          <div>
            <img src={selectedImage} alt="Selected" style={{ width: '500px', height: '500px' }} />
          </div>

          <div style={{ display: 'flex', overflowX: 'scroll' }}>
            {selectedStyle.photos.slice(0, 7).map((photo, index) => (
              <img
                key={index}
                src={photo.thumbnail_url}
                alt="Thumbnail"
                style={{ width: '70px', height: '70px', margin: '5px' }}
                onClick={() => handleThumbnailClick(photo.url)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
