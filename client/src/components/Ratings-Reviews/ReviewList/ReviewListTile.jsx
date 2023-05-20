import React, { useState } from 'react';
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
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  color: black;
  font-family: 'Manrope', sans-serif;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #eb3b5a;
  }
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

const StarIcon = styled.i`
  font-size: 20px;
  color: ${({ filled }) => (filled ? '#ffd700' : 'lightgray')};
  cursor: pointer;
  font-variation-settings: ${({ filled }) => (filled ? "'FILL' 1" : "'FILL' 0")};
  margin-right: 5px;
`;

const ReviewListTile = ({ review }) => {
  const [showFullBody, setShowFullBody] = useState(false);

  const toggleShowFullBody = () => {
    setShowFullBody(!showFullBody);
  };

  return (
    <TileContainer>
      <ReviewHeader>
      <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <StarIcon
          key={index}
          filled={index <= review.rating}
          className={`material-symbols-outlined ${index <= review.rating ? 'filled' : ''}`}
        >
          star
        </StarIcon>
      ))}
    </div>
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
        <MoreButton onClick={toggleShowFullBody} aria-label='view more text'>
          {showFullBody ? 'Show less' : 'Show more'}
        </MoreButton>
      )}
      {review.photos.map((photo, index) => (
        <ReviewImage key={index} src={photo.url} alt="review images" />
      ))}
    </TileContainer>
  );
};

export default ReviewListTile;
