import { supabase, Database } from './supabase'

// Type definitions
type User = Database['public']['Tables']['users']['Row']
type UserInsert = Database['public']['Tables']['users']['Insert']
type UserUpdate = Database['public']['Tables']['users']['Update']

type Appointment = Database['public']['Tables']['appointments']['Row']
type AppointmentInsert = Database['public']['Tables']['appointments']['Insert']
type AppointmentUpdate = Database['public']['Tables']['appointments']['Update']

type MedicalHistory = Database['public']['Tables']['medical_history']['Row']
type MedicalHistoryInsert = Database['public']['Tables']['medical_history']['Insert']
type MedicalHistoryUpdate = Database['public']['Tables']['medical_history']['Update']

// User Services
export const userService = {
  // Create a new user
  async createUser(userData: UserInsert): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single()

      if (error) {
        console.error('Error creating user:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error creating user:', error)
      return null
    }
  },

  // Get user by ID
  async getUserById(id: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching user:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  },

  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (error) {
        console.error('Error fetching user by email:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error fetching user by email:', error)
      return null
    }
  },

  // Update user
  async updateUser(id: string, updates: UserUpdate): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating user:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error updating user:', error)
      return null
    }
  },

  // Get all users by role
  async getUsersByRole(role: string): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', role)

      if (error) {
        console.error('Error fetching users by role:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching users by role:', error)
      return []
    }
  }
}

// Appointment Services
export const appointmentService = {
  // Create a new appointment
  async createAppointment(appointmentData: AppointmentInsert): Promise<Appointment | null> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert(appointmentData)
        .select()
        .single()

      if (error) {
        console.error('Error creating appointment:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error creating appointment:', error)
      return null
    }
  },

  // Get appointments by patient ID
  async getAppointmentsByPatient(patientId: string): Promise<Appointment[]> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', patientId)
        .order('appointment_date', { ascending: true })

      if (error) {
        console.error('Error fetching patient appointments:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching patient appointments:', error)
      return []
    }
  },

  // Get appointments by doctor ID
  async getAppointmentsByDoctor(doctorId: string): Promise<Appointment[]> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('doctor_id', doctorId)
        .order('appointment_date', { ascending: true })

      if (error) {
        console.error('Error fetching doctor appointments:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching doctor appointments:', error)
      return []
    }
  },

  // Update appointment
  async updateAppointment(id: string, updates: AppointmentUpdate): Promise<Appointment | null> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating appointment:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error updating appointment:', error)
      return null
    }
  },

  // Delete appointment
  async deleteAppointment(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting appointment:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error deleting appointment:', error)
      return false
    }
  }
}

// Medical History Services
export const medicalHistoryService = {
  // Create a new medical history entry
  async createMedicalHistory(historyData: MedicalHistoryInsert): Promise<MedicalHistory | null> {
    try {
      const { data, error } = await supabase
        .from('medical_history')
        .insert(historyData)
        .select()
        .single()

      if (error) {
        console.error('Error creating medical history:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error creating medical history:', error)
      return null
    }
  },

  // Get medical history by patient ID
  async getMedicalHistoryByPatient(patientId: string): Promise<MedicalHistory[]> {
    try {
      const { data, error } = await supabase
        .from('medical_history')
        .select('*')
        .eq('patient_id', patientId)
        .order('visit_date', { ascending: false })

      if (error) {
        console.error('Error fetching medical history:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching medical history:', error)
      return []
    }
  },

  // Update medical history
  async updateMedicalHistory(id: string, updates: MedicalHistoryUpdate): Promise<MedicalHistory | null> {
    try {
      const { data, error } = await supabase
        .from('medical_history')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating medical history:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error updating medical history:', error)
      return null
    }
  },

  // Delete medical history entry
  async deleteMedicalHistory(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('medical_history')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting medical history:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error deleting medical history:', error)
      return false
    }
  }
}

// Test connection function
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Supabase connection test failed:', error)
      return false
    }

    console.log('✅ Supabase connection successful')
    return true
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return false
  }
}
