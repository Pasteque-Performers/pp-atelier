import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import RatingSummary from './client/src/components/Ratings-Reviews/ReviewBreakdown/RatingSummary.jsx';
import ProductBreakdown from './client/src/components/Ratings-Reviews/ReviewBreakdown/ProductBreakdown.jsx';
import Compare from './client/src/components/RelatedItems/Compare.jsx';
import ProductList from './client/src/components/RelatedItems/ProductList.jsx';
// import QaSection from './client/src/components/q-a/QaSection.jsx';
import OverallStarRating from './client/src/components/Ratings-Reviews/AddreviewModal/OverallStarRating.jsx';
import DisplayName from './client/src/components/Ratings-Reviews/AddreviewModal/DisplayName.jsx';
import DoYouRecommend from './client/src/components/Ratings-Reviews/AddreviewModal/DoYouRecommend.jsx';
import ReviewBody from './client/src/components/Ratings-Reviews/AddreviewModal/ReviewBody.jsx';
import ReviewSummary from './client/src/components/Ratings-Reviews/AddreviewModal/ReviewSummary.jsx';
import ReviewEmail from './client/src/components/Ratings-Reviews/AddreviewModal/ReviewEmail.jsx';
import AddReviewModalMain from './client/src/components/Ratings-Reviews/AddreviewModal/AddReviewModalMain.jsx';
import ProductCharacteristics from './client/src/components/Ratings-Reviews/AddreviewModal/ProductCharacteristics.jsx';
import AddToCart from './client/src/components/overview/AddToCart.jsx';
import ImageGallery from './client/src/components/overview/ImageGallery.jsx';
import Information from './client/src/components/overview/Information.jsx';
import Overview from './client/src/components/overview/Overview.jsx';
import StaticStarRating from './client/src/components/overview/StaticStarRating.jsx';
import StyleSelector from './client/src/components/overview/StyleSelector.jsx';

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

  test('CreateImage renders an image', () => {
    const exampleUrl = 'https://images.unsplash.com/photo-1477420143023-6a0e0b04b69a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80';
    const { getByRole } = render(<CreateImage image={exampleUrl}/>);

    const getImage = getByRole('img');
    expect(getImage).toBeInTheDocument();
    expect(getImage).toHaveAttribute('src', exampleUrl);
  });
});

// describe('Q and A component', () => {
//   test('Renders QA Header', () => {
//     render(<QaSection />);
//     const qaHeader = screen.getByText(/Questions and Answers/i);

//     expect(qaHeader).toBeInTheDocument();
//   });
// });

describe('OverallStarRating', () => {
  it('should render 5 star icons', () => {
    const { getAllByTestId } = render(<OverallStarRating
      formData={{ rating: 0 }} handleChange={() => {}} />);
    const stars = getAllByTestId('star-icon');
    expect(stars.length).toBe(5);
  });
});

describe('DisplayName', () => {
  it('should render an input feild', () => {
    render(<DisplayName formData={{ name: '' }} handleChange={() => {}}/>);
    const input = screen.getByPlaceholderText('Example: jackson11');
    expect(input).toBeInTheDocument();
  });
});

describe('DoYouRecommend', () => {
  let handleChange;

  beforeEach(() => {
    handleChange = jest.fn();

    render(
      <DoYouRecommend
        formData={{ recommend: false }}
        handleChange={handleChange}
      />,
    );
  });

  it('should render two radio options', () => {
    const radioOptions = screen.getAllByRole('radio');
    expect(radioOptions.length).toBe(2);
  });

  it('should call the handleChange function when an option is selected', () => {
    const yesOption = screen.getByLabelText('Yes');
    fireEvent.click(yesOption);
    expect(handleChange).toHaveBeenCalled();
  });

  it('should correctly reflect the initial recommend value', () => {
    const noOption = screen.getByLabelText('No');
    expect(noOption.checked).toBe(true);
  });
});

describe('ReviewBody', () => {
  let handleChange;

  beforeEach(() => {
    handleChange = jest.fn();
  });

  it('should display initial character count', () => {
    render(<ReviewBody formData={{ body: '' }} handleChange={handleChange} />);
    expect(screen.getByText('Minimum required characters left: 50')).toBeInTheDocument();
  });

  it('should display "Minimum reached" when character count is less than 0', () => {
    render(<ReviewBody formData={{ body: 'A'.repeat(51) }} handleChange={handleChange} />);
    expect(screen.getByText('Minimum reached')).toBeInTheDocument();
  });
});

