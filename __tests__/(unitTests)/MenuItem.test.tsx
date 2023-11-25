import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MenuItem from '@/components/MenuItem';

describe('MenuItem component', () => {
  it('renders without alert', () => {
    const onClickMock = jest.fn();
    const { getByText, queryByTestId } = render(
      <MenuItem onClick={onClickMock} label="Test Item" />
    );

    // Assert that the component renders without alert
    expect(getByText('Test Item')).toBeInTheDocument();
    expect(queryByTestId('alert-icon')).toBeNull();
  });

  it('renders with alert', () => {
    const onClickMock = jest.fn();
    const { getByText, getByTestId } = render(
      <MenuItem onClick={onClickMock} label="Test Item" alert />
    );
  
    // Assert that the component renders with alert
    expect(getByText('Test Item')).toBeInTheDocument();
    expect(getByTestId('alert-icon')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <MenuItem onClick={onClickMock} label="Test Item" />
    );

    // Simulate a click on the menu item
    fireEvent.click(getByText('Test Item'));

    // Assert that the onClick handler was called
    expect(onClickMock).toHaveBeenCalled();
  });
});
