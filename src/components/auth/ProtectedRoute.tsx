import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthForms } from '@/components/auth/AuthForms';
import { Loader2, Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'citizen' | 'hospital' | 'admin';
  fallback?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallback 
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-medical" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth forms if not authenticated
  if (!isAuthenticated || !user) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <AuthForms />
      </div>
    );
  }

  // Check role-based access
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center space-y-4 max-w-md">
          <Shield className="h-12 w-12 mx-auto text-emergency" />
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">
            You don't have permission to access this page. 
            {requiredRole === 'hospital' && (
              <span className="block mt-2">
                This page is restricted to hospital staff only.
              </span>
            )}
            {requiredRole === 'citizen' && (
              <span className="block mt-2">
                This page is for registered citizens only.
              </span>
            )}
          </p>
          <p className="text-sm">
            Current role: <strong className="capitalize">{user.role}</strong>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}