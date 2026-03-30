export interface Device {
  id: string;
  name: string;
  brand: string;
  model: string;
  serialNumber?: string;
  purchaseDate: Date;
  value: number;
}

export interface Policy {
  id: string;
  deviceId: string;
  device: Device;
  policyNumber: string;
  type: 'basic' | 'standard' | 'premium';
  status: 'active' | 'expired' | 'cancelled';
  startDate: Date;
  endDate: Date;
  premium: number;
  coverage: {
    accidentalDamage: boolean;
    theft: boolean;
    liquidDamage: boolean;
    screenProtection: boolean;
  };
  claimLimit: number;
  deductible: number;
}

export interface Claim {
  id: string;
  policyId: string;
  policy: Policy;
  claimNumber: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  type: 'damage' | 'theft' | 'malfunction' | 'other';
  description: string;
  dateReported: Date;
  dateOfIncident: Date;
  estimatedCost?: number;
  approvedAmount?: number;
  documents: string[];
}

export type UserType = 'customer' | 'seller' | 'repair' | 'seller_repair';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  userType: UserType;
  joinDate: Date;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  gender: 'male' | 'female' | 'other';
  userType: UserType;
  confirmPassword: string;
}

export interface PolicyPlan {
  id: string;
  name: string;
  type: 'basic' | 'standard' | 'premium';
  /** Percentage of each device value used as monthly premium (matches backend gadget pricing). */
  coverPercentage: number;
  monthlyPremium: number;
  annualPremium: number;
  coverage: {
    accidentalDamage: boolean;
    theft: boolean;
    liquidDamage: boolean;
    screenProtection: boolean;
  };
  claimLimit: number;
  deductible: number;
  features: string[];
}

export interface QuickMetric {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

export interface QuickAction {
  label: string;
  icon: string;
  color: string;
  route: string;
}
