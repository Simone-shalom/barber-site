import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListingCard from '@/components/listings/ListingCard';
import { useRouter } from 'next/navigation';
import { mockListing } from '@/mocks/listing';
import { mockCurrentUser } from '@/mocks/currentUser';
import { mockReservation, mockReservationDefined, mockReservationSafe, mockReservationsPurchase,  } from '@/mocks/reservation';
import { mockEmptyPurchase, mockPurchase } from '@/mocks/purchase';

// Mock useRouter


jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  
  const useRouterMock = useRouter as jest.Mock;
  const pushMock = jest.fn();
  
  useRouterMock.mockReturnValue({
    push: pushMock,
    refresh: jest.fn(), // Add a mock for the refresh function
  });


describe('ListingCard component', () => {
 

  it('renders correctly with default props', () => {
    render(<ListingCard data={mockListing} />);

    // Add assertions based on your component's structure
    expect(screen.getByText('Mock Listing')).toBeInTheDocument();
    // Add more assertions based on your component's structure
  });

  it('renders correctly with admin user', () => {
    const mockOnAction = jest.fn();
    render(
      <ListingCard
      actionLabel='Cancel'
        onAction={mockOnAction}
        data={mockListing}
        currentUser={mockCurrentUser}
        reservation={mockReservationSafe}
        admin
      />
    );

    // Add assertions for admin-specific content
    expect(screen.getByText('ClientName')).toBeInTheDocument();
    // Add more assertions based on your component's structure
  });

  it('renders correctly with purchased item', () => {
    const mockOnAction = jest.fn();
    render(
      <ListingCard
        actionLabel='Cancel'
        onAction={mockOnAction}
        data={mockListing}
        currentUser={mockCurrentUser}
        reservation={mockReservationSafe}
        purchase={mockPurchase}
      />
    );

    // Add assertions for purchased item-specific content
    expect(screen.getByText('Already Paid')).toBeInTheDocument();
    // Add more assertions based on your component's structure
  });

  // it('handles cancel button click', () => {
  //   const mockOnAction = jest.fn();
  //   render(
  //     <ListingCard
  //       data={mockListing}
  //       currentUser={mockCurrentUser}
  //       reservation={mockReservationSafe}
  //       onAction={mockOnAction}
  //       actionLabel='Cancel'
  //     />
  //   );

  //   fireEvent.click(screen.getByText('Cancel')); // Adjust based on your actual button text

  //   waitFor(() => {
  //       expect(mockOnAction).toHaveBeenCalledWith(''); // Adjust based on your expected action id
  //   })
  // });

  // Add more test cases for other interactions, edge cases, etc.
});
