import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for custom jest matchers
import userEvent from '@testing-library/user-event'; // if you need to simulate user events
import Empty from '@/components/Empty';

describe('Empty component', () => {
  it('renders correctly with home button', () => {
    render(<Empty title="Test Title" desc="Test Description" home={true} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();

    // You might want to add more assertions depending on your needs
  });

  it('renders correctly with login button', () => {
    render(<Empty title="Test Title" desc="Test Description" login={true} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders correctly with create button', () => {
    render(<Empty title="Test Title" desc="Test Description" create={true} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('handles login button click', () => {
    const { getByText } = render(<Empty title="Test Title" desc="Test Description" login={true} />);
    
    const loginButton = getByText('Login');
    fireEvent.click(loginButton);
  });

  // Add more test cases as needed
});
