import React, { useState } from 'react';
import QaBody from './QaBody.jsx';
import Search from './Search.jsx';

const QaSection = () => {
  const [productId, setProductId] = useState(40346);

  return (
    <section>
        <h2>Questions and Answers</h2>
        <Search />
        <QaBody productId = {productId}/>
        <button>Load More Questions</button>
        <button>Ask a Question</button>
    </section>
  );
};

export default QaSection;
