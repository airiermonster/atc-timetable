export interface Timetable {
  id: string;
  day: string;
  startTime: string;
  courseCode: string;
  location: string;
  lecturer: string;
}

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  isActive: boolean;
}

export interface AlertSettings {
  globalEnabled: boolean;
  reminderMinutes: number;
}