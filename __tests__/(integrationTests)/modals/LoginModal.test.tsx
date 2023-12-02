import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signIn,useSession } from 'next-auth/react';
import LoginModal from '@/components/modals/LoginModal';
import { useRouter } from 'next/navigation';
import { useLoginModal } from '@/hooks/use-login-modal';
import toast from 'react-hot-toast';

// Mock next/router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hot-toast');

const useRouterMock = useRouter as jest.Mock;
const pushMock = jest.fn();

useRouterMock.mockReturnValue({
  push: pushMock,
  refresh: jest.fn(), // Add a mock for the refresh function
});

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  useSession: jest.fn(),
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

  const mockRouter = { push: jest.fn(), refresh: jest.fn() };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  it('renders correctly and submits form', async () => {
    // Mocking that the user is not authenticated
    (useRouterMock as jest.Mock).mockReturnValue({});
    // (signIn as jest.Mock).mockReturnValueOnce({});
    (signIn as jest.Mock).mockImplementationOnce(async () => ({ ok: true }));
    (useSession as jest.Mock).mockReturnValueOnce([null, false, undefined]);
  
    render(<LoginModal />);

    // Check if the component renders
    expect(screen.getByTestId('login-form')).toBeInTheDocument();

    // Mock user entering email and password
    await userEvent.type(screen.getByTestId('email-field'), 'simon@gmail.com');
    await userEvent.type(screen.getByTestId('password-field'), 'simon1234');
    
    // Mock form submission
    fireEvent.click(screen.getByTestId('login-btn'));

    // Wait for asynchronous operations to complete
    await waitFor(() => {
      // Assert that signIn function is called
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'simon@gmail.com',
        password: 'simon1234',
        callbackUrl: '/',
        redirect: false,
      })
       // Assert that the success message is displayed
    })
    waitFor(() => {
      expect(screen.getByText(/Logged in successfully/i)).toBeInTheDocument();
    }) 
  });

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

  it('renders correctly and shows error on form submission without password', async () => {
    // Mocking that the user is not authenticated
    (useRouterMock as jest.Mock).mockReturnValue({});
    (signIn as jest.Mock).mockReturnValueOnce({});
    (useSession as jest.Mock).mockReturnValueOnce([null, false, undefined]);
  
    render(<LoginModal />);
  
    // Check if the component renders
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  
    // Mock form submission without entering password
    await userEvent.type(screen.getByTestId('email-field'), 'simon@gmail.com');
    
    //Click login button
    fireEvent.click(screen.getByTestId('login-btn'));
  
    // Wait for asynchronous operations to complete
    await waitFor(() => {
      // Assert that an error message is displayed
      expect(screen.getByText('password must be at least 2 characters.')).toBeInTheDocument();
    });
  });
  
  it('handles error response during form submission', async () => {
    // Mocking that the user is not authenticated
    (useRouterMock as jest.Mock).mockReturnValue({});
    
    // Mock signIn to return an error response
    (signIn as jest.Mock).mockImplementationOnce(async () => ({ ok:false, error:'Unathorized' }));
    
    (useSession as jest.Mock).mockReturnValueOnce([null, false, undefined]);
  
    render(<LoginModal />);
  
    // Check if the component renders
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  
    // Mock user entering email and password
    await userEvent.type(screen.getByTestId('email-field'), 'simon@gmail.com');
    await userEvent.type(screen.getByTestId('password-field'), 'simon1234');
  
    // Mock form submission
    fireEvent.click(screen.getByTestId('login-btn'));
  
    // Wait for asynchronous operations to complete
    await waitFor(() => {
      // Assert that signIn function is called
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'simon@gmail.com',
        password: 'simon1234',
        callbackUrl: '/',
        redirect: false,
      });
    });
    waitFor(() => {
      expect(screen.getByText(/Unauthorized/i)).toBeInTheDocument();
    }) 
  });
  
  

});
