export interface AuditEvent {
  user: string;
  action: string;
  timestamp: string;
  details: string;
  role: "donor" | "hospital" | "bloodbank" | "admin";
}

/**
 * Standardized audit logging for government compliance.
 */
export function logEvent(event: Omit<AuditEvent, 'timestamp'>) {
  const fullEvent: AuditEvent = {
    ...event,
    timestamp: new Date().toISOString()
  };

  // In a real app, this would send to a secure logging server or database
  console.log(`[AUDIT LOG] ${fullEvent.timestamp} - ${fullEvent.user} (${fullEvent.role}): ${fullEvent.action} | ${fullEvent.details}`);

  // Mock: Persistence in localStorage for the demo
  if (typeof window !== 'undefined') {
    const logs = JSON.parse(localStorage.getItem('hemolink_audit_logs') || '[]');
    logs.unshift(fullEvent);
    localStorage.setItem('hemolink_audit_logs', JSON.stringify(logs.slice(0, 100)));
  }

  return fullEvent;
}

export function getAuditLogs(): AuditEvent[] {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('hemolink_audit_logs') || '[]');
  }
  return [];
}
