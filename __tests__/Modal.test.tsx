
import Modal from '@/components/Modal';
import { render, screen } from '@testing-library/react';

describe('Modal', () => {
  it('renders with the provided props', () => {
    const mockTitle = 'Test Modal Title';
    const mockBody = <div data-testid="mock-body">Test Modal Body</div>;
    const mockFooter = <div data-testid="mock-footer">Test Modal Footer</div>;

    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title={mockTitle}
        body={mockBody}
        footer={mockFooter}
      />
    );

    const titleElement = screen.getByText(mockTitle);
    const bodyElement = screen.getByTestId('mock-body');
    const footerElement = screen.getByTestId('mock-footer');

    expect(titleElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });
});