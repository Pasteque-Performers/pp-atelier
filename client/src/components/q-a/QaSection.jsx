import React from 'react';
import QaBody from './QaBody.jsx';
import Search from './Search.jsx';

const QaSection = () => (
    <section>
        <h2>Questions and Answers</h2>
        <Search />
        <QaBody />
        <button>Load More Questions</button>
        <button>Ask a Question</button>
    </section>
);

export default QaSection;
