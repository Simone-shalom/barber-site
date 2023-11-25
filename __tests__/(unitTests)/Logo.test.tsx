import Logo from '@/components/Logo';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useRouter } from 'next/navigation';

// Mock the useRouter function
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Logo Component', () => {
  it('navigates to "/home" when clicked',async () => {
    // Mock the useRouter push function
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<Logo />);

    // Find the logo element
    const logoElement = screen.getByAltText('Logo');

    // Trigger a click on the logo
    userEvent.click(logoElement);

    waitFor(() => {
        expect(pushMock).toHaveBeenCalledWith('/home');
    })
    // Expect the useRouter.push function to have been called with the correct argument
  });
});
