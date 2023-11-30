import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { signIn,useSession } from 'next-auth/react';
import LoginModal from '@/components/modals/LoginModal';
import { useRouter } from 'next/navigation';
import { useLoginModal } from '@/hooks/use-login-modal';

// Mock next/router

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const useRouterMock = useRouter as jest.Mock;
const pushMock = jest.fn();

useRouterMock.mockReturnValue({
  push: pushMock,
  refresh: jest.fn(), // Add a mock for the refresh function
});

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  useSession: jest.fn(), // Add this line to mock useSession
}));

jest.mock('../../../hooks/use-login-modal', () => ({
  ...jest.requireActual('../../../hooks/use-login-modal'),
  useLoginModal: jest.fn(),
}));

const mockLoginModalStore = {
isOpen: true,
onOpen: jest.fn(),
onClose: jest.fn(),
};

const useLoginModalMock = useLoginModal as jest.MockedFunction<typeof useLoginModal>;
useLoginModalMock.mockReturnValue(mockLoginModalStore);

describe('LoginModal component', () => {
  // it('renders correctly and submits form', async () => {
  //   // Mocking that the user is not authenticated
  //   (useRouterMock as jest.Mock).mockReturnValue({});
  //   (signIn as jest.Mock).mockReturnValueOnce({});
  //   (useSession as jest.Mock).mockReturnValueOnce([null, false, undefined]);
  
  //   render(<LoginModal />);

  //   // Check if the component renders
  //   expect(screen.getByText('Login')).toBeInTheDocument();

  //   // Mock user entering email and password
  //   userEvent.type(screen.getByLabelText('Email'), 'user-simon@gmail.com');
  //   userEvent.type(screen.getByLabelText('Password'), 'simon1234');

  //   // Mock form submission
  //   fireEvent.click(screen.getByText('Login'));

  //   // Wait for asynchronous operations to complete
  //   await waitFor(() => {
  //     // Assert that signIn function is called
  //     expect(signIn).toHaveBeenCalledWith('credentials', {
  //       email: 'user-simon@gmail.com',
  //       password: 'simon1234',
  //       redirect: false,
  //       callbackUrl: '/',
  //     });
  //   });
  // });

  it('handles Google login click', async () => {
    // Mocking that the user is not authenticated
    (useRouterMock as jest.Mock).mockReturnValue({});
    (signIn as jest.Mock).mockReturnValueOnce({});
    (useSession as jest.Mock).mockReturnValueOnce([null, false, undefined]);

    render(<LoginModal />);

    // Mock user clicking Google login button
    fireEvent.click(screen.getByText('Login with Google'));

    // Wait for asynchronous operations to complete
    await waitFor(() => {
      // Assert that signIn function is called for Google login
      expect(signIn).toHaveBeenCalledWith('google');
    });
  });
});
