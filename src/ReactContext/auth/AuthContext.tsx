import { createContext } from "react";
import type { UserDTO } from "../../dto/User.dto";

type AuthContextValue = {
  loggedIn: boolean;
  token: string | null;
  user: UserDTO;
  setUser: React.Dispatch<React.SetStateAction<UserDTO>>;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
