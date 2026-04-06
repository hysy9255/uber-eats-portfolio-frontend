import type { UserRole } from "../constants/UserRoleEnum";

export type UserDTO = {
  userId: string;
  role: UserRole;
  email: string;
  name: string;
  phoneNumber: string;
  profileImgUrl?: string;
};
