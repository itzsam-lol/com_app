import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Shield, 
  LogOut,
  Edit,
  Settings,
  Calendar,
  Verified
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthForms } from "@/components/auth/AuthForms";

interface UserProfileProps {
  showAuthForms?: boolean;
}

export function UserProfile({ showAuthForms = false }: UserProfileProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = useState(showAuthForms);

  if (!isAuthenticated || !user) {
    if (showAuth) {
      return (
        <div className="max-w-md mx-auto">
          <AuthForms onClose={() => setShowAuth(false)} />
        </div>
      );
    }
    
    return (
      <div className="text-center space-y-4">
        <div className="text-muted-foreground">Please sign in to view your profile</div>
        <Button onClick={() => setShowAuth(true)} variant="medical">
          Sign In
        </Button>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'citizen': return 'emergency';
      case 'hospital': return 'medical';
      case 'admin': return 'community';
      default: return 'default';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  {user.verified && (
                    <Verified className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant={getRoleColor(user.role) as any} className="capitalize">
                    {user.role}
                  </Badge>
                  {user.role === 'hospital' && user.department && (
                    <Badge variant="outline" className="text-xs">
                      {user.department}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {formatDate(user.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Contact Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Email</span>
              </div>
              <div className="text-sm">{user.email}</div>
            </div>

            {user.phoneNumber && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                <div className="text-sm">{user.phoneNumber}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Role-specific Information */}
      {user.role === 'hospital' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Hospital Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.hospitalName && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Hospital</div>
                  <div className="text-sm">{user.hospitalName}</div>
                </div>
              )}

              {user.department && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Department</div>
                  <div className="text-sm">{user.department}</div>
                </div>
              )}

              {user.licenseNumber && (
                <div className="space-y-2 md:col-span-2">
                  <div className="text-sm font-medium">License Number</div>
                  <div className="text-sm font-mono">{user.licenseNumber}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Account Settings</span>
          </CardTitle>
          <CardDescription>
            Manage your account preferences and security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="h-4 w-4 mr-2" />
              Update Email
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Privacy Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}