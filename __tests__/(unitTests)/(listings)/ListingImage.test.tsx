import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListingImage from '@/components/listings/ListingImage';
import { mockListing } from '@/mocks/listing';

describe('ListingImage component', () => {
  it('renders the image with correct alt text', () => {
    render(<ListingImage listing={mockListing} />);

    // Assert that the Image component is rendered
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();

    // Assert that the alt text is correct
    expect(imageElement).toHaveAttribute('alt', '');
  });

  // Add more test cases or assertions as needed
});
