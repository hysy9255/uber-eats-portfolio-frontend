import type { UserRole } from "../constants/UserRoleEnum";

export type CreateUserDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImgUrl?: string;
  role: UserRole;
};
