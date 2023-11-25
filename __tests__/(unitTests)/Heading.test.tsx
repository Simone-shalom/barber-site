
import { Heading } from '@/components/Heading';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe("Heading", () => {
        // Renders the component with title and description
        it('should render the component with title and description', () => {
            render(<Heading title="Test Title" desc="Test Description" />);
            const titleElement = screen.getByText(/Test Title/i);
            const descElement = screen.getByText(/Test Description/i);
            expect(titleElement).toBeInTheDocument();
            expect(descElement).toBeInTheDocument();
          });

              // Renders the component with only title
    it('should render the component with only title', () => {
        render(<Heading title="Test Title" />);
        const titleElement = screen.getByText(/Test Title/i);
        expect(titleElement).toBeInTheDocument();
        const descElement = screen.queryByText(/Test Description/i);
        expect(descElement).not.toBeInTheDocument();
      });

          // Renders the component with only description
    it('should render the component with only description', () => {
        render(<Heading desc="Test Description" />);
        const descElement = screen.getByText(/Test Description/i);
        expect(descElement).toBeInTheDocument();
        const titleElement = screen.queryByText(/Test Title/i);
        expect(titleElement).not.toBeInTheDocument();
      });
})