/**
 * HemoLink Role-Based Access Control (RBAC) System
 * Defines standard roles and permissions for national-grade deployment.
 */

export type Role = 
  | 'National Admin'
  | 'State Admin'
  | 'District Admin'
  | 'Hospital Admin'
  | 'Blood Bank Admin'
  | 'Lab Technician'
  | 'Nurse'
  | 'Donor'
  | 'Volunteer'
  | 'L1 Nurse'       // NABH Level 1
  | 'L2 Technician'  // NABH Level 2
  | 'L3 Officer';    // NABH Level 3

export type Permission = 
  | 'view_stock'
  | 'edit_stock'
  | 'view_donors'
  | 'edit_donors'
  | 'view_screening'
  | 'edit_screening'
  | 'approve_transfer'
  | 'issue_blood'
  | 'manage_emergencies'
  | 'view_analytics'
  | 'view_national_analytics'
  | 'edit_component_lifecycle'
  | 'manage_staff'
  | 'manage_camps'
  | 'view_audit_logs';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  'National Admin': [
    'view_stock', 'edit_stock', 'view_donors', 'edit_donors', 'view_screening', 
    'edit_screening', 'approve_transfer', 'issue_blood', 'manage_emergencies', 
    'view_analytics', 'view_national_analytics', 'edit_component_lifecycle', 
    'manage_staff', 'manage_camps', 'view_audit_logs'
  ],
  'State Admin': [
    'view_stock', 'view_donors', 'view_screening', 'approve_transfer', 
    'manage_emergencies', 'view_analytics', 'manage_staff', 'manage_camps', 
    'view_audit_logs'
  ],
  'District Admin': [
    'view_stock', 'view_donors', 'view_screening', 'manage_emergencies', 
    'view_analytics', 'manage_camps'
  ],
  'Hospital Admin': [
    'view_stock', 'edit_stock', 'view_donors', 'edit_donors', 'view_screening', 
    'edit_screening', 'approve_transfer', 'issue_blood', 'manage_emergencies', 
    'view_analytics', 'manage_staff'
  ],
  'Blood Bank Admin': [
    'view_stock', 'edit_stock', 'view_screening', 'edit_screening', 
    'approve_transfer', 'issue_blood', 'manage_emergencies', 'view_analytics', 
    'edit_component_lifecycle', 'manage_staff', 'manage_camps'
  ],
  'Lab Technician': [
    'view_screening', 'edit_screening', 'edit_component_lifecycle'
  ],
  'Nurse': [
    'view_donors', 'view_screening', 'issue_blood'
  ],
  'Donor': [
    'view_donors' // Their own profile
  ],
  'Volunteer': [
    'view_donors', 'manage_camps'
  ],
  'L1 Nurse': [
    'view_donors', 'view_screening' // View only + initiate screening starts by viewing
  ],
  'L2 Technician': [
    'view_screening', 'edit_screening', 'edit_component_lifecycle'
  ],
  'L3 Officer': [
    'view_stock', 'approve_transfer', 'issue_blood', 'edit_component_lifecycle'
  ]
};

/**
 * Checks if a role has a specific permission.
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Helper to get permissions for a role.
 */
export function getRolePermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}
