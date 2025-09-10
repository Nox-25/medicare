# 🔥 Firebase Hosting Setup Guide

This project uses **Firebase Hosting** for deployment while using **Supabase** for authentication and database services.

## 🚀 **Quick Start**

### 1. **Install Firebase CLI** (if not already installed)
```bash
npm install -g firebase-tools
```

### 2. **Login to Firebase**
```bash
firebase login
```

### 3. **Initialize Firebase Project** (if not already done)
```bash
firebase init hosting
```
- Select your Firebase project
- Set public directory to `dist`
- Configure as single-page app: **Yes**
- Overwrite index.html: **No**

### 4. **Build and Deploy**
```bash
# Build the project
npm run build

# Deploy to Firebase Hosting
npm run deploy

# Or deploy only hosting
npm run deploy:hosting
```

## 📁 **Project Structure**

```
├── firebase.json          # Firebase hosting configuration
├── dist/                  # Build output (auto-generated)
├── src/                   # Source code
│   ├── lib/
│   │   ├── supabase.ts    # Supabase client configuration
│   │   ├── supabaseAuth.ts # Supabase authentication
│   │   └── supabaseServices.ts # Supabase database services
│   └── ...
└── public/
    └── index.html         # Clean HTML template
```

## ⚙️ **Configuration**

### **Firebase Hosting** (`firebase.json`)
- **Public Directory**: `dist` (Vite build output)
- **SPA Routing**: All routes redirect to `index.html`
- **Caching**: Optimized for static assets
- **Headers**: Security and performance headers

### **Supabase Integration**
- **Authentication**: User signup, signin, signout
- **Database**: Users, appointments, medical history
- **Real-time**: Auth state changes
- **Fallback**: Local storage for demo purposes

## 🛠️ **Available Scripts**

```bash
# Development
npm run dev              # Start development server

# Building
npm run build            # Build for production
npm run build:dev        # Build for development

# Firebase Hosting
npm run deploy           # Build and deploy to Firebase
npm run deploy:hosting   # Deploy only hosting
npm run serve            # Serve locally with Firebase emulator

# Other
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

## 🌐 **Deployment URLs**

After deployment, your app will be available at:
- **Production**: `https://your-project-id.web.app`
- **Preview**: `https://your-project-id.firebaseapp.com`

## 🔧 **Environment Setup**

### **Required Environment Variables**
Create a `.env.local` file (optional, as Supabase config is hardcoded):

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Supabase Configuration**
The Supabase configuration is already set up in `src/lib/supabase.ts`:
- **URL**: `https://cjcptchnnqrijqfofoju.supabase.co`
- **Anon Key**: Already configured

## 📊 **Services Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │  Firebase       │    │   Supabase      │
│   (Frontend)    │◄──►│  Hosting        │    │   (Backend)     │
│                 │    │  (Static Files) │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                        │
                                │                        │
                                ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   CDN/Edge      │    │   PostgreSQL    │
                       │   (Global)      │    │   Database      │
                       └─────────────────┘    └─────────────────┘
```

## 🚨 **Troubleshooting**

### **Build Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run build -- --force
```

### **Firebase Issues**
```bash
# Check Firebase login status
firebase login:list

# Re-login if needed
firebase logout
firebase login

# Check project configuration
firebase projects:list
firebase use your-project-id
```

### **Supabase Issues**
- Check Supabase project status in dashboard
- Verify API keys are correct
- Check network connectivity
- Review browser console for errors

## 📈 **Performance Optimization**

### **Build Optimization**
- Vite automatically optimizes the build
- Code splitting enabled
- Tree shaking for unused code
- Asset optimization

### **Hosting Optimization**
- Firebase CDN for global delivery
- Gzip compression enabled
- Browser caching configured
- HTTPS by default

## 🔒 **Security**

### **Firebase Hosting**
- HTTPS enforced
- Security headers configured
- No sensitive data in client code

### **Supabase**
- Row Level Security (RLS) enabled
- API keys properly configured
- User authentication required for data access

## 📝 **Next Steps**

1. **Custom Domain**: Configure custom domain in Firebase Console
2. **CI/CD**: Set up GitHub Actions for automatic deployment
3. **Monitoring**: Enable Firebase Analytics and Performance Monitoring
4. **Backup**: Set up Supabase database backups

---

**Need Help?** Check the [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting) or [Supabase Documentation](https://supabase.com/docs).

