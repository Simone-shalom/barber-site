import CategoryBox from '@/components/CategoryBox';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ScissorsLineDashed} from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

// Mock the query-string module
jest.mock('query-string', () => ({
    stringifyUrl: jest.fn(),
    parse: jest.fn(),
  }));

  // Mock the push method
  const useRouterMock = useRouter as jest.Mock;
  const pushMock = jest.fn();
  
  useRouterMock.mockReturnValue({
    push: pushMock,
    refresh: jest.fn(), // Add a mock for the refresh function
  });

  jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn(() => ({ get: jest.fn(), set: jest.fn() })),
  }));
  

describe('CategoryBox component', () => {
  it('renders correctly with label and icon', () => {
    render(<CategoryBox label="Test" icon={ ScissorsLineDashed}/>);
    
    const labelElement = screen.getByText('Test');
    const iconElement = screen.getByTestId('test-icon');

    expect(labelElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });
 
});

describe('CategoryBox Functionality',() => {
    it('handles click event correctly when selected is false', () => {
        const mockRouter = { push: jest.fn() };
    
        render(<CategoryBox label="Test" icon={ ScissorsLineDashed} selected={false} />);
        
        const categoryBox = screen.getByText('Test');
        fireEvent.click(categoryBox);
    
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    
        waitFor(() => {
            expect(mockRouter.push).toHaveBeenCalledWith('/home?category=Test');
        })
      });
    
      it('handles click event correctly when selected is true', () => {
        const mockRouter = { push: jest.fn() };
    
        render(<CategoryBox label="Test" icon={ ScissorsLineDashed} selected />);
        
        const categoryBox = screen.getByText('Test');
        fireEvent.click(categoryBox);
    
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    
        waitFor(() => {
            expect(mockRouter.push).toHaveBeenCalledWith('/home');
        })
      });
  })

// Clean up the module mock after the tests
afterAll(() => {
    jest.unmock('query-string');
  });