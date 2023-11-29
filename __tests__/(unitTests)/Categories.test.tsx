import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Categories from '@/components/Categories';
import { usePathname, useSearchParams } from 'next/navigation';
import qs from 'query-string';


// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('query-string', () => ({
    stringifyUrl: jest.fn(),
    parse: jest.fn(),
  }));

describe('Categories component', () => {
  it('renders categories correctly', () => {
    // Mock the values returned by usePathname and useSearchParams
    (usePathname as jest.Mock).mockReturnValue('/home');
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn(() => null) });

    render(<Categories />);

    // Verify that the component renders without errors
    const categoriesContainer = screen.getByTestId('categories-container');
    waitFor(() => {
        expect(categoriesContainer).toBeInTheDocument();
    })

    // Verify that each category box is rendered
    const shortHairCategory = screen.getByText('Short Hair');
    waitFor(() => {
        expect(shortHairCategory).toBeInTheDocument();
    })

    const trimmerCutCategory = screen.getByText('Trimmer Cut');
    waitFor(() => {
        expect(trimmerCutCategory).toBeInTheDocument();
    })
    
    const scissorsCutCategory = screen.getByText('Scissors Cut');
    waitFor(() => {
        expect(scissorsCutCategory).toBeInTheDocument();
    })

    const beardCategory = screen.getByText('Beard');
    waitFor(() => {
        expect(beardCategory).toBeInTheDocument();
    })
  });

  it('marks the selected category as active', () => {
    // Mock the values returned by usePathname and useSearchParams
    (usePathname as jest.Mock).mockReturnValue('/home');
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn(() => 'Short Hair') });

    render(<Categories />);

    // Verify that the 'Short Hair' category is marked as selected
    const shortHairCategory = screen.getByText('Short Hair');
    waitFor(() => {
        expect(shortHairCategory).toHaveClass('active');
    })

    // Verify that other categories are not marked as selected
    const trimmerCutCategory = screen.getByText('Trimmer Cut');
    waitFor(() => {
        expect(trimmerCutCategory).not.toHaveClass('active');
    })

    const scissorsCutCategory = screen.getByText('Scissors Cut');
    waitFor(() => {
        expect(scissorsCutCategory).not.toHaveClass('active');
    })

    const beardCategory = screen.getByText('Beard');
    waitFor(() => {
        expect(beardCategory).not.toHaveClass('active');
    })  
  });

//   Add more test cases as needed
});
