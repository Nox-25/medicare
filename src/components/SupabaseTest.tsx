import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { testSupabaseConnection, userService, appointmentService } from '@/lib/supabaseServices';
import { supabaseAuth } from '@/lib/supabaseAuth';
import { useToast } from '@/hooks/use-toast';

export const SupabaseTest = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const testConnection = async () => {
    setIsLoading(true);
    try {
      const connected = await testSupabaseConnection();
      setIsConnected(connected);
      
      if (connected) {
        toast({
          title: "✅ Supabase Connected!",
          description: "Successfully connected to Supabase database.",
        });
      } else {
        toast({
          title: "❌ Connection Failed",
          description: "Could not connect to Supabase database.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Connection test error:', error);
      setIsConnected(false);
      toast({
        title: "❌ Connection Error",
        description: "An error occurred while testing the connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testUserCreation = async () => {
    setIsLoading(true);
    try {
      const testUser = await userService.createUser({
        email: 'test@example.com',
        name: 'Test User',
        role: 'patient'
      });

      if (testUser) {
        toast({
          title: "✅ User Created!",
          description: `Test user created with ID: ${testUser.id}`,
        });
      } else {
        toast({
          title: "❌ User Creation Failed",
          description: "Could not create test user.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('User creation test error:', error);
      toast({
        title: "❌ User Creation Error",
        description: "An error occurred while creating test user.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testAuth = async () => {
    setIsLoading(true);
    try {
      // Test signup
      const signupResult = await supabaseAuth.signUp(
        'testauth@example.com',
        'testpassword123',
        'Test Auth User',
        'patient'
      );

      if (signupResult.user && !signupResult.error) {
        toast({
          title: "✅ Auth Test Successful!",
          description: `User signed up: ${signupResult.user.email}`,
        });
      } else {
        toast({
          title: "❌ Auth Test Failed",
          description: signupResult.error || "Authentication test failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Auth test error:', error);
      toast({
        title: "❌ Auth Test Error",
        description: "An error occurred during authentication test.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🗄️ Supabase Integration Test
        </CardTitle>
        <CardDescription>
          Test your Supabase PostgreSQL connection and services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Connection Status:</span>
          {isConnected === null && <Badge variant="secondary">Not Tested</Badge>}
          {isConnected === true && <Badge variant="default" className="bg-green-500">Connected</Badge>}
          {isConnected === false && <Badge variant="destructive">Failed</Badge>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={testConnection} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Testing..." : "Test Connection"}
          </Button>

          <Button 
            onClick={testUserCreation} 
            disabled={isLoading}
            variant="outline"
            className="w-full"
          >
            {isLoading ? "Creating..." : "Test User Creation"}
          </Button>

          <Button 
            onClick={testAuth} 
            disabled={isLoading}
            variant="outline"
            className="w-full"
          >
            {isLoading ? "Testing..." : "Test Authentication"}
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p><strong>Database URL:</strong> postgresql://postgres:[YOUR-PASSWORD]@db.cjcptchnnqrijqfofoju.supabase.co:5432/postgres</p>
          <p><strong>Supabase URL:</strong> https://cjcptchnnqrijqfofoju.supabase.co</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseTest;
