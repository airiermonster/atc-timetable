import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  login: (credentials: { email: string; password: string }) =>
    axios.post(`${API_BASE_URL}/auth/login`, credentials),
  register: (userData: { name: string; email: string; password: string; phoneNumber: string }) =>
    axios.post(`${API_BASE_URL}/auth/register`, userData),

  // Timetable endpoints
  uploadTimetable: (file: File) => {
    const formData = new FormData();
    formData.append('timetable', file);
    return axios.post(`${API_BASE_URL}/timetable/upload`, formData);
  },
  getTimetables: () => axios.get(`${API_BASE_URL}/timetable`),

  // Alert settings endpoints
  updateAlertSettings: (settings: { globalEnabled: boolean; reminderMinutes: number }) =>
    axios.put(`${API_BASE_URL}/settings/alerts`, settings),
  getAlertSettings: () => axios.get(`${API_BASE_URL}/settings/alerts`),

  // User management endpoints
  getUsers: () => axios.get(`${API_BASE_URL}/users`),
  updateUser: (userId: string, userData: Partial<User>) =>
    axios.put(`${API_BASE_URL}/users/${userId}`, userData),
};