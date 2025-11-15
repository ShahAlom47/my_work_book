export interface User {
  email: string;
  name: string;
  password: string;
  role?: string;
  image?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}