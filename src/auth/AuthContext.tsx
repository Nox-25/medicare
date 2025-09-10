import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type User = {
  email: string;
  name: string;
  role: "admin" | "doctor" | "patient" | "hospital";
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: true; user: User } | { success: false; error: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "medease_user";
const USERS_KEY = "medease_users";

// Demo credential store; replace with real API integration when available
const DEFAULT_USERS: Record<string, { password: string; name: string; role: User["role"] }> = {
  "admin@medease.com": { password: "Admin@123", name: "System Administrator", role: "admin" },
  // Demo doctors (password demo@123; name as username)
  "dr.alex@medease.com": { password: "demo@123", name: "DrAlex", role: "doctor" },
  "dr.khan@medease.com": { password: "demo@123", name: "DrKhan", role: "doctor" },
  // Demo hospitals (password demo@123; name as username)
  "cityhospital@medease.com": { password: "demo@123", name: "CityHospital", role: "hospital" },
  "greenclinic@medease.com": { password: "demo@123", name: "GreenClinic", role: "hospital" },
  // Demo patient
  "patient@medease.com": { password: "Patient@123", name: "John Carter", role: "patient" },
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as User;
        setUser(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const lower = email.toLowerCase();
    // Load user registry
    let registry: Array<{ email: string; password: string; name: string; role: User["role"] }> = [];
    try {
      const raw = localStorage.getItem(USERS_KEY);
      if (raw) registry = JSON.parse(raw);
    } catch {
      // ignore parse errors
    }

    // Merge with defaults (defaults cannot be overwritten by registry)
    const mergedMap = new Map<string, { password: string; name: string; role: User["role"] }>();
    Object.entries(DEFAULT_USERS).forEach(([k, v]) => mergedMap.set(k, v));
    registry.forEach((u) => mergedMap.set(u.email.toLowerCase(), { password: u.password, name: u.name, role: u.role }));

    const record = mergedMap.get(lower);
    if (!record || record.password !== password) {
      return { success: false as const, error: "Invalid credentials" };
    }

    const signedInUser: User = { email: lower, name: record.name, role: record.role };
    setUser(signedInUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(signedInUser));
    return { success: true as const, user: signedInUser };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextType>(() => ({ user, login, logout }), [login, logout, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};


