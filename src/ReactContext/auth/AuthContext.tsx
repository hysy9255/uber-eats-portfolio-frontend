import { createContext } from "react";
import type { User } from "./AuthProvider";

type AuthCtx = {
  loggedIn: boolean;
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

export const Ctx = createContext<AuthCtx | undefined>(undefined);
