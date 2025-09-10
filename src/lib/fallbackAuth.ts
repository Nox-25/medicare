// Fallback authentication system for when Supabase is not available
export interface FallbackUser {
  uid: string;
  email: string;
  name: string;
  role: 'admin' | 'doctor' | 'patient' | 'hospital';
}

// Demo users for fallback
const DEMO_USERS: Record<string, { password: string; name: string; role: FallbackUser['role'] }> = {
  "admin@medease.com": { password: "Admin@123", name: "System Administrator", role: "admin" },
  "dr.smith@medease.com": { password: "Doctor@123", name: "Dr. John Smith", role: "doctor" },
  "patient@medease.com": { password: "Patient@123", name: "John Doe", role: "patient" },
};

// Get all users from localStorage
const getAllUsers = (): Record<string, { password: string; name: string; role: FallbackUser['role'] }> => {
  try {
    const stored = localStorage.getItem('fallback_users');
    if (stored) {
      return { ...DEMO_USERS, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
  return DEMO_USERS;
};

// Save all users to localStorage
const saveAllUsers = (users: Record<string, { password: string; name: string; role: FallbackUser['role'] }>) => {
  try {
    localStorage.setItem('fallback_users', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

export const fallbackAuth = {
  // Sign in with fallback system
  async signIn(email: string, password: string): Promise<{ success: boolean; user?: FallbackUser; error?: string }> {
    try {
      const allUsers = getAllUsers();
      const user = allUsers[email.toLowerCase()];
      
      if (!user || user.password !== password) {
        return { success: false, error: "Invalid credentials" };
      }
      
      const fallbackUser: FallbackUser = {
        uid: `fallback-${email.toLowerCase().replace('@', '-').replace('.', '-')}`,
        email: email.toLowerCase(),
        name: user.name,
        role: user.role
      };
      
      // Store in localStorage for session persistence
      localStorage.setItem('fallback_user', JSON.stringify(fallbackUser));
      
      return { success: true, user: fallbackUser };
    } catch (error) {
      return { success: false, error: "Authentication failed" };
    }
  },

  // Sign out
  async signOut(): Promise<{ success: boolean }> {
    try {
      localStorage.removeItem('fallback_user');
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  },

  // Get current user
  getCurrentUser(): FallbackUser | null {
    try {
      const userData = localStorage.getItem('fallback_user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  },

  // Create user (for demo purposes)
  async createUser(email: string, password: string, name: string, role: string = 'patient'): Promise<{ success: boolean; user?: FallbackUser; error?: string }> {
    try {
      const allUsers = getAllUsers();
      
      if (allUsers[email.toLowerCase()]) {
        return { success: false, error: "User already exists" };
      }
      
      const fallbackUser: FallbackUser = {
        uid: `fallback-${email.toLowerCase().replace('@', '-').replace('.', '-')}`,
        email: email.toLowerCase(),
        name,
        role: role as FallbackUser['role']
      };
      
      // Add user to the users list
      allUsers[email.toLowerCase()] = { password, name, role: role as FallbackUser['role'] };
      saveAllUsers(allUsers);
      
      // Store current user in localStorage
      localStorage.setItem('fallback_user', JSON.stringify(fallbackUser));
      
      return { success: true, user: fallbackUser };
    } catch (error) {
      return { success: false, error: "User creation failed" };
    }
  }
};
