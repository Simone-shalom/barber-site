import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers
import NotificationInfo from '@/components/NotificationInfo';
import { safeNotification } from '@/types/types';


jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));


describe('NotificationInfo component', () => {
  const notifications:safeNotification[] = [
    {
        id: '1',
        body: 'Notification 1 body',
        userId: 'testUserId1',
        userName: 'Test User 1',
        createdAt: new Date('2023-11-23T12:34:56Z').toISOString(),
      },
      {
        id: '2',
        body: 'Notification 2 body',
        userId: 'testUserId2',
        userName: 'Test User 2',
        createdAt: new Date('2023-11-24T10:00:00Z').toISOString(),
      },
  ];

  it('renders correctly when notifications are open', () => {
    render(<NotificationInfo notifications={notifications} />);

    // Assert that the component renders the notification content
    expect(screen.getByText(/Notifications/)).toBeInTheDocument();
    expect(screen.getByText(/You got a new notification/)).toBeInTheDocument();
    expect(screen.getByText(/Check notifications/)).toBeInTheDocument();
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });

  it('does not render when notifications are closed', () => {
    render(<NotificationInfo notifications={[]} />);

    // Assert that the component does not render when notifications are closed
    expect(screen.queryByText(/Notifications/)).toBeNull();
    expect(screen.queryByText(/You got a new notification/)).toBeNull();
    expect(screen.queryByText(/Check notifications/)).toBeNull();
    expect(screen.queryByTestId('close-button')).toBeNull();
  });

  it('triggers "Check notifications" button click', () => {
    const useRouterMock = jest.requireMock('next/navigation').useRouter;
            const pushMock = jest.fn();
            useRouterMock.mockReturnValue({
              push: pushMock,
            });

    render(<NotificationInfo notifications={notifications} />);

    // Click the "Check notifications" button
    fireEvent.click(screen.getByText(/Check notifications/));

    // Assert that the router was called with the correct path
    expect(pushMock).toHaveBeenCalledWith('notifications');
  });

  it('triggers close button click', () => {
    const useRouterMock = jest.requireMock('next/navigation').useRouter;
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({
      push: pushMock,
    });
    render(<NotificationInfo notifications={notifications} />);

    // Click the close button
    fireEvent.click(screen.getByTestId('close-button'));

    // Assert that the component is closed
    expect(screen.queryByText(/Notifications/)).toBeNull();
  });
});
