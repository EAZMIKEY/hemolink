import { UnifiedBloodBank, BloodGroup, StockStatus } from './unified-blood-model';

/**
 * Professional wrapper for fetching blood stock across the network.
 * Ready to be connected to e-RaktKosh / UHI / Private APIs.
 */
export async function getLiveBloodStock(bankId?: string): Promise<UnifiedBloodBank[]> {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock data for the national integration demo
  const mockStock: UnifiedBloodBank[] = [
    {
      id: "gov-mumbai-central",
      name: "Mumbai Central Govt Blood Bank",
      address: "M.C. Road, Downtown Mumbai",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      contact: "+91 22 2345 6789",
      latitude: 19.0760,
      longitude: 72.8777,
      is24x7: true,
      verified: true,
      type: "Government",
      stock: {
        "A+": { units: 25, status: "stocked", lastUpdated: new Date().toISOString() },
        "A-": { units: 4, status: "critical", lastUpdated: new Date().toISOString() },
        "B+": { units: 40, status: "stocked", lastUpdated: new Date().toISOString() },
        "B-": { units: 12, status: "low", lastUpdated: new Date().toISOString() },
        "AB+": { units: 10, status: "low", lastUpdated: new Date().toISOString() },
        "AB-": { units: 2, status: "critical", lastUpdated: new Date().toISOString() },
        "O+": { units: 50, status: "stocked", lastUpdated: new Date().toISOString() },
        "O-": { units: 1, status: "critical", lastUpdated: new Date().toISOString() },
      }
    }
  ];

  if (bankId) {
    return mockStock.filter(b => b.id === bankId);
  }

  return mockStock;
}
