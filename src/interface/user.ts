export interface User {
  username: string;
  avatarUrl: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cardUrl: string;
  verified: boolean;
  roleName: string;
  createdAt: string;
  updatedAt: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
}

export interface LoginResponse {
  token: string | null;
  error: string | null;
}
