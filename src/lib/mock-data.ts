
import { BloodGroup } from './blood-utils';

export interface Donor {
  id: string;
  name: string;
  phone: string;
  email: string;
  bloodGroup: BloodGroup;
  city: string;
  lastDonationDate: string;
  isAvailable: boolean;
  distance?: number;
}

export interface BloodBank {
  id: string;
  name: string;
  address: string;
  contact: string;
  availableTypes: string[];
  location?: { lat: number; lng: number };
  stockStatus?: string;
  is24x7?: boolean;
  verified?: boolean;
}

export interface EmergencyRequest {
  id: string;
  bloodType: BloodGroup;
  units: number;
  location: string;
  hospital: string;
  contact: string;
  urgency: 'Critical' | 'Urgent' | 'Stable';
  createdAt: string;
}

export const MOCK_DONORS = [
  { 
    id: 'd1', 
    name: 'Rahul Sharma', 
    bloodType: 'A+', 
    location: 'Mumbai Central', 
    distance: 1.2, 
    lastDonated: '2024-11-15', 
    status: 'Available',
    trustScore: 94,
    verified: true,
    aadhaarMasked: 'xxxx-xxxx-8842',
    phone: '+91 98765 43210'
  },
  { 
    id: 'd2', 
    name: 'Priya Patel', 
    bloodType: 'O-', 
    location: 'Andheri West', 
    distance: 4.5, 
    lastDonated: '2023-12-20', 
    status: 'Available',
    trustScore: 88,
    verified: true,
    aadhaarMasked: 'xxxx-xxxx-1234',
    phone: '+91 91234 56789'
  },
  { 
    id: 'd3', 
    name: 'Amit Singh', 
    bloodType: 'B+', 
    location: 'Bandra', 
    distance: 3.8, 
    lastDonated: '2025-01-10', 
    status: 'Busy',
    trustScore: 72,
    verified: false,
    aadhaarMasked: 'xxxx-xxxx-5566',
    phone: '+91 99887 76655'
  },
];

export const MOCK_BANKS = [
  { 
    id: 'b1', 
    name: 'Red Cross Blood Bank', 
    address: 'Near City Hospital, Mumbai', 
    availableTypes: ['A+', 'O+', 'B+', 'AB+'], 
    contact: '+91 22 1234 5678',
    stockStatus: 'stocked',
    is24x7: true,
    verified: true
  },
  { 
    id: 'b2', 
    name: 'LifeLine Blood Center', 
    address: 'Andheri East, Mumbai', 
    availableTypes: ['O-', 'A-', 'B-'], 
    contact: '+91 22 8765 4321',
    stockStatus: 'low',
    is24x7: true,
    verified: true
  },
  { 
    id: 'b3', 
    name: 'Government General Bank', 
    address: 'Dadar, Mumbai', 
    availableTypes: ['All Groups'], 
    contact: '+91 22 5555 4444',
    stockStatus: 'critical',
    is24x7: false,
    verified: true
  },
];

const now = new Date();
export const MOCK_REQUESTS: EmergencyRequest[] = [
  { 
    id: 'r1', 
    bloodType: 'O-', 
    units: 3, 
    location: 'Lilavati Hospital, Mumbai', 
    hospital: 'Lilavati Hospital', 
    contact: '+91 9000011111', 
    urgency: 'Critical', 
    createdAt: new Date(now.getTime() - 15 * 60000).toISOString() 
  },
  { 
    id: 'r2', 
    bloodType: 'AB-', 
    units: 1, 
    location: 'AIIMS, Delhi', 
    hospital: 'AIIMS', 
    contact: '+91 9000022222', 
    urgency: 'Urgent', 
    createdAt: new Date(now.getTime() - 125 * 60000).toISOString() 
  },
];
