import React from 'react';
import { Bell, BellOff } from 'lucide-react';

export function AlertSettings() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Alert Settings</h2>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`p-2 rounded-full ${
            enabled ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}
        >
          {enabled ? <Bell className="w-6 h-6" /> : <BellOff className="w-6 h-6" />}
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Global Alerts</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reminder Time (minutes before class)
          </label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
          </select>
        </div>
      </div>
    </div>
  );
}