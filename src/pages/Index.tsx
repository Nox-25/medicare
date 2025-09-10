import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Stethoscope, 
  Calendar, 
  Users, 
  FileText, 
  Shield, 
  Clock,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import heroImage from "@/assets/medical-hero.jpg";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient profiles with medical history, allergies, and emergency contacts."
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling", 
      description: "Smart scheduling system with automated reminders and conflict detection."
    },
    {
      icon: FileText,
      title: "Digital Records",
      description: "Secure, searchable medical records with consent management and compliance."
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security ensuring patient data privacy and regulatory compliance."
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Instant notifications and live updates across all departments and staff."
    }
  ];

  const benefits = [
    "Streamlined patient intake and registration",
    "Automated appointment reminders and follow-ups", 
    "Integrated billing and insurance processing",
    "Comprehensive reporting and analytics",
    "Mobile-friendly responsive design",
    "24/7 technical support and maintenance"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header Navigation */}
      <header className="border-b bg-card/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-primary">
                <Stethoscope className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">MedEase</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-medical">
                Features
              </a>
              <a href="#benefits" className="text-muted-foreground hover:text-primary transition-medical">
                Benefits
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-medical">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-gradient-primary shadow-button">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Complete Healthcare
                  <span className="text-primary"> Practice Management</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Streamline your medical practice with our comprehensive management system. 
                  Handle patients, appointments, billing, and records all in one secure platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-primary shadow-button hover:scale-[1.02] transition-medical">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="transition-medical hover:scale-[1.02]">
                    View Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Free 30-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src={heroImage}
                  alt="Medical professionals using MedEase dashboard"
                  className="rounded-2xl shadow-medical w-full h-auto"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-3xl opacity-20 transform scale-105"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Run Your Practice
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From patient management to billing, MedEase provides all the tools 
              your healthcare practice needs in one integrated platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-medical transition-medical">
                <CardContent className="p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Why Healthcare Providers Choose MedEase
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join thousands of healthcare professionals who trust MedEase 
                  to manage their practice efficiently and securely.
                </p>
              </div>

              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/signup">
                <Button size="lg" className="bg-gradient-secondary shadow-button hover:scale-[1.02] transition-medical">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <Card className="shadow-medical">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Ready to Transform Your Practice?</h3>
                    <p className="text-muted-foreground">Join MedEase today and experience the future of healthcare management.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">1000+</div>
                      <div className="text-sm text-muted-foreground">Healthcare Providers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">50K+</div>
                      <div className="text-sm text-muted-foreground">Patients Managed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">99.9%</div>
                      <div className="text-sm text-muted-foreground">Uptime Guaranteed</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link to="/signup" className="block">
                      <Button className="w-full bg-gradient-primary shadow-button">
                        Start Free Trial
                      </Button>
                    </Link>
                    <Link to="/login" className="block">
                      <Button variant="outline" className="w-full">
                        Sign In to Existing Account
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-primary">
                <Stethoscope className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-primary">MedEase</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2024 MedEase. All rights reserved. | Privacy Policy | Terms of Service
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;