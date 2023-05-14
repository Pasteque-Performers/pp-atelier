import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageModal from './ImageModal.jsx';

const Answer = ({
  answer, getAnswers, helpfulAnswers, setHelpfulAnswers, setReportedAnswer,
}) => {
  const date = new Date(answer.date);
  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(date);
  const [showFullImg, setShowFullImg] = useState(false);
  const [image, setImage] = useState('');

  const setAnswerHelpfulness = () => {
    const answerId = answer.answer_id;
    axios.put(`/classes/qa/answers/${answerId}/helpful`, null)
      .then(() => {
        setHelpfulAnswers([...helpfulAnswers, answerId]);
        console.log('Sucessfully updated answer helpfulness');
        getAnswers(1);
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
      <div><strong>A: </strong>{answer.body}</div>
      { answer.photos.length ? answer.photos.map((photo, i) => <img
      onClick={() => {
        console.log(photo.url);
        setShowFullImg(!showFullImg);
        setImage(photo.url);
      }}
      src={photo.url}
      key={i}
      alt="Answer Img"
      style={{ width: '200px', height: '150px' }}/>) : null }
      <div>By: {answer.answerer_name === 'Seller' ? <strong>{answer.answerer_name}</strong> : answer.answerer_name}, {formattedDate}</div>
      <div>Helpful? {!helpfulAnswers.includes(answer.answer_id)
        ? <button onClick={setAnswerHelpfulness}>Yes({answer.helpfulness})</button>
        : <span>Yes({answer.helpfulness})</span>}
      </div>
      <button onClick={reportAnswer}>Report</button>
    </div>
  );
};

export default Answer;
