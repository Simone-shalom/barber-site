import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useLoginModal } from '@/hooks/use-login-modal';
import UserMenu from '@/components/UserMenu';
import { safeNotification, safeUser } from '@/types/types';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  
  const useRouterMock = useRouter as jest.Mock;
  const pushMock = jest.fn();
  
  useRouterMock.mockReturnValue({
    push: pushMock,
    refresh: jest.fn(), // Add a mock for the refresh function
  });

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

jest.mock('../hooks/use-login-modal', () => ({
    ...jest.requireActual('../hooks/use-login-modal'),
    useLoginModal: jest.fn(),
  }));

const mockLoginModalStore = {
  isOpen: false,
  onOpen: jest.fn(),
  onClose: jest.fn(),
};

const useLoginModalMock = useLoginModal as jest.MockedFunction<typeof useLoginModal>;
useLoginModalMock.mockReturnValue(mockLoginModalStore);

const currentUser: safeUser = {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    emailVerified: new Date().toISOString(),
    image: 'profile.jpg',
    hashedPassword: 'hashedPassword123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hasNotification: true,
    favouriteIds: ['fav1', 'fav2'],
  };

  const notifications = [
    { id: '1', body: 'Notification 1', userId: '123', userName: 'Alice', createdAt: '2023-11-25T12:00:00Z' },
    // Add more mock notifications as needed
  ] as safeNotification[];

describe('UserMenu Component', () => {
  it('renders correctly when user is logged in', () => {

    render(<UserMenu currentUser={currentUser} notifications={notifications} />);

    // Your assertions here
  });

  it('handles button click and logs out when user is logged in', async() => {

    render(<UserMenu currentUser={currentUser} notifications={notifications} />);

    // Your test logic here

    // Example: Mocking useRouter to test navigation
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    // Trigger the button click
    userEvent.click(screen.getByLabelText('button'));

    // Your expectations here
    waitFor(() => {
        expect(pushMock).toHaveBeenCalledWith('/myreservations');
        expect(signOut).toHaveBeenCalled();
    }) 
  });

  // Add more tests as needed
});
