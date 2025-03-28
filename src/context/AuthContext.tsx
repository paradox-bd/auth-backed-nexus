
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  department: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: { name: string; email: string; password: string; role: 'student' | 'faculty' }) => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@ece-hstu.edu',
    password: 'admin123',
    role: 'admin',
    department: 'ECE'
  },
  {
    id: '2',
    name: 'Faculty Member',
    email: 'faculty@ece-hstu.edu',
    password: 'faculty123',
    role: 'faculty',
    department: 'ECE'
  },
  {
    id: '3',
    name: 'Student User',
    email: 'student@ece-hstu.edu',
    password: 'student123',
    role: 'student',
    department: 'ECE'
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const register = async (userData: { name: string; email: string; password: string; role: 'student' | 'faculty' }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (mockUsers.some(u => u.email === userData.email)) {
        throw new Error('Email already in use');
      }
      
      const newUser = {
        id: (mockUsers.length + 1).toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        department: 'ECE'
      };
      
      // In a real app, we would save to the database
      mockUsers.push(newUser);
      
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${userData.name}!`,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      register, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
