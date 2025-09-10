# 🗄️ Supabase Setup Guide

## ✅ **Connection Details Received**

Your Supabase project is now configured with:
- **Project URL**: `https://cjcptchnnqrijqfofoju.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqY3B0Y2hubnFyaWpxZm9mb2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTA0OTMsImV4cCI6MjA3MzA2NjQ5M30.l3ospvx_q0zj8u4vT4xs5Ozk2DL-aHqMhT3nd0QR6xU`
- **Database Password**: `Kanishk@2005`

## 🚀 **Next Steps to Complete Setup**

### **Step 1: Create Database Tables**

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: `health-care-21b7d`
3. **Navigate to**: SQL Editor (in the left sidebar)
4. **Click**: "New Query"
5. **Copy and paste** the contents of `supabase_setup.sql` file
6. **Click**: "Run" to execute the script

This will create:
- ✅ `users` table (for user profiles)
- ✅ `appointments` table (for appointment management)
- ✅ `medical_history` table (for patient records)
- ✅ Proper indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Sample data for testing

### **Step 2: Test the Connection**

1. **Start your development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open your application**: http://localhost:8083/

3. **Login or create an account**

4. **Go to Dashboard** and click **"Test Supabase"** button

5. **Test the connection** using the test buttons

### **Step 3: Verify Database Setup**

In your Supabase Dashboard:
1. **Go to**: Table Editor
2. **Verify tables exist**: `users`, `appointments`, `medical_history`
3. **Check sample data** in the `users` table

## 🔧 **What's Already Configured**

- ✅ Supabase client library installed
- ✅ Database services created (`userService`, `appointmentService`, `medicalHistoryService`)
- ✅ Authentication integration (Supabase → Fallback)
- ✅ Test components ready
- ✅ Routing configured (`/supabase-test`)
- ✅ Real credentials updated

## 🎯 **Features Available**

### **Authentication**
- **Primary**: Supabase Auth
- **Fallback**: Local Storage Auth
- **Local**: Local storage (if both fail)

### **Database Operations**
- **User Management**: Create, read, update users
- **Appointments**: Schedule, manage, track appointments
- **Medical History**: Store and retrieve patient records
- **Real-time**: Live updates with Supabase subscriptions

### **Security**
- **Row Level Security (RLS)**: Users can only access their own data
- **Role-based Access**: Different permissions for admin, doctor, patient, hospital
- **Secure Policies**: Proper data isolation

## 🧪 **Testing Your Setup**

1. **Connection Test**: Verify database connectivity
2. **User Creation**: Test user registration
3. **Authentication**: Test login/logout
4. **Data Operations**: Test CRUD operations

## 📱 **Access Your Application**

- **Development**: http://localhost:8083/
- **Supabase Test Page**: http://localhost:8083/supabase-test
- **Dashboard**: http://localhost:8083/dashboard

## 🆘 **Troubleshooting**

If you encounter issues:

1. **Check Supabase Dashboard**: Ensure tables were created successfully
2. **Verify RLS Policies**: Check that policies are active
3. **Test Connection**: Use the test buttons in the app
4. **Check Console**: Look for error messages in browser console

## 🎉 **You're All Set!**

Once you run the SQL script, your Supabase PostgreSQL database will be fully integrated with your healthcare management application!

**Database URL**: `postgresql://postgres:Kanishk@2005@db.cjcptchnnqrijqfofoju.supabase.co:5432/postgres`
