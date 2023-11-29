
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { mockCurrentUser } from '@/mocks/currentUser';
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


  const reservationsMock = mockReservationsPurchase;
  const currentUserMock = mockCurrentUser;
describe('VisitClient component', () => {

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


  it('handles payment when "Pay now" button is clicked', async () => {
    render(<VisitClient reservations={reservationsMock} currentUser={currentUserMock} />);
    const payNowButtons = screen.getAllByTestId('pay-now');

    // Assuming there's at least one reservation
    const reservationId = reservationsMock[0].id;

    fireEvent.click(payNowButtons[0]);

    // Wait for the asynchronous operations to complete (e.g., axios request)
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`/api/checkout/${reservationId}`);
    });

    // You might want to check if the UI is updated accordingly after payment
  });

  it('handles payment failure when "Pay now" button is clicked', async () => {
    render(<VisitClient reservations={reservationsMock} currentUser={currentUserMock} />);
    const payNowButtons = screen.getAllByTestId('pay-now');
  
    // Assuming there's at least one reservation
    const reservationId = reservationsMock[0].id;
  
    // Mock the axios.post function to simulate a failure response
    jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Mocked error'));
  
    fireEvent.click(payNowButtons[0]);
  
    // Wait for the asynchronous operations to complete (e.g., axios request)
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`/api/checkout/${reservationId}`);
    });
  
    // Check if an error toast is displayed (assuming you show an error toast for payment failure)
    waitFor(() => {
      expect(screen.getByText('Checkout unavailable')).toBeInTheDocument();
    })
  });

})


// describe('VisitClient onPay functionality',() => {
//   // it('calls onPay when "Pay Now" button is clicked', async () => {
//   //   const mockOnPay = jest.fn();

//   //   render(<VisitClient reservations={reservationsMock} currentUser={currentUserMock} />);

//   //   // Find and interact with the "Pay Now" button
//   //   const payNowButton = screen.getByTestId('pay-now');
//   //   fireEvent.click(payNowButton);
//   //   console.log(screen.debug());

//   //   // Wait for the asynchronous operations to complete
//   //    await waitFor(() => {
//   //     // Ensure that onPay function is called
//   //     expect(mockOnPay).toHaveBeenCalledWith('reservation1'); // Adjust based on your expected action id
//   //   });
//   // });

//   // it('handles successful payment', async() => {
//   //   (axios.post as jest.Mock).mockResolvedValueOnce({ data: { url: 'mock-payment-url' } });

//   //   render(<VisitClient reservations={reservationsMock} currentUser={currentUserMock} />);
//   //   const payNowButton = screen.getByTestId('pay-now');
//   //   fireEvent.click(payNowButton);

//   //  await waitFor(() => {
//   //     expect(window.location.assign).toHaveBeenCalledWith('mock-payment-url');
//   //   });
//   // });
  

//   // it('handles payment failure', async() => {
//   //   (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Payment error'));

//   //   render(<VisitClient reservations={reservationsMock} currentUser={currentUserMock} />);

//   //   const payNowButton = screen.getByTestId('pay-now');
//   //   fireEvent.click(payNowButton);

//   //  await waitFor(() => {
//   //     // Check if the appropriate error message is displayed
//   //     expect(toast.error).toHaveBeenCalledWith('Checkout unavailable');
//   //   });
//   // });


//   // Add more test cases for other interactions, edge cases, etc.
// });