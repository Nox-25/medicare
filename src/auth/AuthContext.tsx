import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fallbackAuth, type FallbackUser } from "@/lib/fallbackAuth";
import { supabaseAuth, type SupabaseUser } from "@/lib/supabaseAuth";

type User = {
  uid: string;
  email: string;
  name: string;
  role: "admin" | "doctor" | "patient" | "hospital";
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: true; user: User } | { success: false; error: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  authProvider: 'supabase' | 'fallback';
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authProvider, setAuthProvider] = useState<'supabase' | 'fallback'>('supabase');

  useEffect(() => {
    // Try Supabase first, then fallback
    const initializeAuth = async () => {
      try {
        // Try Supabase auth first
        const supabaseUser = await supabaseAuth.getCurrentUser();
        if (supabaseUser) {
          const userData: User = {
            uid: supabaseUser.id,
            email: supabaseUser.email,
            name: supabaseUser.name,
            role: supabaseUser.role
          };
          setUser(userData);
          setAuthProvider('supabase');
          setLoading(false);
          
          // Set up Supabase auth state listener
          const { data: { subscription } } = supabaseAuth.onAuthStateChange((user: SupabaseUser | null) => {
            if (user) {
              const userData: User = {
                uid: user.id,
                email: user.email,
                name: user.name,
                role: user.role
              };
              setUser(userData);
            } else {
              setUser(null);
            }
          });
          
          return () => subscription.unsubscribe();
        }
        
        // If no Supabase user, check fallback auth
        const fallbackUser = fallbackAuth.getCurrentUser();
        if (fallbackUser) {
          setUser(fallbackUser);
          setAuthProvider('fallback');
        } else {
          setUser(null);
        }
        setLoading(false);
        return () => {}; // Empty unsubscribe function
      } catch (error) {
        console.warn('Supabase auth failed, using fallback:', error);
        // Use fallback auth
        const fallbackUser = fallbackAuth.getCurrentUser();
        if (fallbackUser) {
          setUser(fallbackUser);
          setAuthProvider('fallback');
        }
        setLoading(false);
        return () => {}; // Empty unsubscribe function
      }
    };

    const unsubscribe = initializeAuth();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Try Supabase authentication first
      const supabaseResult = await supabaseAuth.signIn(email, password);
      if (supabaseResult.user && !supabaseResult.error) {
        const userData: User = {
          uid: supabaseResult.user.id,
          email: supabaseResult.user.email,
          name: supabaseResult.user.name,
          role: supabaseResult.user.role
        };
        setUser(userData);
        setAuthProvider('supabase');
        return { success: true as const, user: userData };
      }

      // Fallback to local auth
      const fallbackResult = await fallbackAuth.signIn(email, password);
      if (fallbackResult.success && fallbackResult.user) {
        setUser(fallbackResult.user);
        setAuthProvider('fallback');
        return { success: true as const, user: fallbackResult.user };
      }

      return { success: false as const, error: "Login failed with all authentication methods" };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false as const, error: error.message || "Login failed" };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (authProvider === 'supabase') {
        await supabaseAuth.signOut();
      } else {
        await fallbackAuth.signOut();
      }
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if there's an error
      setUser(null);
    }
  }, [authProvider]);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!user) return { success: false, error: "No user logged in" };
    
    try {
      if (authProvider === 'supabase') {
        const result = await supabaseAuth.updateProfile(user.uid, data);
        if (result.user && !result.error) {
          const userData: User = {
            uid: result.user.id,
            email: result.user.email,
            name: result.user.name,
            role: result.user.role
          };
          setUser(userData);
          return { success: true };
        } else {
          return { success: false, error: result.error || "Update failed" };
        }
      } else {
        // For fallback auth, just update local state
        setUser(prev => prev ? { ...prev, ...data } : null);
        return { success: true };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [user, authProvider]);

  const value = useMemo<AuthContextType>(() => ({ 
    user, 
    login, 
    logout, 
    updateProfile,
    authProvider
  }), [login, logout, updateProfile, user, authProvider]);

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};


