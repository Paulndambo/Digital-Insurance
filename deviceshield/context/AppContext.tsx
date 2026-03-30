import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Policy, Claim, User, Device, AuthCredentials, RegisterData } from '@/types';

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  policies: Policy[];
  claims: Claim[];
  devices: Device[];
  login: (credentials: AuthCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  addPolicy: (policy: Policy) => void;
  addClaim: (claim: Claim) => void;
  addDevice: (device: Device) => void;
  updateClaimStatus: (claimId: string, status: Claim['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock users database (in production, this would be in a backend)
const mockUsersDB = [
  {
    id: '1',
    username: 'johndoe',
    password: 'password123', // In production, this would be hashed
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main St, New York, NY 10001',
    userType: 'customer' as const,
    joinDate: new Date('2024-01-15'),
  },
  {
    id: '2',
    username: 'seller1',
    password: 'seller123',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 234 567 8901',
    userType: 'seller' as const,
    joinDate: new Date('2024-02-20'),
  },
];

const mockDevices: Device[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    serialNumber: 'ABC123456789',
    purchaseDate: new Date('2024-09-15'),
    value: 999,
  },
  {
    id: '2',
    name: 'MacBook Pro',
    brand: 'Apple',
    model: 'MacBook Pro 14"',
    serialNumber: 'MBP987654321',
    purchaseDate: new Date('2024-06-20'),
    value: 1999,
  },
];

const mockPolicies: Policy[] = [
  {
    id: '1',
    deviceId: '1',
    device: mockDevices[0],
    policyNumber: 'POL-2024-001',
    type: 'premium',
    status: 'active',
    startDate: new Date('2024-09-15'),
    endDate: new Date('2025-09-15'),
    premium: 29.99,
    coverage: {
      accidentalDamage: true,
      theft: true,
      liquidDamage: true,
      screenProtection: true,
    },
    claimLimit: 2,
    deductible: 99,
  },
  {
    id: '2',
    deviceId: '2',
    device: mockDevices[1],
    policyNumber: 'POL-2024-002',
    type: 'standard',
    status: 'active',
    startDate: new Date('2024-06-20'),
    endDate: new Date('2025-06-20'),
    premium: 49.99,
    coverage: {
      accidentalDamage: true,
      theft: true,
      liquidDamage: false,
      screenProtection: true,
    },
    claimLimit: 1,
    deductible: 149,
  },
];

const mockClaims: Claim[] = [
  {
    id: '1',
    policyId: '1',
    policy: mockPolicies[0],
    claimNumber: 'CLM-2024-001',
    status: 'approved',
    type: 'damage',
    description: 'Cracked screen from accidental drop',
    dateReported: new Date('2024-11-10'),
    dateOfIncident: new Date('2024-11-08'),
    estimatedCost: 299,
    approvedAmount: 200,
    documents: [],
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);

  const login = async (credentials: AuthCredentials): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsersDB.find(
      u => u.username === credentials.username && u.password === credentials.password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      
      // Load user's data (in production, fetch from API)
      if (foundUser.userType === 'customer') {
        setPolicies(mockPolicies);
        setClaims(mockClaims);
        setDevices(mockDevices);
      }
      
      return true;
    }
    
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if username already exists
    const existingUser = mockUsersDB.find(u => u.username === data.username);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      username: data.username,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      userType: data.userType,
      joinDate: new Date(),
    };

    // In production, save to backend
    mockUsersDB.push({ ...newUser, password: data.password } as any);
    
    setUser(newUser);
    setIsAuthenticated(true);
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setPolicies([]);
    setClaims([]);
    setDevices([]);
  };

  const addPolicy = (policy: Policy) => {
    setPolicies([...policies, policy]);
  };

  const addClaim = (claim: Claim) => {
    setClaims([...claims, claim]);
  };

  const addDevice = (device: Device) => {
    setDevices([...devices, device]);
  };

  const updateClaimStatus = (claimId: string, status: Claim['status']) => {
    setClaims(claims.map(claim => 
      claim.id === claimId ? { ...claim, status } : claim
    ));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        policies,
        claims,
        devices,
        login,
        register,
        logout,
        addPolicy,
        addClaim,
        addDevice,
        updateClaimStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
