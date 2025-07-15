import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { EmergencyButton } from "@/components/EmergencyButton";
import { MedicalProfile } from "@/components/MedicalProfile";
import { HospitalDashboard } from "@/components/HospitalDashboard";
import { CommunityAid } from "@/components/CommunityAid";
import { EmergencyHistory } from "@/components/EmergencyHistory";
import { AuthForms } from "@/components/auth/AuthForms";
import { UserProfile } from "@/components/auth/UserProfile";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, MapPin, Clock, Phone, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [currentPage, setCurrentPage] = useState('emergency');
  const [emergencyData, setEmergencyData] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const handleEmergencyTriggered = (data: { location: string; timestamp: Date; type: string }) => {
    setEmergencyData(data);
  };

  const handleShowAuth = () => {
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  const renderCurrentPage = () => {
    // Show auth forms if requested
    if (showAuth) {
      return (
        <div className="max-w-md mx-auto">
          <AuthForms onClose={handleCloseAuth} />
        </div>
      );
    }

    // Handle authenticated routes
    if (isAuthenticated && user) {
      if (user.role === 'hospital') {
        switch (currentPage) {
          case 'dashboard':
            return <HospitalDashboard />;
          case 'community':
            return <CommunityAid />;
          case 'account':
            return <UserProfile />;
          default:
            return <HospitalDashboard />;
        }
      }

      // Citizen role pages
      switch (currentPage) {
        case 'emergency':
          return (
            <div className="space-y-6">
              {/* Emergency Status */}
              {emergencyData && (
                <Card className="border-emergency bg-emergency-muted">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-emergency">
                      <Shield className="h-5 w-5" />
                      <span>Active Emergency Alert</span>
                    </CardTitle>
                    <CardDescription>
                      Emergency services have been notified and are responding
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-medium">{emergencyData.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{emergencyData.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Badge variant="outline" className="w-fit">
                          {emergencyData.type}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm">Emergency: 911</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <EmergencyButton onEmergencyTriggered={handleEmergencyTriggered} />
            </div>
          );
        case 'profile':
          return (
            <ProtectedRoute requiredRole="citizen">
              <MedicalProfile />
            </ProtectedRoute>
          );
        case 'community':
          return <CommunityAid />;
        case 'history':
          return (
            <ProtectedRoute requiredRole="citizen">
              <EmergencyHistory />
            </ProtectedRoute>
          );
        case 'account':
          return <UserProfile />;
        default:
          return (
            <div className="space-y-6">
              <EmergencyButton onEmergencyTriggered={handleEmergencyTriggered} />
            </div>
          );
      }
    }

    // Public pages (not authenticated)
    switch (currentPage) {
      case 'emergency':
        return (
          <div className="space-y-6">
            {/* Authentication Required Alert for Emergency Features */}
            <Alert className="border-blue-200 bg-blue-50">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Authentication Required:</strong> For full emergency response features including medical profile sharing and emergency contacts, please{" "}
                <button 
                  onClick={handleShowAuth}
                  className="underline font-medium hover:text-blue-900"
                >
                  sign in or create an account
                </button>.
              </AlertDescription>
            </Alert>

            {/* Basic Emergency Button (limited functionality) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-emergency" />
                  <span>Emergency Alert (Demo Mode)</span>
                </CardTitle>
                <CardDescription>
                  Limited emergency features available without authentication.
                  Sign in for full medical profile integration and emergency contacts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmergencyButton onEmergencyTriggered={handleEmergencyTriggered} />
              </CardContent>
            </Card>
          </div>
        );
      case 'community':
        return (
          <div className="space-y-6">
            {/* Public Community Aid with Limited Features */}
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Limited Access:</strong> You can view community aid requests, but creating requests or volunteering requires{" "}
                <button 
                  onClick={handleShowAuth}
                  className="underline font-medium hover:text-yellow-900"
                >
                  authentication
                </button>.
              </AlertDescription>
            </Alert>
            <CommunityAid />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Welcome to EmergencyAid</h2>
              <p className="text-muted-foreground mb-6">
                A comprehensive emergency response and community aid platform
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={handleShowAuth}
                  className="text-medical underline font-medium"
                >
                  Sign in to access all features
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onShowAuth={handleShowAuth}
      />
      
      <main className="container mx-auto p-4">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default Index;
