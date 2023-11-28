import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  it('calls onSubmit and setDate when ListingReservation component is submitted', () => {
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

    // Find and interact with the ListingReservation component
    const reservationButton = screen.getByText('Reserve');
    fireEvent.click(reservationButton);

    // Assert that onSubmit and setDate functions are called
    waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
        expect(mockSetDate).toHaveBeenCalled();
    }) 

    // Add more assertions based on your component's interactions
  });

  // Add more test cases or assertions as needed
});
