import Header from "@/components/layout/Header";
import SupabaseTest from "@/components/SupabaseTest";
import { useAuth } from "@/auth/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SupabaseTestPage = () => {
  const { user, authProvider } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🗄️ Supabase PostgreSQL Integration
              </CardTitle>
              <CardDescription>
                Test and manage your Supabase database connection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current User:</p>
                  <p className="font-medium">{user?.name || 'Not logged in'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Auth Provider:</p>
                  <Badge variant={authProvider === 'supabase' ? 'default' : 'secondary'}>
                    {authProvider?.toUpperCase() || 'UNKNOWN'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supabase Test Component */}
          <SupabaseTest />

          {/* Database Schema Info */}
          <Card>
            <CardHeader>
              <CardTitle>Database Schema</CardTitle>
              <CardDescription>
                Your Supabase database includes the following tables:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">👥 Users</h4>
                  <p className="text-sm text-muted-foreground">
                    Store user profiles with roles (admin, doctor, patient, hospital)
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📅 Appointments</h4>
                  <p className="text-sm text-muted-foreground">
                    Manage patient appointments with doctors
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🏥 Medical History</h4>
                  <p className="text-sm text-muted-foreground">
                    Track patient medical records and diagnoses
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connection Details */}
          <Card>
            <CardHeader>
              <CardTitle>Connection Details</CardTitle>
              <CardDescription>
                Your Supabase project configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Project URL:</span>
                  <code className="ml-2 bg-gray-100 px-2 py-1 rounded">
                    https://cjcptchnnqrijqfofoju.supabase.co
                  </code>
                </div>
                <div>
                  <span className="font-medium">Database URL:</span>
                  <code className="ml-2 bg-gray-100 px-2 py-1 rounded">
                    postgresql://postgres:[YOUR-PASSWORD]@db.cjcptchnnqrijqfofoju.supabase.co:5432/postgres
                  </code>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <Badge variant="outline" className="ml-2">
                    Ready for Integration
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupabaseTestPage;
