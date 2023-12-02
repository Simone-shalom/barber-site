import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useLoginModal } from '@/hooks/use-login-modal';
import { useRouter } from 'next/navigation';
import ListingSingle from '@/app/(routes)/(listing)/listings/[listingId]/components/ListingSingle';

import { mockCurrentUser } from '../../mocks/currentUser';
import { mockListing } from '../../mocks/listing';
import { mockReservation } from '../../mocks/reservation';
import toast from 'react-hot-toast';

// Mocking external dependencies
jest.mock('axios');
jest.mock('react-hot-toast');

jest.mock('../../hooks/use-login-modal', () => ({
    ...jest.requireActual('../../hooks/use-login-modal'),
    useLoginModal: jest.fn(),
  }));

  const mockLoginModalStore = {
    isOpen: false,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  };

  jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  
  const useRouterMock = useRouter as jest.Mock;
  const pushMock = jest.fn();
  
  useRouterMock.mockReturnValue({
    push: pushMock,
    refresh: jest.fn(), // Add a mock for the refresh function
  });

const useLoginModalMock = useLoginModal as jest.MockedFunction<typeof useLoginModal>;
useLoginModalMock.mockReturnValue(mockLoginModalStore);

//mocking data 
const currentUser = mockCurrentUser
const listing = {...mockListing, user: mockCurrentUser}
const reservations = mockReservation

describe('ListingSingle component', () => {
  // Mocking useRouter behavior
  const mockRouter = { push: jest.fn(), refresh: jest.fn() };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  it('renders ListingSingle correctly', () => {

    render(<ListingSingle currentUser={currentUser} listing={listing} reservations={reservations} />);

    // Ensure that the component renders without errors
    const listingContainer = screen.getByTestId('listing-container');
    expect(listingContainer).toBeInTheDocument();

    // You can add more specific assertions based on your component's structure
  });

  it('creates a reservation when the "Create Reservation" button is clicked', async () => {

    render(<ListingSingle currentUser={currentUser} listing={listing} reservations={reservations} />);

    const date = { justDate: null, dateTime: null }; // Add dateTime property
    const setDate = jest.fn();

    const dateTime =date.dateTime

    const currentDate = new Date();
    const currentDayLabel = `${currentDate.toLocaleString('en-US', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
   fireEvent.click(screen.getByLabelText(currentDayLabel)); // Use getByLabelText for accessibilit

    // Mock the Axios.post function to return a successful response
    (axios.post as jest.Mock).mockResolvedValue({ status: 200 });

    // Simulate clicking the "Create Reservation" button
    fireEvent.click(screen.getByText('Reserve'));

    // Ensure that useLoginModal.onOpen is not called (user is logged in)
   await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Reservation Created Successfully')
    })

    // Ensure that Axios.post is called with the correct parameters
    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith('/api/reservation', {
        dateTime, // adjust this based on your calendar component
        price: listing.price,
        listingId: listing.id,
        });
    });
    
    // Ensure that router.refresh and router.push are called after a successful reservation
    waitFor(() => {
        expect(mockRouter.refresh).toHaveBeenCalled();
        expect(mockRouter.push).toHaveBeenCalledWith('/visits');
    })
    });
})
