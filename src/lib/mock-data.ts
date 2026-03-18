
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
  distance?: string;
}

export interface BloodBank {
  id: string;
  name: string;
  address: string;
  contact: string;
  availableTypes: BloodGroup[];
  location: { lat: number; lng: number };
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

export const MOCK_DONORS: Donor[] = [
  { id: '1', name: 'Arjun Mehta', phone: '+91 9876543210', email: 'arjun@example.com', bloodGroup: 'O+', city: 'Mumbai', lastDonationDate: '2023-11-15', isAvailable: true, distance: '1.2 km' },
  { id: '2', name: 'Priya Sharma', phone: '+91 9876543211', email: 'priya@example.com', bloodGroup: 'A-', city: 'Delhi', lastDonationDate: '2024-01-20', isAvailable: true, distance: '3.5 km' },
  { id: '3', name: 'Rahul Verma', phone: '+91 9876543212', email: 'rahul@example.com', bloodGroup: 'B+', city: 'Mumbai', lastDonationDate: '2023-09-10', isAvailable: false, distance: '0.8 km' },
  { id: '4', name: 'Ananya Iyer', phone: '+91 9876543213', email: 'ananya@example.com', bloodGroup: 'AB+', city: 'Bangalore', lastDonationDate: '2023-12-05', isAvailable: true, distance: '2.1 km' },
  { id: '5', name: 'Vikram Singh', phone: '+91 9876543214', email: 'vikram@example.com', bloodGroup: 'O-', city: 'Mumbai', lastDonationDate: '2024-02-12', isAvailable: true, distance: '4.7 km' },
];

export const MOCK_BANKS: BloodBank[] = [
  { id: 'b1', name: 'City Central Blood Bank', address: 'MG Road, Mumbai', contact: '022-2345678', availableTypes: ['A+', 'B+', 'O+', 'AB+'], location: { lat: 19.076, lng: 72.877 } },
  { id: 'b2', name: 'Red Cross Society', address: 'Connaught Place, Delhi', contact: '011-2334455', availableTypes: ['A-', 'B-', 'O-', 'AB-'], location: { lat: 28.613, lng: 77.209 } },
  { id: 'b3', name: 'LifeCare Hospital Blood Center', address: 'Indiranagar, Bangalore', contact: '080-4455667', availableTypes: ['A+', 'O+', 'B-'], location: { lat: 12.971, lng: 77.594 } },
];

export const MOCK_REQUESTS: EmergencyRequest[] = [
  { id: 'r1', bloodType: 'O-', units: 3, location: 'Lilavati Hospital, Mumbai', hospital: 'Lilavati Hospital', contact: '+91 9000011111', urgency: 'Critical', createdAt: '2024-03-20T10:00:00Z' },
  { id: 'r2', bloodType: 'AB-', units: 1, location: 'AIIMS, Delhi', hospital: 'AIIMS', contact: '+91 9000022222', urgency: 'Urgent', createdAt: '2024-03-20T11:30:00Z' },
];
