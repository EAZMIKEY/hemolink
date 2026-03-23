/**
 * Initial Audit Seed Data
 */
import { logAction } from './audit';

export function seedAuditLogs() {
  if (typeof window !== 'undefined' && !localStorage.getItem('hemo_audit_logs')) {
    logAction('admin_nat_01', 'National Admin', 'System Initialization: RBAC & Audit Active', '/dashboard');
    logAction('bank_delhi_04', 'Blood Bank Admin', 'Stock Update: +40 Units PRBC (O+)', '/dashboard/inventory');
    logAction('hosp_aiims_02', 'Hospital Admin', 'Emergency SOS Broadcast: AB- Critical', '/emergency');
    logAction('lab_tech_09', 'Lab Technician', 'Screening Bulk Update: 12 Bags Verified', '/dashboard/screening');
    logAction('nurse_joy', 'Nurse', 'Blood Issued: Unit #7742 (A-)', '/dashboard/issue');
    logAction('admin_state_up', 'State Admin', 'Compliance Report Generated: Q1 Inventory', '/dashboard/reports');
    logAction('donor_rahul', 'Donor', 'Login: Verified via Biometrics', '/login');
    console.log('[SEED] Audit logs initialized.');
  }
}
