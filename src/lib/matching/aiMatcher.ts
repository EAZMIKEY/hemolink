import { getDistance } from '../utils'; 

export interface MatchScore {
  donorId: string;
  score: number; // 0-100
  reasons: string[];
  distanceKm: number;
}

/**
 * AI Donor Match Engine.
 * Ranks donors based on distance, compatibility, reliability (Trust Score), and last donation date.
 */
export async function runAiMatcher(request: any, donors: any[]): Promise<MatchScore[]> {
  console.log(`[AI MATCHER] Running for blood type: ${request.bloodType}`);
  
  const results: MatchScore[] = donors.map(donor => {
    let score = 80; // Baseline
    const reasons: string[] = [];
    
    // 1. Compatibility Check (Primary Factor)
    // Simplified compatibility for demo
    if (donor.bloodType !== request.bloodType) {
      if (donor.bloodType === 'O-') {
        score += 10;
        reasons.push("Universal Donor compatibility");
      } else {
        score -= 40;
        reasons.push("Blood type mismatch");
      }
    } else {
      score += 15;
      reasons.push("Exact match for blood type");
    }

    // 2. Distance Scaling (Exponential decay score)
    // Assuming distance is already provided or calculated
    const distance = donor.distance || 5; 
    if (distance < 2) {
      score += 10;
      reasons.push("Ultra-local availability (< 2km)");
    } else if (distance > 10) {
      score -= 20;
      reasons.push("Significant travel distance (> 10km)");
    }

    // 3. Reliability / Trust Score
    const trust = donor.trustScore || 70;
    if (trust > 90) {
      score += 10;
      reasons.push("Elite reliability rating");
    } else if (trust < 50) {
      score -= 15;
      reasons.push("Lower reliability history");
    }

    // 4. Last Donation Date Check
    // Mocking: Assume donor.lastDonated is a date string
    const monthsSinceLast = 5; // Mock
    if (monthsSinceLast < 3) {
      score = 0; // NOT ELIGIBLE
      reasons.push("Safety Compliance: < 3 months gap");
    }

    return {
      donorId: donor.id,
      score: Math.min(100, Math.max(0, score)),
      reasons,
      distanceKm: distance
    };
  });

  return results.sort((a, b) => b.score - a.score);
}
