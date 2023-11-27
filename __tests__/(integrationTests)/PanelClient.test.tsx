import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import PanelClient from '@/app/(routes)/panel/components/PanelClient';
import { mockAdmin, mockCurrentUser } from '@/mocks/currentUser';
import { mockNewestReservation, mockReservation, mockReservationDefined, mockReservationsPurchase } from '@/mocks/reservation';
import { mockListing } from '@/mocks/listing';

// Mocking external dependencies
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


describe('PanelClient component', () => {
  it('renders PanelClient correctly', () => {

    render(<PanelClient newestReservation={mockNewestReservation } currentUser={mockCurrentUser} reservationsCount={2}
         pastReservations={[]} allUsers={10} reservations={mockReservationDefined} purchased={[]}  />);

    // Ensure that the component renders without errors
    const panelClient = screen.getByTestId('panel-client'); // Add the appropriate test ID
    expect(panelClient).toBeInTheDocument();

    // You can add more specific assertions based on your component's structure
  });

  it('handles reservation cancellation', async () => {
    // Mock the Axios.delete function to return a successful response
    (axios.delete as jest.Mock).mockResolvedValue({ status: 200 });

    render(<PanelClient newestReservation={ mockNewestReservation } currentUser={mockAdmin} reservationsCount={2}
        pastReservations={[]} allUsers={10} reservations={mockReservationDefined} purchased={[]}  />);

    // Simulate clicking the "Cancel Reservation" button
    fireEvent.click(screen.getByText('Cancel Reservation'));

    // Ensure that Axios.delete is called with the correct parameters
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('/api/reservation/reservation1');
    });

    // Add more assertions based on your expected outcomes
  });

  // Add more test cases as needed
});
