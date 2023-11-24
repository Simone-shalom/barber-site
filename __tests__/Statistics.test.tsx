import Statistics from '@/components/Statistics';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  
const mockStatisticsProps = {
    totalIncome: 1000,
    allUsers: 50,
    reservationsCount: 20,
    takenTimes: ['10:00 AM', '2:00 PM'],
    currentDayName: 'Monday',
    currentUser: {
      id: '1',
      name: 'John Doe',
      email: null,
      emailVerified: null,
      image: null,
      hashedPassword: null,
      createdAt: new Date().toISOString(), // Format Date to ISO string
      updatedAt: new Date().toISOString(), // Format Date to ISO string
      hasNotification: false,
      favouriteIds: [],
    },
  };
describe('Statistics component', () => {
        it('renders display correctly with provided props', () => {
          render(<Statistics {...mockStatisticsProps} />);
      
          // Add assertions for the rendered content
          expect(screen.getByText('Reservations Count')).toBeInTheDocument();
          expect(screen.getByText('Users Count')).toBeInTheDocument();
          expect(screen.getByText('Monday')).toBeInTheDocument();
          expect(screen.getByText('Reservation times today:')).toBeInTheDocument();
          expect(screen.getByText('10:00 AM')).toBeInTheDocument();
          expect(screen.getByText('2:00 PM')).toBeInTheDocument();
          expect(screen.getByText('@ John Doe')).toBeInTheDocument();
          expect(screen.getByText('Total Income')).toBeInTheDocument();
          // Add more assertions for other displayed elements
        });
      
        it('handles button click and navigates to myreservations', () => {

            const useRouterMock = jest.requireMock('next/navigation').useRouter;
            const pushMock = jest.fn();
            useRouterMock.mockReturnValue({
              push: pushMock,
            });

          render(<Statistics {...mockStatisticsProps} />);
      
          // Find the button and simulate a click event
          const checkReservationsButton = screen.getByText('Check reservations');
          fireEvent.click(checkReservationsButton);
      
          // Expect that the useRouter.push function has been called with the correct argument
          expect(useRouterMock).toHaveBeenCalled();
          expect(pushMock).toHaveBeenCalledWith('/myreservations');
        });
      
        // Add more tests for other functionality if needed
      })
