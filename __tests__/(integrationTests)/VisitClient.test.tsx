
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { mockAdmin, mockCurrentUser } from '@/mocks/currentUser';
import { mockReservationsPurchase } from '@/mocks/reservation';
import VisitClient from '@/app/(routes)/visits/components/VisitClient';
import { useRouter } from 'next/navigation';

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

describe('VisitClient component', () => {
  const reservationsMock = mockReservationsPurchase;
  const currentUserMock = mockCurrentUser;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('renders VisitClient correctly', () => {
    render(<VisitClient reservations={reservationsMock} currentUser={currentUserMock} />);
    expect(screen.getByText('Your Visits')).toBeInTheDocument();
    // Add more assertions as needed
  });

  it('cancels a reservation successfully', async () => {

    const mockRouter = { push: jest.fn(), refresh: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (axios.delete as jest.Mock).mockResolvedValueOnce({} as AxiosResponse);

    render(<VisitClient reservations={reservationsMock} currentUser={currentUserMock} />);
    fireEvent.click(screen.getByText('Cancel Reservation'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Reservation Cancelled');
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  it('handles errors when cancelling a reservation', async () => {
    (axios.delete as jest.Mock).mockRejectedValueOnce(new Error('Cancellation error'));

    render(<VisitClient reservations={reservationsMock} currentUser={currentUserMock} />);
    fireEvent.click(screen.getByText('Cancel Reservation'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error cancelling reservation');
    });
  });

})