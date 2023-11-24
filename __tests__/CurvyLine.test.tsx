import { CurvyLine } from '@/components/CurvyLine';
import { render } from '@testing-library/react';

describe('CurvyLine Component', () => {
  it('renders without errors', () => {
    render(<CurvyLine />);
    
    // No need to add assertions for this simple component
    // If it renders without errors, the test will pass
  });
});
