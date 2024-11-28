import { google } from '@google/calendar';
import dotenv from 'dotenv';

dotenv.config();

class CalendarService {
  constructor() {
    this.calendar = google.calendar({
      version: 'v3',
      auth: process.env.GOOGLE_CALENDAR_API_KEY,
    });
  }

  async isHoliday(date) {
    try {
      const calendarId = 'en.tz#holiday@group.v.calendar.google.com'; // Tanzanian holidays calendar
      const response = await this.calendar.events.list({
        calendarId,
        timeMin: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
        timeMax: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
        singleEvents: true,
      });

      return response.data.items.length > 0;
    } catch (error) {
      console.error('Error checking holiday:', error);
      return false;
    }
  }
}

export default new CalendarService();