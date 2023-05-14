import React, { useState } from 'react';
import QaBody from './QaBody.jsx';

const QaSection = () => {
  const [productId, setProductId] = useState(40346);

  return (
    <section>
        <h2>Questions and Answers</h2>
        <QaBody productId = {productId}/>
    </section>
  );
};

export default QaSection;
