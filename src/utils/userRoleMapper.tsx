import { UserRole } from "../constants/UserRoleEnum";

export const userRoleMap: Record<string, UserRole> = {
  owner: UserRole.Owner,
  client: UserRole.Client,
  driver: UserRole.Driver,
};
