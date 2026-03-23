export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type StockStatus = "stocked" | "low" | "critical";

export interface UnifiedBloodBank {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contact: string;
  latitude: number;
  longitude: number;
  is24x7: boolean;
  stock: Record<BloodGroup, {
    units: number;
    status: StockStatus;
    lastUpdated: string;
  }>;
  verified: boolean;
  type: "Government" | "Private" | "Charity";
}

export interface ERaktKoshResponse {
  // Mocking the structure of e-RaktKosh API response
  hospitalName: string;
  location: {
    lat: number;
    lng: number;
    fullAddress: string;
  };
  bloodAvailability: Array<{
    group: string;
    stockCount: number;
    updatedAt: string;
  }>;
}

export const BLOOD_GROUPS: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
