
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
  stockStatus?: 'stocked' | 'low' | 'critical' | string;
  is24x7?: boolean;
  verified?: boolean;
  city?: string;
  distance?: number;
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

export const CITY_COORDINATES: Record<string, [number, number]> = {
  mumbai: [19.0760, 72.8777],
  delhi: [28.6139, 77.2090],
  bangalore: [12.9716, 77.5946],
  bengaluru: [12.9716, 77.5946],
  'greater noida': [28.4744, 77.5040],
  noida: [28.5355, 77.3910],
  chandigarh: [30.7333, 76.7794],
};

export const MOCK_BANKS: BloodBank[] = [
  // Mumbai
  { 
    id: 'b1', 
    name: 'Red Cross Blood Bank', 
    address: 'Near City Hospital, Mumbai', 
    city: 'Mumbai',
    contact: '+91 22 1234 5678',
    availableTypes: ['A+', 'O+', 'B+', 'AB+'], 
    location: { lat: 18.9322, lng: 72.8335 },
    stockStatus: 'stocked',
    is24x7: true,
    verified: true,
    distance: 1.2
  },
  { 
    id: 'b2', 
    name: 'LifeLine Blood Center', 
    address: 'Andheri East, Mumbai', 
    city: 'Mumbai',
    contact: '+91 22 8765 4321',
    availableTypes: ['O-', 'A-', 'B-'], 
    location: { lat: 19.1197, lng: 72.8664 },
    stockStatus: 'low',
    is24x7: true,
    verified: true,
    distance: 2.8
  },
  { 
    id: 'b3', 
    name: 'Government General Bank', 
    address: 'Dadar, Mumbai', 
    city: 'Mumbai',
    contact: '+91 22 5555 4444',
    availableTypes: ['A+', 'B+', 'O+', 'AB+'], 
    location: { lat: 19.0178, lng: 72.8478 },
    stockStatus: 'critical',
    is24x7: false,
    verified: true,
    distance: 4.1
  },
  { 
    id: 'b4', 
    name: 'Tata Memorial Blood Bank', 
    address: 'Parel, Mumbai', 
    city: 'Mumbai',
    contact: '+91 22 2417 7000',
    availableTypes: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], 
    location: { lat: 19.0048, lng: 72.8427 },
    stockStatus: 'stocked',
    is24x7: true,
    verified: true,
    distance: 5.3
  },
  // Delhi
  { 
    id: 'b5', 
    name: 'AIIMS Central Blood Center', 
    address: 'Ansari Nagar, New Delhi', 
    city: 'Delhi',
    contact: '+91 11 2658 8500',
    availableTypes: ['A+', 'B+', 'O+', 'AB+', 'O-', 'A-'], 
    location: { lat: 28.5672, lng: 77.2100 },
    stockStatus: 'stocked',
    is24x7: true,
    verified: true,
    distance: 3.5
  },
  { 
    id: 'b6', 
    name: 'Red Cross National Blood Bank', 
    address: '1 Red Cross Rd, New Delhi', 
    city: 'Delhi',
    contact: '+91 11 2371 6441',
    availableTypes: ['A+', 'O+', 'B+', 'AB+'], 
    location: { lat: 28.6219, lng: 77.2075 },
    stockStatus: 'stocked',
    is24x7: true,
    verified: true,
    distance: 2.1
  },
  { 
    id: 'b7', 
    name: 'Safdarjung Blood Center', 
    address: 'Ring Road, New Delhi', 
    city: 'Delhi',
    contact: '+91 11 2616 5060',
    availableTypes: ['O-', 'B-', 'AB-'], 
    location: { lat: 28.5700, lng: 77.2070 },
    stockStatus: 'low',
    is24x7: true,
    verified: true,
    distance: 4.0
  },
  // Bangalore
  { 
    id: 'b8', 
    name: 'Victoria Hospital Blood Bank', 
    address: 'Fort Road, Bangalore', 
    city: 'Bangalore',
    contact: '+91 80 2670 1150',
    availableTypes: ['A+', 'B+', 'O+', 'AB+'], 
    location: { lat: 12.9634, lng: 77.5750 },
    stockStatus: 'stocked',
    is24x7: true,
    verified: true,
    distance: 1.8
  },
  { 
    id: 'b9', 
    name: 'Rashtrotthana Blood Centre', 
    address: 'Jayanagar, Bangalore', 
    city: 'Bangalore',
    contact: '+91 80 2663 7111',
    availableTypes: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-'], 
    location: { lat: 12.9352, lng: 77.5810 },
    stockStatus: 'stocked',
    is24x7: true,
    verified: true,
    distance: 3.2
  },
  { 
    id: 'b10', 
    name: 'Manipal Hospital Blood Bank', 
    address: 'Old Airport Rd, Bangalore', 
    city: 'Bangalore',
    contact: '+91 80 2502 4444',
    availableTypes: ['O-', 'AB-'], 
    location: { lat: 12.9584, lng: 77.6480 },
    stockStatus: 'low',
    is24x7: true,
    verified: true,
    distance: 6.4
  },
  // Greater Noida
  { 
    id: 'b11', 
    name: 'Sharda Hospital Blood Bank', 
    address: 'Knowledge Park III, Greater Noida', 
    city: 'Greater Noida',
    contact: '+91 120 232 9700',
    availableTypes: ['A+', 'B+', 'O+', 'AB+'], 
    location: { lat: 28.4732, lng: 77.4830 },
    stockStatus: 'stocked',
    is24x7: true,
    verified: true,
    distance: 2.5
  },
  { 
    id: 'b12', 
    name: 'Kailash Hospital Blood Bank', 
    address: 'Alpha 1, Greater Noida', 
    city: 'Greater Noida',
    contact: '+91 120 232 7799',
    availableTypes: ['O+', 'A+', 'B+'], 
    location: { lat: 28.4680, lng: 77.5120 },
    stockStatus: 'low',
    is24x7: false,
    verified: true,
    distance: 4.8
  },
  // Chandigarh
  { 
    id: 'b13', 
    name: 'PGIMER Blood Bank', 
    address: 'Sector 12, Chandigarh', 
    city: 'Chandigarh',
    contact: '+91 172 274 7585',
    availableTypes: ['A+', 'B+', 'O+', 'AB+', 'O-', 'A-'], 
    location: { lat: 30.7650, lng: 76.7740 },
    stockStatus: 'stocked',
    is24x7: true,
    verified: true,
    distance: 2.0
  },
  { 
    id: 'b14', 
    name: 'Rotary Blood Bank Resource Centre', 
    address: 'Sector 37, Chandigarh', 
    city: 'Chandigarh',
    contact: '+91 172 269 3131',
    availableTypes: ['A+', 'B+', 'O+'], 
    location: { lat: 30.7225, lng: 76.7760 },
    stockStatus: 'stocked',
    is24x7: true,
    verified: true,
    distance: 3.7
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
