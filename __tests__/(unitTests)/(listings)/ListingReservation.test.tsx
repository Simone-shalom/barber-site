import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListingReservation from '@/components/listings/ListingReservation';
import { useRouter } from 'next/navigation';



jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const useRouterMock = useRouter as jest.Mock;
const pushMock = jest.fn();

useRouterMock.mockReturnValue({
  push: pushMock,
  refresh: jest.fn(), // Add a mock for the refresh function
});


describe('ListingReservation component', () => {
  const mockOnSubmit = jest.fn();
  const mockSetDate = jest.fn();

  it('renders correctly and calls onSubmit on button click', async () => {
    render(
      <ListingReservation
        onSubmit={mockOnSubmit}
        setDate={mockSetDate}
        date={{ justDate: new Date() , dateTime: new Date() }}
        dDates={[new Date()]}
      />
    );

    // Assert that the component renders
    expect(screen.getByText('Choose day and hour')).toBeInTheDocument();

    // Mock user selecting a date (you may need to adjust this based on your Calendar implementation)
    fireEvent.click(screen.getByText('06:00')); 

    // Find and interact with the "Reserve" button
    const reserveButton = screen.getByTestId('time-button-0');
    fireEvent.click(reserveButton);

    // Use waitFor to wait for the conditions to be met
    await waitFor(() => {
      // Assert that onSubmit and setDate functions are called
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(mockSetDate).toHaveBeenCalled();
      // Add more assertions based on your component's interactions
    });
  });
});
