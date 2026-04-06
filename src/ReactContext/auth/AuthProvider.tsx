import React, { useEffect, useState } from "react";
import { getToken } from "../../auth";
import { getMe } from "../../api/userApi";
import { AuthContext } from "./AuthContext";
import { userRoleMap } from "../../utils/userRoleMapper";
import type { UserDTO } from "../../dto/User.dto";

export const TOKEN_KEY = "jwt-token";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() => getToken());
  const [user, setUser] = useState<UserDTO>();

  useEffect(() => {
    const load = async () => {
      if (!token) {
        return;
      }

      try {
        const me = await getMe(token);
        setUser({
          ...me,
          role: userRoleMap[me.role],
        });
      } catch {
        console.log("error");
      }
    };

    load();
  }, [token]);

  useEffect(() => {
    const sync = () => setToken(getToken());
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("storage", sync);
    };
  }, []);

  const login = (t: string) => {
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn: !!token,
        token,
        user: user!,
        setUser: setUser as React.Dispatch<React.SetStateAction<UserDTO>>,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
