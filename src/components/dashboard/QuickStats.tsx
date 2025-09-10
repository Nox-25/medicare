import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp,
  Clock,
  AlertCircle
} from "lucide-react";

const QuickStats = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "1,247",
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
      bgGradient: "bg-gradient-primary"
    },
    {
      title: "Today's Appointments",
      value: "24",
      icon: Calendar,
      change: "+3",
      changeType: "positive" as const,
      bgGradient: "bg-gradient-secondary"
    },
    {
      title: "Pending Visits",
      value: "8",
      icon: Clock,
      change: "-2",
      changeType: "positive" as const,
      bgGradient: "bg-gradient-to-br from-warning to-warning/80"
    },
    {
      title: "Active Treatments",
      value: "156",
      icon: FileText,
      change: "+8%",
      changeType: "positive" as const,
      bgGradient: "bg-gradient-to-br from-success to-success/80"
    },
    {
      title: "Critical Cases",
      value: "3",
      icon: AlertCircle,
      change: "0",
      changeType: "neutral" as const,
      bgGradient: "bg-gradient-to-br from-critical to-critical/80"
    },
    {
      title: "Monthly Revenue",
      value: "$24.5K",
      icon: TrendingUp,
      change: "+15%",
      changeType: "positive" as const,
      bgGradient: "bg-gradient-to-br from-primary to-secondary"
    }
  ];

  const getChangeColor = (type: "positive" | "negative" | "neutral") => {
    switch (type) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-card hover:shadow-medical transition-medical">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgGradient}`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div className={`text-sm font-medium ${getChangeColor(stat.changeType)}`}>
                {stat.change}
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;