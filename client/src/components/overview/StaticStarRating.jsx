import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarContainer = styled.div`
display: inline-block;
position: relative;
font-size: 20px;
color: #ddd;
`;

const FilledStarIcon = styled.div`
display: inline-block;
position: relative;
width: ${(props) => props.width}%;
overflow: hidden;
color: #ffd700;
white-space: nowrap;
z-index: 1;
`;

const EmptyStarIcon = styled(FontAwesomeIcon)`
position: absolute;
left: 0;
top: 0;
color: #ddd;
z-index: 0;
`;

const RatingSummary = () => {
  const [rating, setRating] = useState(0);
  const exampleData = {
    1: '139',
    2: '201',
    3: '316',
    4: '301',
    5: '668',
  };

  useEffect(() => {
    let totalRatings = 0;
    let totalResponses = 0;

    for (let i = 1; i <= 5; i += 1) {
      totalRatings += i * parseInt(exampleData[i], 10);
      totalResponses += parseInt(exampleData[i], 10);
    }
    const averageRating = totalRatings / totalResponses;
    setRating(averageRating);
  }, []);

  const fillAmount = (index) => {
    if (index <= Math.floor(rating)) {
      return 100;
    }
    if (index - 1 < rating && rating < index) {
      return (rating % 1) * 100;
    }
    return 0;
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <StarContainer key={index}>
          <FilledStarIcon width={fillAmount(index)}>
            <FontAwesomeIcon icon={faStar} />
          </FilledStarIcon>
          <EmptyStarIcon icon={faStar} />
        </StarContainer>
      ))}
    </div>
  );
};

export default RatingSummary;
