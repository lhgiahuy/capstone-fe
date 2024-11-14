export interface User {
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
}

export interface LoginResponse {
  token: string | null;
  error: string | null;
}
