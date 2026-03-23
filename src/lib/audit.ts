/**
 * HemoLink Audit Logging Service
 * Provides a unified way to log critical actions for government compliance.
 */

import { Role } from './rbac';

export interface AuditLog {
  id: string;
  userId: string;
  role: Role;
  action: string;
  timestamp: string;
  route: string;
  metadata?: Record<string, any>;
}

/**
 * Logs a system action.
 * Currently stores in localStorage for demonstration, but ready for DB integration.
 */
export function logAction(
  userId: string,
  role: Role,
  action: string,
  route: string,
  metadata?: Record<string, any>
): void {
  const newLog: AuditLog = {
    id: Math.random().toString(36).substring(2, 11),
    userId,
    role,
    action,
    timestamp: new Date().toISOString(),
    route,
    metadata,
  };

  if (typeof window !== 'undefined') {
    try {
      const existingLogs = JSON.parse(localStorage.getItem('hemo_audit_logs') || '[]');
      const updatedLogs = [newLog, ...existingLogs].slice(0, 1000); // Keep last 1000 logs
      localStorage.setItem('hemo_audit_logs', JSON.stringify(updatedLogs));
      console.log(`[AUDIT] Action logged: ${action} by ${userId} (${role})`, newLog);
    } catch (e) {
      console.error('[AUDIT] Failed to save log:', e);
    }
  }
}

/**
 * Retrieves audit logs.
 */
export function getAuditLogs(): AuditLog[] {
  if (typeof window !== 'undefined') {
    try {
      return JSON.parse(localStorage.getItem('hemo_audit_logs') || '[]');
    } catch (e) {
      console.error('[AUDIT] Failed to retrieve logs:', e);
      return [];
    }
  }
  return [];
}
