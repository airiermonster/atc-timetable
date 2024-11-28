import cron from 'node-cron';
import { Op } from 'sequelize';
import { Timetable, AlertSettings, User } from '../models/index.js';
import { sendSMS } from './smsService.js';
import { isHoliday } from '../utils/calendarService.js';

class AlertService {
  constructor() {
    // Check for upcoming classes every minute
    cron.schedule('* * * * *', () => this.checkAndSendAlerts());
  }

  async checkAndSendAlerts() {
    try {
      const now = new Date();
      const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
      
      // Skip weekends
      if (day === 'Saturday' || day === 'Sunday') return;
      
      // Skip holidays
      if (await isHoliday(now)) return;

      const currentTime = now.toTimeString().slice(0, 5);
      
      // Get all active timetable entries for the current day
      const timetableEntries = await Timetable.findAll({
        where: {
          day,
          isActive: true
        },
        include: [{
          model: User,
          include: [{
            model: AlertSettings,
            where: { globalEnabled: true }
          }]
        }]
      });

      for (const entry of timetableEntries) {
        const settings = entry.User.AlertSetting;
        const reminderTime = this.calculateReminderTime(entry.startTime, settings.reminderMinutes);
        
        if (currentTime === reminderTime) {
          const message = `Reminder: ${entry.courseCode} with ${entry.lecturer} at ${entry.location} starts in ${settings.reminderMinutes} minutes. Have a great class!`;
          await sendSMS(entry.User.phoneNumber, message);
        }
      }
    } catch (error) {
      console.error('Alert check failed:', error);
    }
  }

  calculateReminderTime(classTime, reminderMinutes) {
    const [hours, minutes] = classTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes - reminderMinutes;
    const reminderHours = Math.floor(totalMinutes / 60);
    const reminderMins = totalMinutes % 60;
    return `${String(reminderHours).padStart(2, '0')}:${String(reminderMins).padStart(2, '0')}`;
  }
}

export default new AlertService();