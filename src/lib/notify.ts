/**
 * HemoLink Notification Service
 * Handles SMS and WhatsApp alerts for national-grade deployment.
 * Mock implementation ready for Twilio/Gupshup integration.
 */

export interface NotificationPayload {
  to: string;
  message: string;
  type: 'sms' | 'whatsapp';
}

/**
 * Core notification handler.
 */
async function sendNotification(payload: NotificationPayload): Promise<boolean> {
  console.log(`[NOTIFY] Sending ${payload.type.toUpperCase()} to ${payload.to}: "${payload.message}"`);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
}

export const NotifyService = {
  /**
   * Notifies donor of emergency SOS matching their blood group.
   */
  async notifyDonorEmergency(phone: string, location: string, bloodGroup: string): Promise<boolean> {
    const message = `[HEMOLINK URGENT] Emergency blood needed (${bloodGroup}) at ${location}. Your contribution can save a life! Open the app to view details.`;
    return sendNotification({ to: phone, message, type: 'sms' });
  },

  /**
   * Reminder for blood donation appointment.
   */
  async notifyAppointment(phone: string, time: string, hospital: string): Promise<boolean> {
    const message = `[HEMOLINK] Reminder: Your blood donation appointment is scheduled for ${time} at ${hospital}. Thank you for your support!`;
    return sendNotification({ to: phone, message, type: 'whatsapp' });
  },

  /**
   * Alerts donor of their screening results being ready.
   */
  async notifyScreeningResult(phone: string): Promise<boolean> {
    const message = `[HEMOLINK] Your latest blood screening results are now available in your donor profile. Download the FHIR record for details.`;
    return sendNotification({ to: phone, message, type: 'sms' });
  },

  /**
   * Sends camp reminder to registered volunteers/donors.
   */
  async notifyCampReminder(phone: string, campName: string, date: string): Promise<boolean> {
    const message = `[HEMOLINK] The blood donation camp "${campName}" is happening on ${date}. We look forward to seeing you there!`;
    return sendNotification({ to: phone, message, type: 'whatsapp' });
  }
};
