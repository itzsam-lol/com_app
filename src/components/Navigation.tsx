import { useState } from "react";
import { 
  Phone, 
  Heart, 
  Building2, 
  Users, 
  History,
  Menu,
  X,
  Shield,
  User,
  LogOut,
  LogIn,
  Settings,
  UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onShowAuth: () => void;
}

export function Navigation({ currentPage, onPageChange, onShowAuth }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  const citizenPages = [
    { id: 'emergency', label: 'Emergency', icon: Phone },
    { id: 'profile', label: 'Medical Profile', icon: Heart },
    { id: 'community', label: 'Community Aid', icon: Users },
    { id: 'history', label: 'History', icon: History },
    { id: 'account', label: 'Account', icon: UserCircle },
  ];

  const hospitalPages = [
    { id: 'dashboard', label: 'Dashboard', icon: Building2 },
    { id: 'community', label: 'Community Requests', icon: Users },
    { id: 'account', label: 'Account', icon: UserCircle },
  ];

  const publicPages = [
    { id: 'emergency', label: 'Emergency', icon: Phone },
    { id: 'community', label: 'Community Aid', icon: Users },
  ];

  const getPages = () => {
    if (!user) return publicPages;
    return citizenPages;
  };

  const pages = getPages();

  const getRoleColor = () => 'emergency';

  const handleLogout = async () => {
    await signOutUser();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isAuthenticated = !!user;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between p-4 bg-background border-b">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/index')}>
            <Shield className="h-8 w-8 text-emergency" />
            <div>
              <h1 className="text-xl font-bold">EmergencyAid</h1>
              <p className="text-xs text-muted-foreground">Community Response Platform</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            {pages.map((page) => {
              const Icon = page.icon;
              const isActive = currentPage === page.id;
              // Skip account page if not authenticated
              if (page.id === 'account' && !user) return null;
              return (
                <Button
                  key={page.id}
                  variant={isActive ? getRoleColor() as any : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(page.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{page.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-2">
          {user ? (
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0" onClick={() => navigate('/profile')}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {getInitials(user.displayName)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName || user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onPageChange('account')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button variant="medical" onClick={onShowAuth}>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/index')}>
            <Shield className="h-6 w-6 text-emergency" />
            <div>
              <h1 className="text-lg font-bold">EmergencyAid</h1>
              {user && (
                <Badge variant="outline" className="text-xs hidden">User</Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {user && (
              <Button variant="ghost" className="p-0 h-8 w-8 rounded-full" onClick={() => navigate('/profile')}>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {getInitials(user.displayName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t bg-background p-4 space-y-3">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-muted-foreground">Navigation</div>
              {pages.map((page) => {
                const Icon = page.icon;
                const isActive = currentPage === page.id;
                // Skip account page if not authenticated
                if (page.id === 'account' && !user) return null;
                return (
                  <Button
                    key={page.id}
                    variant={isActive ? getRoleColor() as any : "ghost"}
                    size="sm"
                    onClick={() => {
                      onPageChange(page.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {page.label}
                  </Button>
                );
              })}
            </div>

            {/* Authentication Section */}
            <div className="border-t pt-3 space-y-2">
              {user ? (
                <>
                  <div className="text-sm font-semibold text-muted-foreground">Account</div>
                  <div className="text-sm text-muted-foreground">
                    Signed in as <strong>{user.displayName || user.email}</strong>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-sm font-semibold text-muted-foreground">Authentication</div>
                  <Button
                    variant="medical"
                    size="sm"
                    onClick={() => {
                      onShowAuth();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}