import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, MapPin } from "lucide-react";

const AppointmentsOverview = () => {
  const appointments = [
    {
      id: 1,
      clinicName: "Cardiology Center",
      doctorName: "Dr. Michael Chen",
      patientOPID: "OP789012",
      patientName: "James Wilson",
      startTime: "09:00 AM",
      date: "Today",
      status: "confirmed",
      type: "Follow-up"
    },
    {
      id: 2,
      clinicName: "General Medicine",
      doctorName: "Dr. Sarah Johnson",
      patientOPID: "OP345678", 
      patientName: "Maria Garcia",
      startTime: "10:30 AM",
      date: "Today",
      status: "confirmed",
      type: "Consultation"
    },
    {
      id: 3,
      clinicName: "Pediatrics Department",
      doctorName: "Dr. Lisa Park",
      patientOPID: "OP901234",
      patientName: "Tommy Brown",
      startTime: "02:00 PM",
      date: "Today",
      status: "pending",
      type: "Check-up"
    },
    {
      id: 4,
      clinicName: "Orthopedics",
      doctorName: "Dr. Robert Kim",
      patientOPID: "OP567890",
      patientName: "Anna Johnson",
      startTime: "03:30 PM",
      date: "Tomorrow",
      status: "confirmed",
      type: "Surgery Consult"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success/10 text-success border-success/20";
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Open Appointments
          </CardTitle>
          <Button size="sm" className="bg-gradient-primary shadow-button">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 rounded-lg border bg-card hover:shadow-md transition-medical"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">{appointment.clinicName}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {appointment.doctorName}
                  </p>
                </div>
                
                <Badge 
                  variant="outline"
                  className={getStatusColor(appointment.status)}
                >
                  {appointment.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Patient:</span>
                  <p className="font-medium">{appointment.patientName}</p>
                  <p className="text-xs text-muted-foreground">{appointment.patientOPID}</p>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Time:</span>
                  <p className="font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {appointment.startTime}
                  </p>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <p className="font-medium">{appointment.date}</p>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <p className="font-medium">{appointment.type}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                {appointment.status === "pending" && (
                  <Button variant="outline" size="sm" className="text-success">
                    Confirm
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">
            View All Appointments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentsOverview;