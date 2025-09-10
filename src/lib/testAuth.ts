// Test authentication functionality
import { fallbackAuth } from './fallbackAuth';

export const testAuthentication = async () => {
  console.log('🧪 Testing Authentication System');
  console.log('================================');
  
  try {
    // Test fallback authentication
    console.log('📝 Testing fallback authentication...');
    
    // Test sign in
    const signInResult = await fallbackAuth.signIn('patient@medease.com', 'Patient@123');
    if (signInResult.success) {
      console.log('✅ Sign in successful:', signInResult.user);
    } else {
      console.log('❌ Sign in failed:', signInResult.error);
    }
    
    // Test get current user
    const currentUser = fallbackAuth.getCurrentUser();
    if (currentUser) {
      console.log('✅ Current user retrieved:', currentUser);
    } else {
      console.log('❌ No current user found');
    }
    
    // Test sign out
    const signOutResult = await fallbackAuth.signOut();
    if (signOutResult.success) {
      console.log('✅ Sign out successful');
    } else {
      console.log('❌ Sign out failed');
    }
    
    // Test invalid credentials
    const invalidResult = await fallbackAuth.signIn('invalid@email.com', 'wrongpassword');
    if (!invalidResult.success) {
      console.log('✅ Invalid credentials properly rejected:', invalidResult.error);
    } else {
      console.log('❌ Invalid credentials were accepted (this is wrong)');
    }
    
    console.log('🎉 Authentication test completed!');
    return true;
    
  } catch (error) {
    console.error('❌ Authentication test failed:', error);
    return false;
  }
};

// Demo credentials for testing
export const DEMO_CREDENTIALS = {
  admin: { email: 'admin@medease.com', password: 'Admin@123' },
  doctor: { email: 'dr.smith@medease.com', password: 'Doctor@123' },
  patient: { email: 'patient@medease.com', password: 'Patient@123' }
};

// Uncomment to run test
// testAuthentication();
