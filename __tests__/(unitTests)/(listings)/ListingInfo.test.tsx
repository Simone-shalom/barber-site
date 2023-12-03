import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListingInfo from '@/components/listings/ListingInfo';
import { mockAdmin, mockCurrentUser } from '@/mocks/currentUser';
import { mockListing } from '@/mocks/listing';
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
const formatTime = (date:Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}`;
};


describe('ListingInfo component', () => {
  const mockOnSubmit = jest.fn();
  const mockSetDate = jest.fn();

  it('renders ListingDetails and ListingReservation components', () => {
    const mockDates = [new Date(), new Date()] // Mocking array of dates

    render(
      <ListingInfo
        currentUser={mockCurrentUser}
        listing={mockListing}
        user={mockAdmin}
        onSubmit={mockOnSubmit}
        setDate={mockSetDate}
        date={{ justDate: new Date() , dateTime: new Date() }}
        dDates={mockDates}
      />
    );

    // Assert that ListingDetails and ListingReservation components are rendered
    expect(screen.getByText(mockListing.title)).toBeInTheDocument();
    const expectedText = `${mockAdmin.name}`;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    // Add more assertions based on your component's structure
  });

  it('calls onSubmit and setDate when ListingReservation component is submitted',  async() => {
    render(
      <ListingInfo
      currentUser={mockCurrentUser}
      listing={mockListing}
      user={mockCurrentUser}
      onSubmit={mockOnSubmit}
      setDate={mockSetDate}
      date={{ justDate: new Date() , dateTime: new Date() }}
        dDates={[new Date()]}
      />
    );

     // Get the current time and calculate the next full hour time
     const currentTime = new Date();
     const nextHourTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
     nextHourTime.setMinutes(0, 0, 0); // Reset minutes and seconds to get the next full hour
 
     const nextHourTimeString = formatTime(nextHourTime);

 // Simulate choosing a day and hour (adjust this based on your component's implementation)
     fireEvent.click(screen.getByText(nextHourTimeString));

   waitFor(() => {
    const hourButton = screen.getByText('06:00'); // Adjust this based on your component's structure
    fireEvent.click(hourButton);
 
   })

   waitFor(() => {
    // Find and interact with the ListingReservation component
    const reservationButton = screen.getByText('Reserve');
    fireEvent.click(reservationButton);
   })

    // Assert that onSubmit and setDate functions are called
    await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
        expect(mockSetDate).toHaveBeenCalled();
    }) 

    // Add more assertions based on your component's interactions
  });

})
  // Add more test cases or assertions as needed
