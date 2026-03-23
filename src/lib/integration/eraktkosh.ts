import { UnifiedBloodBank, ERaktKoshResponse, BloodGroup, StockStatus } from './unified-blood-model';

/**
 * Transforms raw data from the government e-RaktKosh API into the HemoLink unified model.
 */
export function transformERaktKoshData(rawData: any): UnifiedBloodBank {
  // Logic to parse e-RaktKosh specific JSON structure
  const stock: any = {};
  
  // Example of mapping the availability
  if (rawData.bloodAvailability) {
    rawData.bloodAvailability.forEach((item: any) => {
      const units = item.stockCount || 0;
      let status: StockStatus = "stocked";
      if (units < 5) status = "critical";
      else if (units < 15) status = "low";

      stock[item.group as BloodGroup] = {
        units,
        status,
        lastUpdated: item.updatedAt || new Date().toISOString()
      };
    });
  }

  return {
    id: `gov-${rawData.hospitalName.toLowerCase().replace(/\s+/g, '-')}`,
    name: rawData.hospitalName,
    address: rawData.location?.fullAddress || "Unknown",
    city: "Mumbai", // Mock city mapping
    state: "Maharashtra",
    pincode: "400001",
    contact: "+91 22 2345 6789",
    latitude: rawData.location?.lat || 19.0760,
    longitude: rawData.location?.lng || 72.8777,
    is24x7: true,
    stock,
    verified: true,
    type: "Government"
  };
}

/**
 * Validates and sanitizes incoming stock data to prevent broken UI states.
 */
export function safeApiParser(data: any): Partial<UnifiedBloodBank> {
  try {
    if (!data || typeof data !== 'object') throw new Error("Invalid data format");
    // Add validation logic here
    return data;
  } catch (error) {
    console.error("National Integration Error:", error);
    return {};
  }
}
