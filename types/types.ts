import { Listing, User, Reservation, Notification, Payment } from "@prisma/client";

export type safeUser = Omit<
User, 
'createdAt' | 'updatedAt' | "emailVerified"> & {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
}

export type safeListing = Omit<
Listing, 'createdAt'> & {
    createdAt: string
}

export type safeReservation = Omit<
Reservation, 
'createdAt' | 'date'| 'listing'> & {
    createdAt: string
    date: string
    listing: safeListing
}


export type safeNotification = Omit<
Notification, 'createdAt'> & {
    createdAt: string
}


export type safePastReservation = Omit<
Reservation, 
'createdAt' | 'date'> & {
    createdAt: string
    date: string
}

 export type PurchasedItem = {
    createdAt: string;
    updatedAt: string;
    reservation: {
      createdAt: string;
      date: string;
      id: string;
      price: number;
      userName: string | null;
      userId: string;
      listingId: string;
    };
    id: string;
    userId: string;
    reservationId: string;
  };