import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, Mail, Lock, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/auth/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in email and password to continue.",
        variant: "destructive",
      });
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      toast({
        title: "Invalid credentials",
        description: "Please check your email and password and try again.",
        variant: "destructive",
      });
      return;
    }

    // Determine destination based on actual user role after login
    const actualRole = result.user.role;
    const roleTo = actualRole === "admin" ? "/admin-dashboard" : actualRole === "doctor" ? "/doctor-dashboard" : "/patient-dashboard";
    toast({
      title: "Login Successful",
      description: `Welcome back! Redirecting to ${actualRole} dashboard...`,
    });
    setTimeout(() => navigate(roleTo), 800);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-medical">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary">
            <Stethoscope className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-semibold">Welcome to MedEase</CardTitle>
          <CardDescription>
            Sign in to your healthcare management account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@medease.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-medical"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-medical"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Login As (Optional)
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="transition-medical">
                  <SelectValue placeholder="Role will be auto-detected" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Your role will be automatically detected from your account
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary shadow-button transition-medical hover:scale-[1.02]"
            >
              Sign In to MedEase
            </Button>

            <div className="text-center space-y-2">
              <div className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up here
                </Link>
              </div>
              
              <div className="text-xs text-muted-foreground border-t pt-2">
                <p className="font-medium mb-1">Demo Credentials:</p>
                <p>Admin: admin@medease.com / Admin@123</p>
                <p>Doctor: dr.smith@medease.com / Doctor@123</p>
                <p>Patient: patient@medease.com / Patient@123</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;