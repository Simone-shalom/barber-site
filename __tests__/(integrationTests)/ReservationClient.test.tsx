import ReservationClient from '@/app/(routes)/myreservations/components/ReservationClient';
import { mockCurrentUser } from '@/mocks/currentUser';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { mockReservationsPurchase } from '@/mocks/reservation';

// Mock the axios and toast modules
jest.mock('axios');
jest.mock('react-hot-toast');


jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  
  const useRouterMock = useRouter as jest.Mock;
  const pushMock = jest.fn();
  
  useRouterMock.mockReturnValue({
    push: pushMock,
    refresh: jest.fn(), // Add a mock for the refresh function
  });

describe('ReservationClient component', () => {
  const reservationsMock = mockReservationsPurchase

  const currentUserMock = mockCurrentUser

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('renders ReservationClient correctly', () => {
    render(<ReservationClient reservations={reservationsMock} currentUser={currentUserMock} />);

    // Add assertions based on your component's structure
    expect(screen.getByText('Your Reservations')).toBeInTheDocument();
    // Add more assertions as needed
  });

  it('cancels a reservation successfully', async () => {

    const mockRouter = { push: jest.fn(), refresh: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Mock the Axios.delete function to return a successful response
    // (axios.delete as jest.Mock).mockResolvedValue({ status: 200 });
    (axios.delete as jest.Mock).mockResolvedValueOnce({} as AxiosResponse);

    render(<ReservationClient reservations={reservationsMock} currentUser={currentUserMock} />);

    // Simulate clicking the "Remove reservation" button
    fireEvent.click(screen.getByText('Remove reservation'));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      // Ensure that the toast.success function is called
      expect(toast.success).toHaveBeenCalledWith('Reservation Cancelled');

      // Ensure that the router.refresh function is called
      waitFor(() => {
        expect(mockRouter.refresh).toHaveBeenCalled();
      })
    });

    // Add more assertions as needed
  });

  it('handles errors when cancelling a reservation', async () => {
     // Mock the axios.delete function to return a rejected promise
     (axios.delete as jest.Mock).mockRejectedValueOnce(new Error('Cancellation error'));

    render(<ReservationClient reservations={reservationsMock} currentUser={currentUserMock} />);

    // Simulate clicking the "Remove reservation" button
    fireEvent.click(screen.getByText('Remove reservation'));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      // Ensure that the toast.error function is called
      expect(toast.error).toHaveBeenCalledWith('Error cancelling reservation');
    });

    // Add more assertions as needed
  });
});
