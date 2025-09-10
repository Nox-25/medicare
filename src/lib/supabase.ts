import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://cjcptchnnqrijqfofoju.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqY3B0Y2hubnFyaWpxZm9mb2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTA0OTMsImV4cCI6MjA3MzA2NjQ5M30.l3ospvx_q0zj8u4vT4xs5Ozk2DL-aHqMhT3nd0QR6xU'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (you can generate these from your Supabase schema)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'admin' | 'doctor' | 'patient' | 'hospital'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: 'admin' | 'doctor' | 'patient' | 'hospital'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'admin' | 'doctor' | 'patient' | 'hospital'
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          appointment_date: string
          appointment_time: string
          status: 'scheduled' | 'completed' | 'cancelled'
          notes?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          appointment_date: string
          appointment_time: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string
          appointment_date?: string
          appointment_time?: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string
          created_at?: string
          updated_at?: string
        }
      }
      medical_history: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          diagnosis: string
          treatment: string
          notes?: string
          visit_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          diagnosis: string
          treatment: string
          notes?: string
          visit_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string
          diagnosis?: string
          treatment?: string
          notes?: string
          visit_date?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export default supabase
