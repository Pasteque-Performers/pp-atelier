import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const TileContainer = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 800px;
  max-width: 800px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-family: 'Manrope', sans-serif;
  margin-bottom: 10px;
`;

const ReviewText = styled.p`
  font-size: 16px;
  font-family: 'Manrope', sans-serif;
  line-height: 1.5;
`;

const ReviewerName = styled.p`
  font-size: 14px;
  font-family: 'Manrope', sans-serif;
  color: #888;
`;

const Date = styled.p`
  font-size: 14px;
  font-family: 'Manrope', sans-serif;
  color: #888;
`;

const MoreButton = styled.button`
  background-color: #0b7bc1;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Manrope', sans-serif;
  margin-top: 10px;
`;

const ReviewImage = styled.img`
  width: 80px;
  height: 65px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 5px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewListTile = ({ review }) => {
  const [showFullBody, setShowFullBody] = useState(false);

  const toggleShowFullBody = () => {
    setShowFullBody(!showFullBody);
  };

  return (
    <TileContainer>
      <ReviewHeader>
        <Title>{review.summary}</Title>
        <div>
          <ReviewerName>{review.reviewer_name}</ReviewerName>
          <Date><Date>{review.date.replace(/T.*/, '')}</Date></Date>
        </div>
      </ReviewHeader>
      <ReviewText>
        {showFullBody ? review.body : review.body.slice(0, 250)}
      </ReviewText>
      {review.body.length > 250 && (
        <MoreButton onClick={toggleShowFullBody}>
          {showFullBody ? 'Show less' : 'Show more'}
        </MoreButton>
      )}
      {review.photos.map((photo, index) => (
        <ReviewImage key={index} src={photo.url} alt="" />
      ))}
    </TileContainer>
  );
};

export default ReviewListTile;
