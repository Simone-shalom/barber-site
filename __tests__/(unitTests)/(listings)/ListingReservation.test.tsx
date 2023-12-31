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

//Formting time 
// const formatTime = (date:Date) => {
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
//   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
//   return `${formattedHours}:${formattedMinutes}`;
// };

describe('ListingReservation component', () => {
  const mockOnSubmit = jest.fn();
  const mockSetDate = jest.fn();

  it('renders correctly and calls onSubmit on button click', async () => {
   
      // Set the time to 0:00
const morningTime = new Date();
morningTime.setHours(0, 0, 0, 0);
    render(
      <ListingReservation
        onSubmit={mockOnSubmit}
        setDate={mockSetDate}
        date={{ justDate: morningTime , dateTime: morningTime }}
        dDates={[new Date()]}
      />
    );

    // Assert that the component renders
    expect(screen.getByText('Choose day and hour')).toBeInTheDocument();
    // Get the current time and calculate the next full hour time
    // const currentTime = new Date();
    // const nextHourTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
    // nextHourTime.setMinutes(0, 0, 0); // Reset minutes and seconds to get the next full hour

    // const nextHourTimeString = formatTime(nextHourTime);

    // fireEvent.click(screen.getByText(nextHourTimeString));

    fireEvent.click(screen.getByText('18:00')); 

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
