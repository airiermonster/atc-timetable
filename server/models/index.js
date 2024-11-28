import User from './User.js';
import Timetable from './Timetable.js';
import AlertSettings from './AlertSettings.js';

// Define relationships
User.hasOne(AlertSettings);
AlertSettings.belongsTo(User);

User.hasMany(Timetable);
Timetable.belongsTo(User);

export { User, Timetable, AlertSettings };