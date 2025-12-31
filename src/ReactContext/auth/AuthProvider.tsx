import React, { useEffect, useMemo, useState } from "react";
import { getToken } from "../../auth";
import { getMyProfile } from "../../api/userApi";
import { Ctx } from "./AuthContext";

export type Role = "owner" | "client" | "driver";
export type User = {
  userId: string;
  email: string;
  name: string;
  role: Role;
  profileImgUrl: string | null;
};

export const TOKEN_KEY = "jwt-token";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // initialize from localStorage once
  const [token, setToken] = useState<string | null>(() => getToken());
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const profile = await getMyProfile(token);

        setUser({
          userId: profile.userId,
          email: profile.email,
          name: profile.name,
          role: profile.role,
          profileImgUrl: profile.profileImgUrl,
        });
      } catch {
        console.log("error");
      }
    };

    load();
  }, [token]);

  // keep in sync (same tab via custom 'auth' event, other tabs via 'storage')
  useEffect(() => {
    const sync = () => setToken(getToken());
    window.addEventListener("storage", sync);
    // window.addEventListener("auth", sync);
    return () => {
      window.removeEventListener("storage", sync);
      //   window.removeEventListener("auth", sync);
    };
  }, []);

  const login = (t: string) => {
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
    // window.dispatchEvent(new Event("auth"));
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    // window.dispatchEvent(new Event("auth"));
  };

  const value = useMemo(
    () => ({ loggedIn: !!token, token, user, login, logout }),
    [token, user]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
