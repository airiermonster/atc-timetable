import { google } from '@google/calendar';
import dotenv from 'dotenv';

dotenv.config();

const calendar = google.calendar({
  version: 'v3',
  auth: process.env.GOOGLE_CALENDAR_API_KEY
});

export const isHoliday = async (date) => {
  try {
    const calendarId = 'en.tz#holiday@group.v.calendar.google.com';
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const response = await calendar.events.list({
      calendarId,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
    });

    return response.data.items.length > 0;
  } catch (error) {
    console.error('Holiday check error:', error);
    return false;
  }
};