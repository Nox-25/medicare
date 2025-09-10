import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Phone, 
  AlertTriangle, 
  FileText, 
  Upload, 
  Printer, 
  UserPlus, 
  Eye,
  Plus
} from "lucide-react";

const PatientOverview = () => {
  const currentPatient = {
    name: "Emily Rodriguez",
    opid: "OP123456",
    gender: "Female",
    bloodGroup: "A+",
    age: 32,
    phone: "+1 (555) 234-5678",
    avatar: "/placeholder-avatar.jpg",
    medicalAlert: "Allergic to Walnut",
    emergencyContact: {
      name: "Carlos Rodriguez",
      phone: "+1 (555) 234-5679"
    },
    consentStatus: "Approved"
  };

  const actionButtons = [
    { icon: FileText, label: "Create Visit", variant: "default" as const },
    { icon: Upload, label: "Upload Consent", variant: "secondary" as const },
    { icon: Printer, label: "Print Consent", variant: "outline" as const },
    { icon: Eye, label: "Track Patient", variant: "outline" as const },
    { icon: Printer, label: "Print Visit", variant: "outline" as const },
    { icon: UserPlus, label: "New Patient", variant: "secondary" as const },
  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Patient Overview
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Patient Profile */}
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={currentPatient.avatar} alt={currentPatient.name} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
              {currentPatient.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="text-xl font-semibold">{currentPatient.name}</h3>
              <p className="text-sm text-muted-foreground">OPID: {currentPatient.opid}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Gender:</span>
                <p className="font-medium">{currentPatient.gender}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Blood:</span>
                <p className="font-medium">{currentPatient.bloodGroup}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Age:</span>
                <p className="font-medium">{currentPatient.age} years</p>
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span>
                <p className="font-medium text-xs">{currentPatient.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Alert */}
        <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium text-warning-foreground">Medical Alert</span>
          </div>
          <p className="text-sm text-foreground mt-1">{currentPatient.medicalAlert}</p>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Emergency Contact
          </h4>
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="font-medium">{currentPatient.emergencyContact.name}</p>
            <p className="text-sm text-muted-foreground">{currentPatient.emergencyContact.phone}</p>
          </div>
        </div>

        {/* Patient Consent Status */}
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Consent Status</h4>
          <Badge 
            variant="outline" 
            className="bg-success/10 text-success border-success/20"
          >
            {currentPatient.consentStatus}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <h4 className="font-medium">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            {actionButtons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                size="sm"
                className="justify-start text-xs h-8 transition-medical hover:scale-[1.02]"
              >
                <button.icon className="h-3 w-3 mr-2" />
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientOverview;