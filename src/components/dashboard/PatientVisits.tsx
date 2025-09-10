import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Calendar, User, Building, ChevronRight } from "lucide-react";

const PatientVisits = () => {
  const visits = [
    {
      id: "V001",
      doctorName: "Dr. Sarah Johnson",
      department: "General Medicine",
      visitDate: "2024-01-08",
      time: "10:30 AM",
      patientName: "Emily Rodriguez",
      opid: "OP123456",
      type: "Follow-up",
      status: "completed"
    },
    {
      id: "V002", 
      doctorName: "Dr. Michael Chen",
      department: "Cardiology",
      visitDate: "2024-01-07",
      time: "02:15 PM",
      patientName: "James Wilson",
      opid: "OP789012",
      type: "Consultation",
      status: "completed"
    },
    {
      id: "V003",
      doctorName: "Dr. Lisa Park",
      department: "Pediatrics",
      visitDate: "2024-01-07",
      time: "09:45 AM",
      patientName: "Tommy Brown",
      opid: "OP901234",
      type: "Check-up",
      status: "in-progress"
    },
    {
      id: "V004",
      doctorName: "Dr. Robert Kim",
      department: "Orthopedics",
      visitDate: "2024-01-06",
      time: "03:30 PM",
      patientName: "Anna Johnson",
      opid: "OP567890",
      type: "Surgery Consult",
      status: "completed"
    },
    {
      id: "V005",
      doctorName: "Dr. Amanda Foster",
      department: "Dermatology",
      visitDate: "2024-01-06",
      time: "11:00 AM",
      patientName: "David Miller",
      opid: "OP234567",
      type: "Treatment",
      status: "completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "in-progress":
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
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Patient Visits
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {visits.map((visit) => (
            <div
              key={visit.id}
              className="p-4 rounded-lg border bg-card hover:shadow-md transition-medical cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{visit.doctorName}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building className="h-3 w-3" />
                      {visit.department}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline"
                    className={getStatusColor(visit.status)}
                  >
                    {visit.status}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-medical" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Visit ID:</span>
                  <p className="font-medium">{visit.id}</p>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Patient:</span>
                  <p className="font-medium">{visit.patientName}</p>
                  <p className="text-xs text-muted-foreground">{visit.opid}</p>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(visit.visitDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <p className="font-medium">{visit.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing 5 of 142 visits
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientVisits;