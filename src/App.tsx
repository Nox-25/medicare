import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AppointmentsPage, HistoryPage, ProfilePage, DocumentsPage, ContactPage } from "./pages/PatientPages";
import DoctorDashboard from "./pages/DoctorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import DiseaseAnalysis from "./pages/DiseaseAnalysis";
import SupabaseTestPage from "./pages/SupabaseTestPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Patient-focused routes */}
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/disease-analysis" element={<DiseaseAnalysis />} />
              <Route path="/supabase-test" element={<SupabaseTestPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Role dashboards */}
              <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["hospital"]} />}>
                <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin-dashboard" element={<Dashboard />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
                <Route path="/doctor-dashboard" element={<Dashboard />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
                <Route path="/patient-dashboard" element={<Dashboard />} />
              </Route>
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
