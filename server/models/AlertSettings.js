import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const AlertSettings = sequelize.define('AlertSettings', {
  globalEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  reminderMinutes: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 30,
    },
  },
});

export default AlertSettings;