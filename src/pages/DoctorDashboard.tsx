import Header from "@/components/layout/Header";
import { useAuth } from "@/auth/AuthContext";
import { readAppointments, readNotifications, updateAppointment, writeNotifications } from "@/lib/utils";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CalendarCheck, Check, X, UserCircle, Users, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const { user } = useAuth();
  const myAppts = useMemo(() => readAppointments().filter((a) => a.doctorEmail === user?.email), [user]);
  const myNotifs = useMemo(() => readNotifications().filter((n) => n.toEmail === (user?.email || "")), [user]);
  const uniquePatients = useMemo(() => new Set(myAppts.map((a) => a.patientEmail)).size, [myAppts]);
  const today = new Date().toISOString().slice(0, 10);
  const todaysCount = useMemo(() => myAppts.filter((a) => a.date === today).length, [myAppts, today]);

  const confirm = (id: string) => {
    updateAppointment(id, { status: "confirmed" });
    // mark related notifications as read
    const notifs = readNotifications().map((n) => n.data?.appointmentId === id ? { ...n, read: true } : n);
    writeNotifications(notifs);
    location.reload();
  };

  const decline = (id: string) => {
    updateAppointment(id, { status: "pending" });
    const notifs = readNotifications().map((n) => n.data?.appointmentId === id ? { ...n, read: true } : n);
    writeNotifications(notifs);
    location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Top summary section */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserCircle className="h-8 w-8" />
                <div>
                  <div className="text-sm text-muted-foreground">Your Profile</div>
                  <div className="font-semibold">{user?.name}</div>
                </div>
              </div>
              <Link to="/profile">
                <Button size="sm" variant="outline">View</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 flex items-center gap-3">
              <Users className="h-8 w-8" />
              <div>
                <div className="text-sm text-muted-foreground">Total Patients</div>
                <div className="text-2xl font-semibold">{uniquePatients}</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 flex items-center gap-3">
              <CalendarDays className="h-8 w-8" />
              <div>
                <div className="text-sm text-muted-foreground">Today's Appointments</div>
                <div className="text-2xl font-semibold">{todaysCount}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-card">
          <CardContent className="p-6 space-y-4">
            <div className="text-lg font-semibold flex items-center gap-2"><CalendarCheck className="h-5 w-5" /> My Appointments</div>
            <div className="space-y-3">
              {myAppts.length === 0 && <p className="text-muted-foreground">No appointments yet.</p>}
              {myAppts.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="font-medium">{a.date} {a.time}</div>
                    <div className="text-sm text-muted-foreground">Patient: {a.patientEmail}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={a.status === "confirmed" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}>{a.status}</Badge>
                    {a.status !== "confirmed" && (
                      <>
                        <Button size="sm" onClick={() => confirm(a.id)} className="bg-emerald-600 text-white"><Check className="h-4 w-4 mr-1" /> Confirm</Button>
                        <Button size="sm" variant="outline" onClick={() => decline(a.id)}><X className="h-4 w-4 mr-1" /> Decline</Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6 space-y-4">
            <div className="text-lg font-semibold flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</div>
            <div className="space-y-3">
              {myNotifs.length === 0 && <p className="text-muted-foreground">You're all caught up.</p>}
              {myNotifs.map((n) => (
                <div key={n.id} className={`rounded-md border p-3 ${n.read ? "opacity-70" : ""}`}>
                  <div className="text-sm">{n.message}</div>
                  <div className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;


