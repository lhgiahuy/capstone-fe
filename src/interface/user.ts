export interface User {
  userId: string;
  username: string;
  avatarUrl: string;
  email: string;
  phoneNumber: string;
  cardUrl: string;
  verifyStatus: string;
  processNote: string;
  roleName: string;
  createdAt: string;
  updatedAt: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  verified: string;
  isCheckin: string;
}

export interface LoginResponse {
  token: string | null;
  error: string | null;
}
