import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRegisterModal } from '@/hooks/use-register-modal';
import { useLoginModal } from '@/hooks/use-login-modal';
import RegisterModal from '@/components/modals/RegisterModal';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios'

// Mock next/router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));

jest.mock('react-hot-toast');
jest.mock('axios');
  
const useRouterMock = useRouter as jest.Mock;
const pushMock = jest.fn();

useRouterMock.mockReturnValue({
  push: pushMock,
  refresh: jest.fn(), // Add a mock for the refresh function
});

const mockLoginModalStore = {
    isOpen: true,
    onOpen: jest.fn(),
    onClose: jest.fn(),
    };

const mockRegisterModalStore = {
    isOpen: true,
    onOpen: jest.fn(),
    onClose: jest.fn(),
    };
      

jest.mock('../../../hooks/use-register-modal', () => ({
    ...jest.requireActual('../../../hooks/use-register-modal'),
    useRegisterModal: jest.fn(),
  }));
jest.mock('../../../hooks/use-login-modal', () => ({
    ...jest.requireActual('../../../hooks/use-login-modal'),
    useLoginModal: jest.fn(),
  }));
  

  const useLoginModalMock = useLoginModal as jest.MockedFunction<typeof useLoginModal>;
  useLoginModalMock.mockReturnValue(mockLoginModalStore);
  
const useRegisterModalMock = useRegisterModal as jest.MockedFunction<typeof useRegisterModal>;
useRegisterModalMock.mockReturnValue(mockRegisterModalStore);

  // Mock next-auth/react
jest.mock('next-auth/react', () => ({
    signIn: jest.fn(),
    useSession: jest.fn(),
  }));

describe('RegisterModal component', () => {
  it('renders correctly and submits form', async () => {
    // Mocking that the user is not authenticated
    (useRouterMock as jest.Mock).mockReturnValue({});
    (useSession as jest.Mock).mockReturnValueOnce([null, false, undefined]);

    // Mock a successful registration
    (axios.post as jest.Mock).mockResolvedValueOnce({});

    render(<RegisterModal />);

    // Check if the component renders
    expect(screen.getByTestId('register-form')).toBeInTheDocument();

    // Mock user entering name, email, and password
    await userEvent.type(screen.getByTestId('name-field'), 'Sime');
    await userEvent.type(screen.getByTestId('email-field'), 'sime@gmail.com');
    await userEvent.type(screen.getByTestId('password-field'), 'sime1234');

    // Mock form submission
    fireEvent.click(screen.getByTestId('register-btn'));

    // Wait for asynchronous operations to complete
    await waitFor(() => {
      // Assert that axios.post function is called
      expect(axios.post).toHaveBeenCalledWith(`/api/register`, {
        name: 'Sime',
        email: 'sime@gmail.com',
        password: 'sime1234',
      });

      // You can add more assertions here based on the behavior of your component
      expect(useRegisterModalMock().onClose).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Registered successfully');
    });
  });

  it('handles Google registration click', async () => {

    (useRouterMock as jest.Mock).mockReturnValue({});
    (signIn as jest.Mock).mockReturnValueOnce({});
    (useSession as jest.Mock).mockReturnValueOnce([null, false, undefined]);

    render(<RegisterModal />);

    // Mock user clicking Google registration button
    fireEvent.click(screen.getByText('Register with Google'));

    // Wait for asynchronous operations to complete
    await waitFor(() => {
      // You can add assertions here based on the behavior of your component
      // For example, check if the signIn function is called with 'google'
      expect(signIn).toHaveBeenCalledWith('google');
    });
  });

  it('handles error response during form submission', async () => {
    // Mocking that the user is not authenticated
    (useRouterMock as jest.Mock).mockReturnValue({});
    (useSession as jest.Mock).mockReturnValueOnce([null, false, undefined]);

    // Mock a failed registration
    (axios.post as jest.Mock).mockRejectedValueOnce({});

    render(<RegisterModal />);

    // Check if the component renders
    expect(screen.getByTestId('register-form')).toBeInTheDocument();

    // Mock user entering email and password
    await userEvent.type(screen.getByTestId('name-field'), 'Sime');
    await userEvent.type(screen.getByTestId('email-field'), 'simon@gmail.com');
    await userEvent.type(screen.getByTestId('password-field'), 'simon1234');

    // Mock form submission
    fireEvent.click(screen.getByTestId('register-btn'));

    // Wait for asynchronous operations to complete
    await waitFor(() => {
      // Assert that axios.post function is called
      expect(axios.post).toHaveBeenCalledWith(`/api/register`, {
        email: 'simon@gmail.com',
        password: 'simon1234',
        name: 'Sime'
      });
    });

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Something went wrong');
    });
  });
});
