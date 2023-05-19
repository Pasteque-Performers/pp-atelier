import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import styled, { ThemeProvider } from 'styled-components';
import QaSection from './QaSection.jsx';
import QaBody from './QaBody.jsx';

const MockScrollableList = styled.ul`
  list-style: none;
  padding: 0;
  overflow-y: auto;
  max-height: 300px;

  /* Scrollbar Styles */
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const theme = {
  fontFamily: "'Manrope', serif",
  fontWeight: {
    light: 200,
    regular: 300,
    bold: 700,
    extraBold: 800,
  },
};

describe('Q and A component', () => {
  test('Renders QaSection', () => {
    render(<QaSection />);
    const qaHeader = screen.getByText(/Questions and Answers/i);

    expect(qaHeader).toBeInTheDocument();
  });

  test('Renders QaBody component', () => {
    render(<QaSection />);
    const qaBody = screen.getByText(/Search/);

    waitFor(() => {
      console.log('this is qabody', qaBody);
      expect(qaBody).toBeInTheDocument();
    });
  });

  test('Renders Question Component', () => {
    render(<ThemeProvider theme={theme}>
             <QaBody productId={40347} ScrollableList={MockScrollableList}/>
           </ThemeProvider >);
    waitFor(() => {
      const question = screen.getByText('Q:');
      expect(question).toBeInTheDocument();
    });
  });

  test('Renders Answer Component', () => {
    render(<QaSection />);
    waitFor(() => {
      const answer = screen.getByText('A:');
      expect(answer).toBeInTheDocument();
    });
  });

  test('Renders "Yes" button for answers', () => {
    render(<QaSection />);
    waitFor(() => {
      const helpfulButton = screen.getByText('Yes');
      expect(helpfulButton).toBeInTheDocument();
    });
  });

  test('Clicking "Ask a Question" button opens the question modal', () => {
    render(<QaSection />);
    const questionButton = screen.getByText('Ask a Question');
    fireEvent.click(questionButton);
    waitFor(() => {
      const questionModal = screen.getByText('Ask your question about the product');
      expect(questionModal).toBeInTheDocument();
    });
  });

  test('Clicking "Add an Answer" button opens the new answer modal', () => {
    render(<QaSection />);
    waitFor(() => {
      const answerButton = screen.getByText('Add an Answer');
      fireEvent.click(answerButton);
      const answerModal = screen.getByText('Add an answer for:');
      expect(answerModal).toBeInTheDocument();
    });
  });

  test('Typing in search bar filters questions', () => {
    render(<QaSection />);

    waitFor(() => {
      const searchBar = screen.getByPlaceholderText('Search for a question');
      fireEvent.change(searchBar, { target: { value: 'test' } });
      const filteredQuestions = screen.queryAllByText(/test/i);
      expect(filteredQuestions.length).toBeGreaterThan(0);
    });
  });

  test('Clicking "Load more questions" reveals all questions', () => {
    render(<QaSection />);
    waitFor(() => {
      const loadButton = screen.getByText('Load More Questions');
      fireEvent.click(loadButton);
      const revealedQuestions = screen.queryAllByText('Q:');
      expect(revealedQuestions.length).toBeGreaterThan(2);
    });
  });

  test('Only show loading text when no questions render', () => {
    render(<QaSection />, { initialState: { productId: 0 } });
    waitFor(() => {
      const loadingQuestions = screen.getByText('Loading Questions...');
      expect(loadingQuestions).toBeInTheDocument();
    });
  });

  test('Ensure collapse button renders', () => {
    render(<ThemeProvider theme={theme}> <QaBody productId={40344}
      ScrollableList={MockScrollableList}/>
      </ThemeProvider>, { initialState: { loadedQuestions: true } });
    waitFor(() => {
      const collapseButton = screen.getByText('Collapse Questions');
      expect(collapseButton).toBeInTheDocument();
    });
  });

  test('Collapse questions list when Collapse button is clicked', () => {
    render(<ThemeProvider theme={theme}><QaBody productId={40344}
      ScrollableList={MockScrollableList}/>
      </ThemeProvider>, { initialState: { loadedQuestions: true } });

    waitFor(() => {
      const collapseButton = screen.getByText('Collapse Questions');
      fireEvent.click(collapseButton);
      const collapsedQuestions = screen.queryAllByText('Q:');
      expect(collapsedQuestions.length).toBe(2);
    });
  });
});
