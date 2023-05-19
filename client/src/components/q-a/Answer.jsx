import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ImageModal from './ImageModal.jsx';

const ImgPreview = styled.img`
  width: 200px;
  height: 150px;
  border-radius: 25px;
  margin: 0 5px 0 5px;
`;

const Answer = ({
  answer, getAnswers, HelpfulButton,
  setReportedAnswer, BoldTitle, QuestionButton,
}) => {
  const date = new Date(answer.date);
  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(date);
  const [showFullImg, setShowFullImg] = useState(false);
  const [image, setImage] = useState('');

  const setAnswerHelpfulness = () => {
    const answerId = answer.answer_id;
    axios.put(`/classes/qa/answers/${answerId}/helpful`, null)
      .then(() => {
        localStorage[answerId] = answerId;
        getAnswers();
      })
      .catch((error) => console.log('Error updating answer helpfulness', error));
  };

  const reportAnswer = () => {
    const answerId = answer.answer_id;
    axios.put(`/classes/qa/answers/${answerId}/report`, null)
      .then(() => {
        setReportedAnswer(answerId);
      })
      .catch((error) => {
        console.log('Error reporting answer', error);
      });
  };

  useEffect(() => {
    if (showFullImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showFullImg]);

  return (
    <div>
      {showFullImg && <ImageModal image={image} setShowFullImg={setShowFullImg}/> }
      <div><BoldTitle>A: </BoldTitle>{answer.body}</div>
      { answer.photos.length ? answer.photos.map((photo, i) => <ImgPreview
      onClick={() => {
        setShowFullImg(!showFullImg);
        setImage(photo.url);
      }}
      src={photo.url}
      key={i}
      alt="Answer Img" />) : null }
      <div>By: {answer.answerer_name === 'Seller' ? <strong>{answer.answerer_name}</strong> : answer.answerer_name}, {formattedDate}</div>
      <div>Helpful? {!localStorage[answer.answer_id]
        ? <HelpfulButton onClick={setAnswerHelpfulness}>Yes({answer.helpfulness})</HelpfulButton>
        : <span>Yes({answer.helpfulness})</span>}
      </div>
      <QuestionButton onClick={reportAnswer}>Report Answer</QuestionButton>
    </div>
  );
};

export default Answer;
