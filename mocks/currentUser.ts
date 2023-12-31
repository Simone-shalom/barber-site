import { ADMIN_ID } from "@/permissions";
import { safeUser } from "@/types/types";

export const mockCurrentUser: safeUser  = {
    id: '123',
    name: 'johhnyy',
    email: 'john@example.com',
    emailVerified: new Date().toISOString(),
    image: 'profile.jpg',
    hashedPassword: 'hashedPassword123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hasNotification: true,
    favouriteIds: ['fav1', 'fav2'],
  };

  export const mockAdmin: safeUser  = {
    id: ADMIN_ID!,
    name: 'John Doe',
    email: 'john@example.com',
    emailVerified: new Date().toISOString(),
    image: 'profile.jpg',
    hashedPassword: 'hashedPassword123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hasNotification: true,
    favouriteIds: ['fav1', 'fav2'],
  };