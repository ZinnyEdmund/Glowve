import React, { createContext, useContext, useEffect, useState } from "react";
import * as api from "../services/mockApi";
import type { User } from "../types";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  error: string | null; // For error messages
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void; //  To clear errors manually
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);
const USER_KEY = "malli_user_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null); //  Clear previous errors
    try {
      const u = await api.login(email, password);
      setUser(u);
    } catch (err: unknown) {
      //  Catch and set error
      const message =
        err instanceof Error ? err.message : String(err) || "Login failed";
      setError(message);
      throw err; // ← Rethrow so component can handle it
    } finally {
      setLoading(false);
    }
  }

  async function register(name: string, email: string, password: string) {
    setLoading(true);
    setError(null); //  Clear previous errors

    //  Validation
    if (!name || !email || !password) {
      setError("All fields are required");
      setLoading(false);
      throw new Error("All fields are required");
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      throw new Error("Password must be at least 6 characters");
    }

    try {
      const u = await api.register({ email, name, role: "user", password });
      setUser(u);
    } catch (err: unknown) {
      //  Catch and set error
      const message =
        err instanceof Error
          ? err.message
          : String(err) || "Registration failed";
      setError(message);
      throw err; // ← Rethrow so component can handle it
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setError(null); //  Clear errors on logout
  }

  function clearError() {
    //  Allow manual error clearing
    setError(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
