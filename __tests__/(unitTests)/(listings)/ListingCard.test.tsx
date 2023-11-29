import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListingCard from '@/components/listings/ListingCard';
import { useRouter } from 'next/navigation';
import { mockListing } from '@/mocks/listing';
import { mockAdmin, mockCurrentUser } from '@/mocks/currentUser';
import { mockReservationSafe } from '@/mocks/reservation';
import { mockPurchase } from '@/mocks/purchase';

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
        currentUser={mockAdmin}
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
        currentUser={mockAdmin}
        reservation={mockReservationSafe}
        purchase={mockPurchase}
      />
    );

    // Add assertions for purchased item-specific content
    expect(screen.getByText('Already Paid by')).toBeInTheDocument();
    // Add more assertions based on your component's structure
  });

  it('handles cancel button click', () => {
    const mockOnAction = jest.fn();
    render(
      <ListingCard
        data={mockListing}
        currentUser={mockCurrentUser}
        reservation={mockReservationSafe}
        purchase={[]}
        onAction={mockOnAction}
        actionLabel='Cancel'
      />
    );

    fireEvent.click(screen.getByText('Cancel')); // Adjust based on your actual button text

    waitFor(() => {
        expect(mockOnAction).toHaveBeenCalledWith(''); // Adjust based on your expected action id
    })
  });

  // Add more test cases for other interactions, edge cases, etc.
});



describe('ListingCard OnPay functionality', () => {
  it('calls onPay when "Pay Now" button is clicked', async () => {
    const mockOnPay = jest.fn();
    const mockOnCancel = jest.fn();


    render(
      <ListingCard
        data={mockListing}
        currentUser={mockCurrentUser}
        reservation={mockReservationSafe}
        purchase={[]}
        onAction={mockOnCancel}
        onPay={mockOnPay}
        actionLabel='Cancel'
      />
    );

    // Find and interact with the "Pay Now" button
    const payNowButton = screen.getByTestId('pay-now');
    fireEvent.click(payNowButton);

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      // Ensure that onPay function is called
      expect(mockOnPay).toHaveBeenCalledWith(''); // Adjust based on your expected action id
    });
  });

  // Add more test cases for other interactions, edge cases, etc.
});