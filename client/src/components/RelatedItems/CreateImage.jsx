import React from 'react';

const CreateImage = ({ image, width }) => (
    <img className="carouselItem" src={image} style={{ width: width }} />
);

export default CreateImage;
