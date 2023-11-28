import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListingDetails from '@/components/listings/ListingDetails';
import { mockListing } from '@/mocks/listing';
import { mockAdmin, mockCurrentUser } from '@/mocks/currentUser';

describe('ListingDetails component', () => {
  it('renders correctly with default props', () => {
    render(<ListingDetails listing={mockListing} user={mockCurrentUser} />);

    expect(screen.getByText('Mock Listing')).toBeInTheDocument();
    expect(screen.getByText('50 $')).toBeInTheDocument();
    // Add more assertions based on your component's structure
  });

  it('renders the correct category', () => {
    render(<ListingDetails listing={mockListing} user={mockCurrentUser} />);

    expect(screen.getByText('Mock Category')).toBeInTheDocument();
    // Add more assertions based on your component's structure
  });

  it('renders the correct description', () => {
    render(<ListingDetails listing={mockListing} user={mockCurrentUser} />);

    expect(screen.getByText('Description of the mock listing')).toBeInTheDocument();
    // Add more assertions based on your component's structure
  });

  it('renders the correct barber information', () => {
    render(<ListingDetails listing={mockListing} user={mockAdmin} />);

    const expectedText = `${mockAdmin.name}`;

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    // Add more assertions based on your component's structure
  });

});
