import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import NotificationsClient from '@/app/(routes)/notifications/components/NotificationsClient';
import { mockCurrentUser } from '@/mocks/currentUser';
import { mockNotifications } from '@/mocks/notifications';

// Mocking external dependencies
jest.mock('axios');

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  
  const useRouterMock = useRouter as jest.Mock;
  const pushMock = jest.fn();
  
  useRouterMock.mockReturnValue({
    push: pushMock,
    refresh: jest.fn(), // Add a mock for the refresh function
  });

// Mocking data
const currentUser = mockCurrentUser;
const notifications = mockNotifications

describe('NotificationsClient component', () => {

    const mockRouter = { push: jest.fn(), refresh: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  
  it('renders NotificationsClient correctly', () => {
    render(<NotificationsClient currentUser={currentUser} notifications={notifications} />);

    // Ensure that the component renders without errors
    const notificationsContainer = screen.getByText('Check your recent notifications');
    expect(notificationsContainer).toBeInTheDocument();

    // Add more specific assertions based on your component's structure
  });

  it('deletes notifications when the "Clear all" button is clicked', async () => {
    // Mock the Axios.delete function to return a successful response
    (axios.delete as jest.Mock).mockResolvedValue({ status: 200 });

    render(<NotificationsClient currentUser={currentUser} notifications={notifications} />);

    // Simulate clicking the "Clear all" button
    fireEvent.click(screen.getByText('Clear all'));

    // Ensure that Axios.delete is called with the correct parameters
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(`/api/notifications/${currentUser.id}`);
    });

    // Ensure that router.refresh is called after successfully deleting notifications
    waitFor(() => {
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  it('navigates to "/myreservations" when the "Check reservations" button is clicked', () => {
    render(<NotificationsClient currentUser={currentUser} notifications={notifications} />);

    // Simulate clicking the "Check reservations" button
    fireEvent.click(screen.getByText('Check reservations'));

    // Ensure that router.push is called with the correct path
    waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/myreservations');
    })
  });
});
