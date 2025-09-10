import Header from "@/components/layout/Header";
import PatientOverview from "@/components/dashboard/PatientOverview";
import AppointmentsOverview from "@/components/dashboard/AppointmentsOverview";
import PatientVisits from "@/components/dashboard/PatientVisits";
import QuickStats from "@/components/dashboard/QuickStats";
import SupabaseTest from "@/components/SupabaseTest";
import { useAuth } from "@/auth/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { Phone, User, CalendarCheck2, FileText, Stethoscope, Clock, Download, AlertTriangle, UploadCloud, Settings2, MessageSquare, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const greetingName = user?.name ?? "User";

  // Build patient profile details from local registry if available
  const patientProfile = useMemo(() => {
    if (user?.role !== "patient") return null;
    const raw = localStorage.getItem("medease_users");
    let fullName = user?.name ?? "Patient";
    let phone = "";
    let bloodGroup = "O+";
    let gender = "Unknown";
    let dateOfBirth = "";
    let emergencyName = "";
    let emergencyPhone = "";
    let alerts = ["No known allergies"] as string[];
    let opid = "";

    try {
      const list = raw ? (JSON.parse(raw) as Array<any>) : [];
      const me = list.find((u) => u.email?.toLowerCase() === user?.email?.toLowerCase());
      if (me) {
        fullName = me.name || fullName;
        phone = me.phone || phone;
        bloodGroup = me.bloodGroup || bloodGroup;
        gender = me.gender || gender;
        dateOfBirth = me.dateOfBirth || dateOfBirth;
        emergencyName = me.emergencyName || emergencyName;
        emergencyPhone = me.emergencyPhone || emergencyPhone;
        alerts = me.alerts || alerts;
        opid = me.opid || opid;
      }
    } catch {
      // ignore parse errors
    }

    if (!opid) {
      const seed = Math.abs((user?.email ?? "").split("").reduce((a, c) => a + c.charCodeAt(0), 0));
      opid = `OP${(100000 + (seed % 900000)).toString()}`;
    }

    return { fullName, phone, bloodGroup, gender, dateOfBirth, emergencyName, emergencyPhone, alerts, opid };
  }, [user]);

  // Demo patient data for display
  // Show only truly upcoming by comparing with today
  const upcomingAppointments = [
    { id: "a1", date: "2025-09-12", time: "09:30", doctor: "Dr. Smith", department: "Cardiology", status: "confirmed" as const },
    { id: "a2", date: "2025-09-18", time: "14:00", doctor: "Dr. Patel", department: "Dermatology", status: "pending" as const },
  ].filter((a) => {
    const today = new Date().toISOString().slice(0,10);
    return a.date >= today;
  });

  const history = [
    { id: "v1", date: "2025-08-03", summary: "Routine check-up, prescribed vitamins", critical: false },
    { id: "v2", date: "2025-07-20", summary: "Allergy consultation", critical: false },
    { id: "v3", date: "2025-06-11", summary: "Chest pain evaluation", critical: true },
  ];

  const navigate = useNavigate();

  const renderPatientView = () => (
    <main className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {patientProfile?.fullName}</h1>
          <p className="text-muted-foreground">Your personal health overview</p>
        </div>
        <Button variant="outline" className="hidden sm:inline-flex">
          <Settings2 className="mr-2 h-4 w-4" />
          Preferences
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="shadow-card hover:shadow-medical transition-medical lg:col-span-1">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Personal Information</div>
              <Badge variant="secondary">{patientProfile?.opid}</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2"><User className="h-4 w-4" /> {patientProfile?.fullName}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {patientProfile?.phone || "Not provided"}</div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div><span className="text-muted-foreground">Gender</span><div>{patientProfile?.gender}</div></div>
                <div><span className="text-muted-foreground">Blood</span><div>{patientProfile?.bloodGroup}</div></div>
                <div><span className="text-muted-foreground">DOB</span><div>{patientProfile?.dateOfBirth || "—"}</div></div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="text-sm text-muted-foreground mb-2">Emergency Contact</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{patientProfile?.emergencyName || "Not set"}</div>
                  <div className="text-sm text-muted-foreground">{patientProfile?.emergencyPhone || "—"}</div>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="text-sm text-muted-foreground mb-2">Medical Alerts</div>
              <div className="flex flex-wrap gap-2">
                {(patientProfile?.alerts ?? []).map((a, i) => (
                  <Badge key={i} className="bg-amber-100 text-amber-800 border-amber-200">{a}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="shadow-card hover:shadow-medical transition-medical lg:col-span-2">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold flex items-center gap-2"><CalendarCheck2 className="h-5 w-5" /> Upcoming Appointments</div>
              <Button size="sm" className="bg-gradient-primary" onClick={() => navigate("/appointments")}>Book New Appointment</Button>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-card px-3 py-2 text-sm">
                      <div className="font-semibold">{a.date}</div>
                      <div className="text-muted-foreground">{a.time}</div>
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2"><Stethoscope className="h-4 w-4" /> {a.doctor}</div>
                      <div className="text-sm text-muted-foreground">{a.department}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={a.status === "confirmed" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-red-100 text-red-700 border-red-200"}>
                      {a.status === "confirmed" ? "Confirmed" : "Pending"}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/appointments?id=${a.id}`)}>View Details</Button>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/appointments?reschedule=${a.id}`)}>Reschedule</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card hover:shadow-medical transition-medical lg:col-span-1">
          <CardContent className="p-6 space-y-3">
            <div className="text-lg font-semibold">Quick Actions</div>
            <Button className="w-full bg-gradient-primary" onClick={() => navigate("/appointments")}><CalendarCheck2 className="mr-2 h-4 w-4" /> Book New Appointment</Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/disease-analysis")}><Stethoscope className="mr-2 h-4 w-4" /> Disease Analysis</Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/profile")}><Settings2 className="mr-2 h-4 w-4" /> Update Personal Info</Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/documents")}><UploadCloud className="mr-2 h-4 w-4" /> Upload Medical Documents</Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/contact")}><MessageSquare className="mr-2 h-4 w-4" /> Contact Doctor</Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/supabase-test")}><Database className="mr-2 h-4 w-4" /> Test Supabase</Button>
          </CardContent>
        </Card>

        {/* Medical History */}
        <Card className="shadow-card hover:shadow-medical transition-medical lg:col-span-2">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold flex items-center gap-2"><Clock className="h-5 w-5" /> Medical History</div>
              <Button variant="outline" size="sm" onClick={() => navigate("/history")}><Download className="mr-2 h-4 w-4" /> Download All</Button>
            </div>
            <div className="space-y-3">
              {history.map((h) => (
                <div key={h.id} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="font-medium">{h.date}</div>
                    <div className="text-sm text-muted-foreground">{h.summary}</div>
                  </div>
                  {h.critical ? (
                    <Badge className="bg-red-100 text-red-700 border-red-200 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Critical</Badge>
                  ) : (
                    <Badge variant="secondary">Normal</Badge>
                  )}
                  <Button variant="outline" size="sm" onClick={() => navigate(`/history?id=${h.id}`)}><FileText className="mr-2 h-4 w-4" /> Summary</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );

  const renderDoctorAdminView = () => (
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {greetingName}
          </h1>
          <p className="text-muted-foreground text-lg">
          {user?.role === "doctor" && "Here's what's happening with your patients today."}
          {user?.role === "admin" && "System overview and key metrics for your organization."}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <QuickStats />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Overview */}
          <div className="lg:col-span-1">
            <PatientOverview />
          </div>

          {/* Right Column - Appointments and Visits */}
          <div className="lg:col-span-2 space-y-6">
            <AppointmentsOverview />
            <PatientVisits />
          </div>
        </div>
      </main>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      {user?.role === "patient" ? renderPatientView() : renderDoctorAdminView()}
    </div>
  );
};

export default Dashboard;