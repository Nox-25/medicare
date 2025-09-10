import Header from "@/components/layout/Header";
import { useAuth } from "@/auth/AuthContext";
import { readAppointments, readUsers } from "@/lib/utils";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CalendarDays, Activity } from "lucide-react";

const Stat = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
  <div className="flex items-center gap-3 p-3 rounded-md border">
    <div className="rounded-md bg-card p-2"><Icon className="h-5 w-5" /></div>
    <div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  </div>
);

const HospitalDashboard = () => {
  const { user } = useAuth();
  const appts = useMemo(() => readAppointments(), []);
  const doctors = useMemo(() => readUsers().filter((u) => u.role === "doctor"), []);
  const patients = useMemo(() => readUsers().filter((u) => u.role === "patient"), []);

  const today = new Date().toISOString().slice(0, 10);
  const todayCount = appts.filter((a) => a.date === today).length;
  const pending = appts.filter((a) => a.status === "pending").length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{user?.name} Overview</h1>
          <p className="text-muted-foreground">Hospital operations at a glance</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Stat icon={Users} label="Doctors" value={doctors.length} />
          <Stat icon={CalendarDays} label="Appointments Today" value={todayCount} />
          <Stat icon={Activity} label="Pending Requests" value={pending} />
        </div>

        <Card className="shadow-card">
          <CardContent className="p-6 space-y-4">
            <div className="text-lg font-semibold">Recent Appointments</div>
            <div className="space-y-3">
              {appts.slice(0, 8).map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="font-medium">{a.date} {a.time}</div>
                    <div className="text-sm text-muted-foreground">Doctor: {a.doctorEmail} | Patient: {a.patientEmail}</div>
                  </div>
                  <Badge>{a.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HospitalDashboard;



