import React from 'react';
import axios from 'axios';

const Answer = ({
  answer, getAnswers, helpfulAnswers, setHelpfulAnswers,
}) => {
  const date = new Date(answer.date);
  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(date);

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
        console.log('Sucessfully reported answer');
        getAnswers(1);
      })
      .catch((error) => {
        console.log('Error reporting answer', error);
      });
  };

  return (
    <div>
      <div>A: {answer.body}</div>
      { answer.photos.length ? answer.photos.map((photo, i) => <img
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
