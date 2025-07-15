export interface User {
  id: string;
  email: string;
  name: string;
  role: 'citizen' | 'hospital' | 'admin';
  verified: boolean;
  createdAt: Date;
  // Citizen-specific fields
  phoneNumber?: string;
  emergencyContacts?: EmergencyContact[];
  medicalProfile?: MedicalProfile;
  // Hospital-specific fields
  hospitalName?: string;
  hospitalId?: string;
  department?: string;
  licenseNumber?: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface MedicalProfile {
  bloodGroup: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  notes: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'citizen' | 'hospital';
  phoneNumber?: string;
  hospitalName?: string;
  department?: string;
  licenseNumber?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}