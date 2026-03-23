/**
 * Database Adapter for HemoLink.
 * Supports LocalStorage (Demo), Firebase (Production Prep), and Supabase (National Integration Prep).
 */

export type DBMode = "local" | "firebase" | "supabase";

const CURRENT_MODE: DBMode = (process.env.NEXT_PUBLIC_DB_MODE as DBMode) || "local";

export const db = {
  getMode: () => CURRENT_MODE,

  /**
   * Generic save function that selects the correct adapter.
   */
  async save(collection: string, data: any) {
    console.log(`[DB ADAPTER] Saving to ${collection} in mode: ${CURRENT_MODE}`);
    
    switch (CURRENT_MODE) {
      case "local":
        if (typeof window !== 'undefined') {
          localStorage.setItem(`hemolink_${collection}`, JSON.stringify(data));
        }
        return { success: true };
      
      case "firebase":
        // TODO: Logic for Firebase Firestore
        return { success: false, error: "Firebase not configured" };
        
      case "supabase":
        // TODO: Logic for Supabase Postgres
        return { success: false, error: "Supabase not configured" };
        
      default:
        return { success: false };
    }
  },

  async fetch(collection: string) {
    switch (CURRENT_MODE) {
      case "local":
        if (typeof window !== 'undefined') {
          return JSON.parse(localStorage.getItem(`hemolink_${collection}`) || '[]');
        }
        return [];
      default:
        return [];
    }
  }
};
