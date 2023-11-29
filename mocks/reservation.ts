import { safeReservation, safeReservation2 } from "@/types/types";
import { mockListing } from "./listing";
import { mockPurchase } from "./purchase";

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

  export const mockReservationSafe: safeReservation2 = 
    {
      id: '1',
      date: '2023-12-01',
      price: 50,
      userName: 'sample_user_1',
      createdAt: '2023-11-25T08:30:00Z',
      userId: 'user123',
      listingId: 'listing123',
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
      purchases: []
    }
    // Add more mock reservations as needed
  

  export const mockReservationsPurchase = [
    {
      id: 'reservation1',
      createdAt: '2023-11-20T12:00:00Z',
      date: '2023-12-01',
      listingId: 'reservation1',
      userId: 'user123',
      userName: "user1",
      price: 50,
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
      purchases: [],
    },
    // ... other reservations
  ];

  export const mockReservationDefined: any[] = [
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

  export const mockNewestReservation: any | null = 
  {
      id: 'reservation1',
      createdAt: '2023-11-20T12:00:00Z',
      date: '2023-12-01',
      listingId: 'reservation1',
      userId: 'user123',
      userName: "user1",
      price: 50,
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
      purchases: [],
    }
   

