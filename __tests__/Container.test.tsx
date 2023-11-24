import Container from '@/components/Container';
import { render } from '@testing-library/react';

describe('Container Component', () => {
  it('renders children without errors', () => {
    const mockChild = <div data-testid="mock-child">Mock Child</div>;

    const { getByTestId } = render(<Container>{mockChild}</Container>);
    
    // Assert that the child element is present in the rendered container
    expect(getByTestId('mock-child')).toBeInTheDocument();
  });
});
