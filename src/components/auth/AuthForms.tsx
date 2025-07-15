import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  User, 
  Building2, 
  Mail, 
  Lock, 
  Phone, 
  FileText,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { RegisterData } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";

interface AuthFormsProps {
  onClose?: () => void;
}

export function AuthForms({ onClose }: AuthFormsProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const { login, register } = useAuth();
  const { toast } = useToast();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Register form state
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    password: "",
    name: "",
    role: "citizen",
    phoneNumber: "",
    hospitalName: "",
    department: "",
    licenseNumber: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(loginData.email, loginData.password);
      if (result.success) {
        toast({
          title: "✅ Login Successful",
          description: "Welcome back to EmergencyAid!",
        });
        onClose?.();
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await register(registerData);
      if (result.success) {
        setSuccess("Registration successful! Please check your email for verification.");
        toast({
          title: "🎉 Registration Successful",
          description: "Please check your email for verification.",
        });
        setTimeout(() => {
          setActiveTab("login");
          setSuccess("");
        }, 2000);
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getDemoCredentials = () => {
    return [
      { email: "citizen@test.com", password: "password", role: "Citizen" },
      { email: "hospital@test.com", password: "password", role: "Hospital Staff" }
    ];
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Demo Credentials */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <span>Demo Credentials</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {getDemoCredentials().map((cred, index) => (
            <div key={index} className="text-xs space-y-1">
              <Badge variant="outline" className="text-xs">{cred.role}</Badge>
              <div className="font-mono text-xs">
                <div>{cred.email}</div>
                <div>{cred.password}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-8 w-8 text-emergency" />
          </div>
          <CardTitle>EmergencyAid</CardTitle>
          <CardDescription>
            Sign in to access emergency services and community aid
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>

            {/* Error/Success Messages */}
            {error && (
              <Alert className="mt-4 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mt-4 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4 mt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  variant="medical"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-center">
                  <Button variant="link" className="text-sm">
                    Forgot your password?
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4 mt-4">
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={registerData.role === "citizen" ? "medical" : "outline"}
                      onClick={() => setRegisterData(prev => ({ ...prev, role: "citizen" }))}
                      className="flex items-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span>Citizen</span>
                    </Button>
                    <Button
                      type="button"
                      variant={registerData.role === "hospital" ? "medical" : "outline"}
                      onClick={() => setRegisterData(prev => ({ ...prev, role: "hospital" }))}
                      className="flex items-center space-x-2"
                    >
                      <Building2 className="h-4 w-4" />
                      <span>Hospital</span>
                    </Button>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                      value={registerData.name}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long
                  </p>
                </div>

                {/* Role-specific fields */}
                {registerData.role === "citizen" && (
                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="+1-555-0123"
                        value={registerData.phoneNumber}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                {registerData.role === "hospital" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-hospital">Hospital Name</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-hospital"
                          type="text"
                          placeholder="City General Hospital"
                          value={registerData.hospitalName}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, hospitalName: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-department">Department</Label>
                      <Input
                        id="register-department"
                        type="text"
                        placeholder="Emergency Medicine"
                        value={registerData.department}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, department: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-license">License Number</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-license"
                          type="text"
                          placeholder="Medical License #"
                          value={registerData.licenseNumber}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  variant="community"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}