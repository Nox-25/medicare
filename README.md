# 🏥 MedEase - Healthcare Management System

A modern healthcare management application built with React, TypeScript, and Supabase, hosted on Firebase.

## 🚀 **Architecture**

- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Authentication + Database)
- **Hosting**: Firebase Hosting
- **Authentication**: Supabase Auth with fallback to local storage

## 📋 **Features**

- **User Management**: Patient, Doctor, Admin, Hospital roles
- **Authentication**: Secure login/signup with Supabase
- **Appointments**: Schedule and manage medical appointments
- **Medical History**: Track patient medical records
- **Document Management**: Upload and manage medical documents
- **Dashboard**: Role-based dashboards for different user types
- **Responsive Design**: Mobile-first responsive UI

## 🛠️ **Quick Start**

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase CLI (for deployment)

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd vitalmanage-grid-main

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🚀 **Deployment**

### Firebase Hosting

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Build and deploy
npm run deploy

# Or deploy only hosting
npm run deploy:hosting
```

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

## 📁 **Project Structure**

```
src/
├── auth/                 # Authentication context and components
├── components/           # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── layout/          # Layout components
│   └── ui/              # shadcn/ui components
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
│   ├── supabase.ts      # Supabase client configuration
│   ├── supabaseAuth.ts  # Supabase authentication
│   ├── supabaseServices.ts # Supabase database services
│   └── utils.ts         # Utility functions
├── pages/               # Page components
└── assets/              # Static assets
```

## 🔧 **Configuration**

### Supabase Setup
The Supabase configuration is already set up in `src/lib/supabase.ts`:
- **URL**: `https://cjcptchnnqrijqfofoju.supabase.co`
- **Anon Key**: Already configured

### Firebase Hosting
Configuration is in `firebase.json`:
- **Public Directory**: `dist`
- **SPA Routing**: Enabled
- **Caching**: Optimized for static assets

## 📚 **Documentation**

- [Firebase Hosting Setup](FIREBASE_HOSTING_SETUP.md)
- [Supabase Setup Guide](SUPABASE_SETUP_GUIDE.md)

## 🎯 **Available Scripts**

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run deploy           # Build and deploy to Firebase
npm run deploy:hosting   # Deploy only hosting
npm run serve            # Serve locally with Firebase emulator
```

## 🔒 **Security**

- **Authentication**: Supabase Auth with JWT tokens
- **Database**: Row Level Security (RLS) enabled
- **Hosting**: HTTPS enforced with security headers
- **API**: Secure API endpoints with proper validation

## 🌐 **Live Demo**

After deployment, your app will be available at:
- **Production**: `https://your-project-id.web.app`
- **Preview**: `https://your-project-id.firebaseapp.com`

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

---

**Built with ❤️ using React, TypeScript, Supabase, and Firebase Hosting**
