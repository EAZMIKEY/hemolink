/**
 * HemoLink Inter-Bank Smart Routing Engine
 * Optimized for finding the best source for blood components.
 */

export interface BloodBankSource {
  id: string;
  name: string;
  distance: number; // km
  stockLevel: number; // units available
  healthScore: number; // 0-100 based on freshness/demand
  travelTime: number; // minutes
}

/**
 * Calculates a routing score (Internal).
 * Lower is better (Cost-based).
 */
function calculateScore(bank: BloodBankSource): number {
  const distanceWeight = 0.5;
  const stockWeight = 0.3;
  const healthWeight = 0.2;

  // Penalty for distance, bonus for high stock and health
  return (bank.distance * distanceWeight) - (bank.stockLevel * stockWeight) - (bank.healthScore * healthWeight);
}

export function rankTransferSources(sources: BloodBankSource[]): BloodBankSource[] {
  return [...sources].sort((a, b) => calculateScore(a) - calculateScore(b));
}

/**
 * Mock data for demonstration.
 */
export const MOCK_ROUTING_SOURCES: BloodBankSource[] = [
  { id: 'BB-001', name: 'National Blood Center (Regional)', distance: 4.2, stockLevel: 85, healthScore: 92, travelTime: 12 },
  { id: 'BB-002', name: 'Noida Red Cross', distance: 12.8, stockLevel: 42, healthScore: 88, travelTime: 28 },
  { id: 'BB-003', name: 'Gurugram Metro Bank', distance: 28.5, stockLevel: 110, healthScore: 95, travelTime: 45 },
  { id: 'BB-004', name: 'Safdarjung Integrated', distance: 1.5, stockLevel: 5, healthScore: 40, travelTime: 5 },
];
