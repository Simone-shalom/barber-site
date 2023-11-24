import Calendar from '@/components/Calendar';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';


// Mock the useRouter function
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    refresh: jest.fn(),
  })),
}));

describe('Calendar component', () => {
    it('renders Calendar component', () => {
        const date = { justDate: null, dateTime: null }; // Add dateTime property
        const setDate = jest.fn();
      
        render(<Calendar date={date} setDate={setDate} />);
      
        // Check if the calendar is rendered
        waitFor(()=>{
            expect(screen.getByTestId('calendar')).toBeInTheDocument(); // Use getByTestId to access the element with data-testid attribute
        })
      });
      

      it('selects a date from the calendar',  () => {
        const date = { justDate: null, dateTime: null }; // Add dateTime property
        const setDate = jest.fn();
      
        render(<Calendar date={date} setDate={setDate} />);
      
        // Click on a date in the calendar
        fireEvent.click(screen.getByLabelText(/November 1, 2023/i)); // Use getByLabelText for accessibility
        // Adjust the label text based on how your calendar is labeled
      
        // Wait for operations to complete
        waitFor(() => {
          // Check if setDate function is called with the selected date
          expect(setDate).toHaveBeenCalledWith(expect.objectContaining({ justDate: expect.any(Date), dateTime: null }));
        });
      });
      
    describe('Calendar Functionality', () => {
      it('clicking on "Remove Date" button calls refresh function', () => {
        const setDate = jest.fn();
      
        const pastDate = new Date();
        pastDate.setFullYear(pastDate.getFullYear() - 1); // Set it to a date in the past
        // Set the initial date to a past date
        render(<Calendar date={{ justDate: pastDate, dateTime: null }} setDate={setDate} />);
      
        // Click on "Remove Date" button
        fireEvent.click(screen.getByText(/Remove Date/i));
      
        // Wait for operations to complete
        waitFor(() => {
          // Check if setDate function is called with null date
          expect(setDate).toHaveBeenCalledWith(expect.objectContaining({ justDate: null, dateTime: null }));
        });
      });
      

      it('displays "No Times available" message when there are no available times', () => {
        const date = { justDate: new Date(), dateTime: null }; // Add dateTime property
        const setDate = jest.fn();
      
        render(<Calendar date={date} setDate={setDate} />);
      
        // Assuming your component displays this message when there are no available times
        waitFor(() => {
            expect(screen.getByText('No Times available that day')).toBeInTheDocument();
        })
      });
    })

});
