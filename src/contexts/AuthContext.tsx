import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, RegisterData } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API functions - replace with actual API calls
const api = {
  async login(email: string, password: string) {
    // TODO: Replace with actual API call
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error };
    } catch (error) {
      // Mock implementation for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'citizen@test.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          email: 'citizen@test.com',
          name: 'John Doe',
          role: 'citizen',
          verified: true,
          createdAt: new Date(),
          phoneNumber: '+1-555-0123'
        };
        localStorage.setItem('token', 'mock-token-citizen');
        return { success: true, user: mockUser };
      } else if (email === 'hospital@test.com' && password === 'password') {
        const mockUser: User = {
          id: '2',
          email: 'hospital@test.com',
          name: 'Dr. Sarah Johnson',
          role: 'hospital',
          verified: true,
          createdAt: new Date(),
          hospitalName: 'City General Hospital',
          department: 'Emergency Medicine'
        };
        localStorage.setItem('token', 'mock-token-hospital');
        return { success: true, user: mockUser };
      }
      return { success: false, error: 'Invalid credentials' };
    }
  },

  async register(userData: RegisterData) {
    // TODO: Replace with actual API call
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      // Mock implementation for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Registration successful. Please check your email for verification.' };
    }
  },

  async getCurrentUser() {
    // TODO: Replace with actual API call
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      return data.success ? data.user : null;
    } catch (error) {
      // Mock implementation for demo
      const token = localStorage.getItem('token');
      if (token === 'mock-token-citizen') {
        return {
          id: '1',
          email: 'citizen@test.com',
          name: 'John Doe',
          role: 'citizen',
          verified: true,
          createdAt: new Date(),
          phoneNumber: '+1-555-0123'
        };
      } else if (token === 'mock-token-hospital') {
        return {
          id: '2',
          email: 'hospital@test.com',
          name: 'Dr. Sarah Johnson',
          role: 'hospital',
          verified: true,
          createdAt: new Date(),
          hospitalName: 'City General Hospital',
          department: 'Emergency Medicine'
        };
      }
      return null;
    }
  },

  async logout() {
    // TODO: Replace with actual API call
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      // Mock implementation
    } finally {
      localStorage.removeItem('token');
    }
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      try {
        const currentUser = await api.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await api.login(email, password);
      if (result.success && result.user) {
        setUser(result.user);
        return { success: true };
      }
      return { success: false, error: result.error || 'Login failed' };
    } catch (error) {
      return { success: false, error: 'Network error' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const result = await api.register(userData);
      return result;
    } catch (error) {
      return { success: false, error: 'Network error' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    // TODO: Implement profile update
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      
      if (result.success) {
        setUser(prev => prev ? { ...prev, ...data } : null);
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}