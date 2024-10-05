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
  createdAt: Date;
  updatedAt: Date | null;
  isDeleted: boolean;
  deletedAt: Date | null;
}
