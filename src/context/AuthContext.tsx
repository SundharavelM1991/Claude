import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Child } from '../types';

interface AuthContextType {
  user: User | null;
  children: Child[];
  selectedChild: Child | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  selectChild: (child: Child) => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  relationship: 'mother' | 'father' | 'guardian';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: 'user_1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 234-5678',
  relationship: 'mother',
  avatar: 'https://i.pravatar.cc/150?img=47',
};

const MOCK_CHILDREN: Child[] = [
  {
    id: 'child_1',
    name: 'Emma Johnson',
    dateOfBirth: '2020-03-15',
    age: 4,
    avatar: 'https://i.pravatar.cc/150?img=44',
    classroom: 'Sunshine Room',
    teacher: 'Ms. Patricia Williams',
    enrollmentDate: '2023-09-01',
    allergies: ['Peanuts', 'Tree nuts'],
    medicalNotes: 'Has mild asthma. Inhaler kept at the office.',
    emergencyContacts: [
      { name: 'David Johnson', relationship: 'Father', phone: '+1 (555) 345-6789' },
      { name: 'Mary Smith', relationship: 'Grandmother', phone: '+1 (555) 456-7890' },
    ],
  },
  {
    id: 'child_2',
    name: 'Liam Johnson',
    dateOfBirth: '2022-07-22',
    age: 2,
    avatar: 'https://i.pravatar.cc/150?img=52',
    classroom: 'Rainbow Room',
    teacher: 'Ms. Angela Davis',
    enrollmentDate: '2024-01-15',
    allergies: [],
    medicalNotes: '',
    emergencyContacts: [
      { name: 'David Johnson', relationship: 'Father', phone: '+1 (555) 345-6789' },
    ],
  },
];

export function AuthProvider({ children: reactChildren }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        setUser(MOCK_USER);
        setChildren(MOCK_CHILDREN);
        setSelectedChild(MOCK_CHILDREN[0]);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, _password: string) {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (email && _password) {
        await AsyncStorage.setItem('auth_token', 'mock_token_12345');
        setUser(MOCK_USER);
        setChildren(MOCK_CHILDREN);
        setSelectedChild(MOCK_CHILDREN[0]);
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function register(data: RegisterData) {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const newUser: User = {
        id: 'user_new',
        name: data.name,
        email: data.email,
        phone: data.phone,
        relationship: data.relationship,
      };
      await AsyncStorage.setItem('auth_token', 'mock_token_new');
      setUser(newUser);
      setChildren([]);
      setSelectedChild(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    await AsyncStorage.removeItem('auth_token');
    setUser(null);
    setChildren([]);
    setSelectedChild(null);
  }

  function selectChild(child: Child) {
    setSelectedChild(child);
  }

  async function updateProfile(data: Partial<User>) {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        children,
        selectedChild,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        selectChild,
        updateProfile,
      }}
    >
      {reactChildren}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
