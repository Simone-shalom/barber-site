import { safeReservation } from "@/types/types";
import { mockListing } from "./listing";

// Mock data for safeReservation
export const mockReservation: safeReservation[] | undefined = [
    {
      id: '1',
      date: '2023-12-01',
      price: 50,
      userName: 'sample_user_1',
      createdAt: '2023-11-25T08:30:00Z',
      userId: 'user123',
      listingId: 'listing123',
      listing: mockListing,
    },
    {
      id: '2',
      date: '2023-12-05',
      price: 60,
      userName: 'sample_user_2',
      createdAt: '2023-11-26T09:45:00Z',
      userId: 'user456',
      listingId: 'listing123',
      listing: mockListing,
    },
    // Add more mock reservations as needed
  ];