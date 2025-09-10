import { supabase } from './supabase'
import { userService } from './supabaseServices'

export interface SupabaseUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'doctor' | 'patient' | 'hospital'
}

// Supabase Authentication Services
export const supabaseAuth = {
  // Sign up with email and password
  async signUp(email: string, password: string, name: string, role: 'admin' | 'doctor' | 'patient' | 'hospital'): Promise<{ user: SupabaseUser | null; error: string | null }> {
    try {
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        console.error('Supabase auth signup error:', authError)
        return { user: null, error: authError.message }
      }

      if (!authData.user) {
        return { user: null, error: 'No user data returned from signup' }
      }

      // Create user profile in our users table
      const userProfile = await userService.createUser({
        id: authData.user.id,
        email,
        name,
        role,
      })

      if (!userProfile) {
        return { user: null, error: 'Failed to create user profile' }
      }

      return { 
        user: {
          id: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          role: userProfile.role
        }, 
        error: null 
      }
    } catch (error) {
      console.error('Supabase signup error:', error)
      return { user: null, error: 'An unexpected error occurred during signup' }
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<{ user: SupabaseUser | null; error: string | null }> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        console.error('Supabase auth signin error:', authError)
        return { user: null, error: authError.message }
      }

      if (!authData.user) {
        return { user: null, error: 'No user data returned from signin' }
      }

      // Get user profile from our users table
      const userProfile = await userService.getUserById(authData.user.id)

      if (!userProfile) {
        return { user: null, error: 'User profile not found' }
      }

      return { 
        user: {
          id: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          role: userProfile.role
        }, 
        error: null 
      }
    } catch (error) {
      console.error('Supabase signin error:', error)
      return { user: null, error: 'An unexpected error occurred during signin' }
    }
  },

  // Sign out
  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Supabase auth signout error:', error)
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Supabase signout error:', error)
      return { error: 'An unexpected error occurred during signout' }
    }
  },

  // Get current user
  async getCurrentUser(): Promise<SupabaseUser | null> {
    try {
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()

      if (authError || !authUser) {
        console.error('Supabase get current user error:', authError)
        return null
      }

      // Get user profile from our users table
      const userProfile = await userService.getUserById(authUser.id)

      if (!userProfile) {
        return null
      }

      return {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        role: userProfile.role
      }
    } catch (error) {
      console.error('Supabase get current user error:', error)
      return null
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (user: SupabaseUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userProfile = await userService.getUserById(session.user.id)
        if (userProfile) {
          callback({
            id: userProfile.id,
            email: userProfile.email,
            name: userProfile.name,
            role: userProfile.role
          })
        } else {
          callback(null)
        }
      } else {
        callback(null)
      }
    })
  },

  // Update user profile
  async updateProfile(userId: string, updates: { name?: string; email?: string }): Promise<{ user: SupabaseUser | null; error: string | null }> {
    try {
      const updatedUser = await userService.updateUser(userId, updates)

      if (!updatedUser) {
        return { user: null, error: 'Failed to update user profile' }
      }

      return { 
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          role: updatedUser.role
        }, 
        error: null 
      }
    } catch (error) {
      console.error('Supabase update profile error:', error)
      return { user: null, error: 'An unexpected error occurred during profile update' }
    }
  }
}

export default supabaseAuth
