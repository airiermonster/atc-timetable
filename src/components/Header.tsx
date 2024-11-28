import React from 'react';
import { Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6" />
          <h1 className="text-xl font-bold">Timetable Alert System</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button className="hover:text-indigo-200">Dashboard</button>
            </li>
            <li>
              <button className="hover:text-indigo-200">Users</button>
            </li>
            <li>
              <button className="hover:text-indigo-200">Settings</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}