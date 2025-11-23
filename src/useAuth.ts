// import { createContext, useContext } from "react";

// type AuthCtx = {
//   loggedIn: boolean;
//   token: string | null;
//   login: (token: string) => void;
//   logout: () => void;
// };

// const Ctx = createContext<AuthCtx | undefined>(undefined);

// export const useAuth = () => {
//   const ctx = useContext(Ctx);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// };
