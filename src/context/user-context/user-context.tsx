import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import authServices from "@/service/auth-services";
import {
  hasLoggedInCookie,
  markLoggedIn,
  clearAuthSession,
  setUnauthorizedHandler,
} from "@/utils/auth-session";

interface Role {
  id: number;
  name: string;
  active: boolean;
  deleted: boolean;
}

export interface User {
  id?: number;
  username?: string;
  email?: string;
  mobileNumber?: string | null;
  role?: Role;
  permissions?: Record<string, boolean>;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthChecking: boolean;
  isAuthenticated: boolean;
  clearUser: () => void;
  refreshUser: () => Promise<User | null>;
  restoreSession: () => Promise<User | null>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const pickUser = (res: any): User | null => {
  if (!res) return null;
  if (res.data && typeof res.data === "object") return res.data as User;
  if (res.id || res.email || res.username) return res as User;
  return null;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const clearUser = useCallback(() => {
    clearAuthSession();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const res = await authServices.getMe();
    const next = pickUser(res);
    if (next) markLoggedIn();
    setUser(next);
    return next;
  }, []);

  const restoreSession = useCallback(async () => {
    if (!hasLoggedInCookie()) {
      setUser(null);
      return null;
    }
    try {
      const next = pickUser(await authServices.getMe({ silent: true }));
      setUser(next);
      return next;
    } catch {
      // Keep isLoggedIn cookie (bank-automation). Route guard uses the cookie, not this call.
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(clearUser);

    const init = async () => {
      await restoreSession();
      setIsAuthChecking(false);
    };
    init();

    return () => setUnauthorizedHandler(null);
  }, [clearUser, restoreSession]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuthChecking,
      isAuthenticated: !!user,
      clearUser,
      refreshUser,
      restoreSession,
    }),
    [user, isAuthChecking, clearUser, refreshUser, restoreSession]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers must be used inside UserProvider");
  return context;
};
