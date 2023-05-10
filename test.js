import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import OverallStarRating from './client/src/components/Ratings-Reviews/AddreviewModal/OverallStarRating.jsx';
import Compare from './client/src/components/RelatedItems/Compare.jsx';
import QaSection from './client/src/components/q-a/QaSection.jsx';

describe('Related Products Component', () => {
  test('renders a table', () => {
    const features1 = [{ feature: 'wolf', value: 'silver' }, { feature: 'apple', value: 'red' }, { feature: 'car', value: 'tesla' }];
    const features2 = [{ feature: 'wolf', value: 'silver' }, { feature: 'apple', value: 'yellow' }, { feature: 'car', value: 'tesla' }];

    const { getByTestId } = render(<Compare features1={features1} features2={features2} item1='item1' item2='item2' />);
    const table = getByTestId('comparison-table');

    expect(table).toHaveProperty('tagName', 'TABLE');
  });

  test('table includes the correct booleans', () => {
    const features1 = [{ feature: 'wolf', value: 'silver' }, { feature: 'apple', value: 'red' }, { feature: 'car', value: 'tesla' }];
    const features2 = [{ feature: 'wolf', value: 'silver' }, { feature: 'apple', value: 'yellow' }, { feature: 'car', value: 'tesla' }];

    const { getByTestId } = render(<Compare features1={features1} features2={features2} item1='item1' item2='item2' />);
    const table = getByTestId('comparison-table');
    const cells = table.querySelectorAll('td');

    expect(table).toHaveProperty('tagName', 'TABLE');

    expect(cells[0]).toHaveTextContent('true');
    expect(cells[1]).toHaveTextContent('silver wolf');
    expect(cells[2]).toHaveTextContent('true');
  });
});

describe('Q and A component', () => {
  test('Renders QA Header', () => {
    render(<QaSection />);
    const qaHeader = screen.getByText(/Questions and Answers/i);

    expect(qaHeader).toBeInTheDocument();
  });
});

describe('OverallStarRating', () => {
  it('should render 5 star icons', () => {
    const { getAllByTestId } = render(<OverallStarRating />);
    const stars = getAllByTestId('star-icon');
    expect(stars.length).toBe(5);
  });
});
