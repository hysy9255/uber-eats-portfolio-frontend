import type { UserRole } from "../constants/UserRoleEnum";

export type LoginResponseDTO = {
  token: string;
  role: UserRole;
};
