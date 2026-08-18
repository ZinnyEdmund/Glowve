import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { User } from "../types";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

// Reads the matching `profiles` row for a Supabase auth user.
// Falls back to a minimal user object if the row is somehow missing
// (it shouldn't be — the `handle_new_user` trigger creates it on signup).
async function fetchProfile(userId: string, fallbackEmail: string): Promise<User> {
  const { data, error } = await supabase
    .from("profiles")
    .select("email, name, phone, role")
    .eq("id", userId)
    .single();

  if (error || !data) {
    return { id: userId, email: fallbackEmail, name: fallbackEmail, role: "user" };
  }

  return {
    id: userId,
    email: data.email,
    name: data.name,
    role: data.role as "user" | "admin",
    phone: data.phone ?? undefined,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    // Initial check on load/refresh
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!active) return;
      if (session?.user) {
        const profile = await fetchProfile(session.user.id, session.user.email ?? "");
        if (active) setUser(profile);
      }
      if (active) setLoading(false);
    });

    // Keep in sync with login/logout/token refresh, including in other tabs
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id, session.user.email ?? "");
        setUser(profile);
      } else {
        setUser(null);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) throw err;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function register(name: string, email: string, password: string) {
    setLoading(true);
    setError(null);

    if (!name || !email || !password) {
      const msg = "All fields are required";
      setError(msg);
      setLoading(false);
      throw new Error(msg);
    }

    if (password.length < 6) {
      const msg = "Password must be at least 6 characters";
      setError(msg);
      setLoading(false);
      throw new Error(msg);
    }

    try {
      // `name` is passed as user metadata; the handle_new_user trigger
      // reads it (raw_user_meta_data->>'name') to populate profiles.name.
      // emailRedirectTo controls where the confirmation link sends the user —
      // they'll already be signed in when they land there.
      const { error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });
      if (err) throw err;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    supabase.auth.signOut();
    setUser(null);
    setError(null);
  }

  function clearError() {
    setError(null);
  }

  async function refreshUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const profile = await fetchProfile(session.user.id, session.user.email ?? "");
      setUser(profile);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout, clearError, refreshUser }}
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