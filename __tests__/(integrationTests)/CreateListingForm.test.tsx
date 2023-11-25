import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CreateListingForm from '@/app/(routes)/(listing)/create/components/CreateListingForm';
import qs from 'query-string';

// Mocking external dependencies
jest.mock('axios');


jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  
  const useRouterMock = useRouter as jest.Mock;
  const pushMock = jest.fn();
  
  useRouterMock.mockReturnValue({
    push: pushMock,
    refresh: jest.fn(), // Add a mock for the refresh function
  });


// Mock the query-string module
jest.mock('query-string', () => ({
    stringifyUrl: jest.fn(),
    parse: jest.fn(),
  }));


describe('CreateListingForm component', () => {
  it('renders CreateListingForm correctly', () => {
    render(<CreateListingForm />);

    // Ensure that the component renders without errors
    const createListingForm = screen.getByTestId('create-listing-form');
    expect(createListingForm).toBeInTheDocument();

    // You can add more specific assertions based on your component's structure
  });

  it('submits the form successfully', async () => {
    // Mock the Axios.post function to return a successful response
    (axios.post as jest.Mock).mockResolvedValue({ status: 200 });
  
    render(<CreateListingForm />);
  
    // Simulate filling out the form
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText('Price $'), { target: { value: '100' } });


    // Simulate clicking the "Create" button
    fireEvent.click(screen.getByText('Create'));
  
    // Ensure that Axios.post is called with the correct parameters
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/create', {
        category: '',
        imageSrc:'',
        price: '100',
        title: 'Test Title',
        desc: 'Test Description',
        // Add other fields
      });
    });
  
  await waitFor(() => {
    expect(screen.getByText('Create')).toBeEnabled();
  });
    // Add more assertions based on your expected outcomes
  });
});
