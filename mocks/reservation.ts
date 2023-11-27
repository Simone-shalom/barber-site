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

  export const mockReservationsPurchase = [
    {
      id: 'reservation1',
      createdAt: '2023-11-20T12:00:00Z',
      date: '2023-12-01T01:00:00Z',
      listing: {
        createdAt: '2023-11-15T10:00:00Z',
        id: 'listing1',
        title: 'Mock Listing 1',
        description: 'Mock Description 1',
        imageSrc: '/mock-image.jpg',
        category: 'Mock Category 1',
        price: 50,
        userId: 'user1',
      },
      purchases: [
        // {
        //   id: 'purchase1',
        //   userId: 'user1',
        //   reservationId: 'reservation1',
        //   createdAt: new Date('2023-11-25T08:00:00Z'),
        //   updatedAt: new Date('2023-11-25T08:00:00Z'),
        // },
      ],
    },
    // ... other reservations
  ];