import { Listing, Reservation, User } from "@prisma/client";

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
'createdAt' | 'startDate' | 'date'| 'listing'> & {
    createdAt: string
    startDate: string
    date: string 
    listing: safeListing
}