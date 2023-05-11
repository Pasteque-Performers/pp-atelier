import React from 'react';

const Answer = ({ answer }) => {
  const date = new Date(answer.date);
  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(date);

  return (
    <div>
      <div>A: {answer.body}</div>
      { answer.photos.length ? answer.photos.map((photo, i) => <img
      src={photo.url}
      key={i}
      alt="Answer Img"
      style={{ width: '200px', height: '150px' }}/>) : null }
      <div>By: {answer.answerer_name === 'Seller' ? <strong>{answer.answerer_name}</strong> : answer.answerer_name}, {formattedDate}</div>
      <div>Helpful? <button>Yes({answer.helpfulness})</button></div>
      <button>Report</button>
    </div>
  );
};

export default Answer;
