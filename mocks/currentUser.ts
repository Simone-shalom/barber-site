import { safeUser } from "@/types/types";

export const mockCurrentUser: safeUser  = {
    id: '123',
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