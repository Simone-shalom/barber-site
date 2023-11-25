import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomeAdvert } from '@/components/HomeAdvert';


describe('HomeAdvert component', () => {
  it('renders correctly when admin is true', () => {
    render(<HomeAdvert admin={true} />);
    expect(screen.getByText('Manage Your reservations')).toBeInTheDocument();
  });

  it('renders correctly when admin is false', () => {
    render(<HomeAdvert admin={false} />);
    expect(screen.getByText('Create Your first reservation')).toBeInTheDocument();
  });

});