describe('ReviewSummary', () => {
  it('should render an input feild', () => {
    render(<ReviewSummary formData={{ name: '' }} handleChange={() => {}}/>);
    const input = screen.getByPlaceholderText('Example: Best purchase ever!');
    expect(input).toBeInTheDocument();
  });
});

describe('ReviewEmail', () => {
  it('should render an input feild', () => {
    render(<ReviewEmail formData={{ name: '' }} handleChange={() => {}}/>);
    const input = screen.getByPlaceholderText('Example: jackson11@gmail.com');
    expect(input).toBeInTheDocument();
  });
});

jest.mock('axios');

const metaData = {
  characteristics: {
    Size: { id: 1 },
    Width: { id: 2 },
    Comfort: { id: 3 },
    Quality: { id: 4 },
    Length: { id: 5 },
    Fit: { id: 6 },
  },
};

describe('AddReviewModalMain', () => {
  it('should render mandatory components', () => {
    const { getByText } = render(<AddReviewModalMain metaData={metaData}/>);
    const components = ['Overall rating (mandatory)', 'Do you recommend this product? (mandatory)',
      'Review body (mandatory)', 'What is your nickname (mandatory)', 'Your email (mandatory)'];
    components.forEach((component) => {
      expect(getByText(component)).toBeInTheDocument();
    });
  });
  it('should call axios post when submit button is clicked', () => {
    const { getByText } = render(<AddReviewModalMain metaData={metaData} />);
    const button = getByText(/Submit review/i);
    axios.post.mockResolvedValue({ data: {} });
    fireEvent.click(button);
    expect(axios.post).toHaveBeenCalled();
  });
});

describe('RatingSummary component', () => {
  beforeEach(() => {
    render(<RatingSummary />);
  });

  it('displays the correct rating', () => {
    const ratingElement = screen.getByText(/Average Rating:/i);
    expect(ratingElement).toHaveTextContent('Average Rating: 3.7');
  });

  it('displays the correct recommendation percentage', () => {
    const recommendationElement = screen.getByText(/% of reviewers recommend this product./i);
    expect(recommendationElement).toHaveTextContent('74% of reviewers recommend this product.');
  });
});

describe('ProductBreakdown component', () => {
  it('renders correctly', () => {
    render(<ProductBreakdown />);
    expect(screen.getByText('Fit')).toBeInTheDocument();
    expect(screen.getByText('Length')).toBeInTheDocument();
    expect(screen.getByText('Comfort')).toBeInTheDocument();
    expect(screen.getByText('Quality')).toBeInTheDocument();
  });
});

describe('ProductCharacteristics', () => {
  let setCharacteristics;

  beforeEach(() => {
    setCharacteristics = jest.fn();
  });

  it('should render all characteristics', () => {
    const { getByText } = render(
      <ProductCharacteristics
        characteristics={ {} }
        setCharacteristics={setCharacteristics}
        characteristicsData={metaData.characteristics}
      />,
    );
    Object.keys(metaData.characteristics).forEach((characteristic) => {
      expect(getByText(characteristic)).toBeInTheDocument();
    });
  });

  it('should call setCharacteristics when a radio button is clicked', () => {
    const { getAllByRole } = render(
      <ProductCharacteristics
        characteristics={{}}
        setCharacteristics={setCharacteristics}
        characteristicsData={metaData.characteristics}
      />,
    );
    const radioButtons = getAllByRole('radio');
    fireEvent.click(radioButtons[0]);
    expect(setCharacteristics).toHaveBeenCalled();
  });
});

jest.mock('axios');

const mockData = {
  data: {
    id: 1,
    name: 'Mock Product',
    styles: [
      {
        id: 1,
        name: 'Mock Style',
        price: '100',
      },
      {
        id: 2,
        name: 'Mock Style 2',
        price: '200',
      },
    ],
  },
};

describe('Overview Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue(mockData);
  });

  it('renders without crashing', async () => {
    render(<Overview productId={1} />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const title = screen.getByText('Watermelon Wear');
    expect(title).toBeInTheDocument();

    const productName = screen.getByText('Mock Product');
    expect(productName).toBeInTheDocument();

    const styles = screen.getAllByRole('button');
    expect(styles).toHaveLength(2);
  });

  it('changes selected style when clicked', async () => {
    render(<Overview productId={1} />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const style1 = screen.getByText('Mock Style');
    const style2 = screen.getByText('Mock Style 2');

    fireEvent.click(style2);
    expect(style2.className).toContain('selected');
    expect(style1.className).not.toContain('selected');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
