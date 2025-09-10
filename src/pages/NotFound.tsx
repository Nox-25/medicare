import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Stethoscope, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
            <Stethoscope className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to your healthcare dashboard.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/dashboard">
            <Button className="bg-gradient-primary shadow-button hover:scale-[1.02] transition-medical">
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
          
          <Link to="/">
            <Button variant="outline" className="transition-medical hover:scale-[1.02]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
