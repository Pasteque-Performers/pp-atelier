import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Question from './Question.jsx';
import QuestionModal from './QuestionModal.jsx';

const SearchBar = styled.input`
  font-family: ${(props) => props.theme.fontFamily};
  font-weight: ${(props) => props.theme.fontWeight.light};
  width: 400px;
  height: 30px;
  padding: 0 0 0 10px;
  margin-bottom: 15px;
  border-radius: 25px;
  font-size: 15px;
`;

const SearchTitle = styled.h3`
font-family: ${(props) => props.theme.fontFamily};
font-weight: ${(props) => props.theme.fontWeight.bold};
font-size: 25px;
margin-bottom: 10px;
padding: 0 0 0 10px;
`;

const BodyContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const BodyButton = styled.button`
  background-color: #100E04;
  color: white;
  width: 200px;
  height: 30px;
  margin-top: 20px;
  border-radius: 25px;
`;

const QuestionElement = styled.li`
  font-family: ${(props) => props.theme.fontFamily};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  margin-top: 15px;
  margin-bottom: 25px;
`;

const QaBody = ({ productId, ScrollableList }) => {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [loadedQuestions, setLoadedQuestions] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  // Find a way to store this state in the cookie for user sessions if needed
  const [helpfulQuestions, setHelpfulQuestions] = useState([]);

  const setReportedQuestion = (questionId) => {
    const updatedQuestions = questions.filter((question) => question.question_id !== questionId);
    setQuestions(updatedQuestions);
    if (loadedQuestions === false) {
      setShowQuestions(updatedQuestions.slice(0, 2));
    } else {
      setShowQuestions(updatedQuestions);
    }
  };

  const getQuestions = () => {
    axios.get('/classes/qa/questions', {
      params: {
        product_id: productId,
        page: 1,
        count: 120,
      },
    })
      .then((results) => {
        const answerPromises = results.data.map((question) => axios.get(`/classes/qa/questions/${question.question_id}/answers`, {
          params: {
            page: 1,
            count: 10,
          },
        })
          .then((response) => {
            const updatedQuestion = {
              ...question,
              answersList: response.data,
            };
            return updatedQuestion;
          })
          .catch((error) => console.log(`Error getting answers for question: ${question.question_id}`, error)));
        Promise.all(answerPromises)
          .then((updatedQuestions) => {
            setQuestions(updatedQuestions);
            if (loadedQuestions) {
              setShowQuestions(updatedQuestions);
            } else {
              setShowQuestions(updatedQuestions.slice(0, 2));
            }
          });
      })
      .catch((error) => {
        console.log('Error getting questions from product', error);
      });
  };

  const loadMoreQuestions = () => {
    setLoadedQuestions(true);
    setShowQuestions(questions);
  };

  const searchQuestions = (input) => {
    if (input) {
      setSearching(true);
      const searchResult = questions.filter((question) => question.question_body
        .toLowerCase().includes(input.toLowerCase()));
      setShowQuestions(searchResult);
    }
    if (!input) {
      setSearching(false);
      setShowQuestions(questions.slice(0, 2));
    }
  };

  const collapseQuestionsList = () => {
    setLoadedQuestions(false);
    setShowQuestions(questions.slice(0, 2));
  };

  useEffect(() => {
    getQuestions();
  }, [productId]);

  useEffect(() => {
    if (displayModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [displayModal]);

  return (
    <BodyContainer>
      {displayModal && <QuestionModal getQuestions={getQuestions}
      productId={productId} setDisplayModal={setDisplayModal}/>}
      <SearchTitle>Search</SearchTitle>
      <SearchBar type="text" placeholder="Search for a question" onChange={(e) => searchQuestions(e.target.value)}/>
      <BodyButton onClick={() => setDisplayModal(true)}>Ask a Question</BodyButton>
      {loadedQuestions && (<BodyButton
      onClick={collapseQuestionsList}>Collapse Questions</BodyButton>)}
      <ScrollableList style={{ listStyle: 'none', padding: 0 }}>
        {questions.length ? showQuestions.map((question, i) => (
          <QuestionElement key={i}>
            <Question question={question} getQuestions={getQuestions}
            setHelpfulQuestions={setHelpfulQuestions} helpfulQuestions={helpfulQuestions}
            setReportedQuestion={setReportedQuestion}/>
          </QuestionElement>
        )) : <li>Loading Questions...</li>}
      </ScrollableList>
      {showQuestions.length < questions.length && searching === false && loadedQuestions === false
      && (
      <BodyButton onClick={loadMoreQuestions}>Load More Questions</BodyButton>
      )}
    </BodyContainer>
  );
};

export default QaBody;
