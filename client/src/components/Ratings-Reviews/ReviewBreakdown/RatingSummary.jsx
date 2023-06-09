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

const ProgressBarContainer = styled.div`
width: 68%;
height: 12px;
background-color: #ddd;
border-radius: 5px;
display: inline-block;
vertical-align: middle;
margin: 0 10px;
`;

const ProgressBarFill = styled.div`
height: 100%;
background-color: #20bf55;
border-radius: inherit;
width: ${(props) => props.percentage}%;
`;

const Label = styled.span`
display: inline-block;
font-family: 'Manrope', sans-serif;
font-size: 12px;
vertical-align: middle;
`;

const Paragraph = styled.p`
font-size: 0.8rem;
font-family: 'Manrope', sans-serif;
color: #black;
`;

const RatingSummary = ({ metaData }) => {
  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [recommendationPercentage, setRecommendationPercentage] = useState();
  const [loading, setLoading] = useState(true);
  const [metaRating, setMetaRating] = useState({});

  useEffect(() => {
    if (!metaData.ratings || !metaData.recommended) {
      setLoading(true);
      return;
    }

    let totalRatings = 0;
    let totalResponses = 0;
    const { recommended, ratings } = metaData;
    setMetaRating(ratings);

    for (let i = 1; i <= 5; i += 1) {
      totalRatings += i * parseInt(ratings[i], 10);
      totalResponses += parseInt(ratings[i], 10);
    }
    const averageRating = totalRatings / totalResponses;
    setRating(averageRating);
    setTotalReviews(totalResponses);

    const recommendationRatio = parseInt(recommended.true, 10) / (parseInt(recommended.true, 10)
     + parseInt(recommended.false, 10));
    setRecommendationPercentage(Math.round(recommendationRatio * 100));

    setLoading(false);
  }, [metaData]);

  const fillAmount = (index) => {
    if (index <= Math.floor(rating)) {
      return 100;
    }
    if (index - 1 < rating && rating < index) {
      return (rating % 1) * 100;
    }
    return 0;
  };

  return loading ? <div>Loading...</div> : (
    <div>
      <h2>{rating.toFixed(1)}</h2>
      {[1, 2, 3, 4, 5].map((index) => (
        <StarContainer key={index}>
          <FilledStarIcon width={fillAmount(index)}>
            <FontAwesomeIcon icon={faStar} />
          </FilledStarIcon>
          <EmptyStarIcon icon={faStar} />
        </StarContainer>
      ))}
      <Paragraph>{recommendationPercentage}% of reviewers recommend this product.</Paragraph>
      <div>
    {[5, 4, 3, 2, 1].map((index) => (
      <div key={index}>
        <Label>{index} star</Label>
        <ProgressBarContainer>
          <ProgressBarFill percentage={(parseInt(metaRating[index], 10) / totalReviews) * 100} />
        </ProgressBarContainer>
        <Label>{Math.round((parseInt(metaRating[index], 10) / totalReviews) * 100)}%</Label>
      </div>
    ))}
    <Paragraph>Total reviews: {totalReviews}</Paragraph>
    </div>
   </div>
  );
};

export default RatingSummary;
