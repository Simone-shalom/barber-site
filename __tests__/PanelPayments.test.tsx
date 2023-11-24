import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers
import { PanelPayments } from '@/components/PanelPayments';
import { PurchasedItem } from '@/types/types';

describe('PanelPayments component', () => {
    const purchasedItems: PurchasedItem[] = [
        {
          createdAt: '2023-11-23T12:34:56Z',
          updatedAt: '2023-11-23T12:34:56Z',
          reservation: {
            createdAt: '2023-11-23T12:34:56Z',
            date: '2023-11-25',
            id: 'reservationId1',
            price: 50,
            userName: 'Test User 1',
            userId: 'testUserId1',
            listingId: 'listingId1',
          },
          id: '1',
          userId: 'testUserId1',
          reservationId: 'reservationId1',
        },
        {
          createdAt: '2023-11-24T10:00:00Z',
          updatedAt: '2023-11-24T10:00:00Z',
          reservation: {
            createdAt: '2023-11-24T10:00:00Z',
            date: '2023-11-26',
            id: 'reservationId2',
            price: 75,
            userName: 'Test User 2',
            userId: 'testUserId2',
            listingId: 'listingId2',
          },
          id: '2',
          userId: 'testUserId2',
          reservationId: 'reservationId2',
        },
        // Add more test data as needed
      ];
      it('renders correctly with purchased items', () => {
        render(<PanelPayments purchased={purchasedItems} />);
      
        expect(screen.getByText(/Payments/)).toBeInTheDocument();
        expect(screen.getByText(/Link to Stripe account in production/)).toBeInTheDocument();
      
        // Use getByTestId for the link
        const stripeLink = screen.getByTestId('stripe-link');
        expect(stripeLink).toHaveAttribute('href', 'https://stripe.com/en-pl');
      
        expect(screen.getByText(/All paid visits with stripe/)).toBeInTheDocument();
        expect(screen.getByText(/125/)).toBeInTheDocument(); // Adjust based on your totalPaid calculation
      });
      
      it('renders correctly with no purchased items', () => {
        render(<PanelPayments purchased={[]} />);
      
        expect(screen.getByText(/Payments/)).toBeInTheDocument();
        expect(screen.getByText(/Link to Stripe account in production/)).toBeInTheDocument();
      
        // Use getByTestId for the link
        const stripeLink = screen.getByTestId('stripe-link');
        expect(stripeLink).toHaveAttribute('href', 'https://stripe.com/en-pl');
      
        expect(screen.getByText(/All paid visits with stripe/)).toBeInTheDocument();
        expect(screen.getByText(/0/)).toBeInTheDocument(); // Assuming totalPaid is 0 when no items are purchased
      });
      
});
