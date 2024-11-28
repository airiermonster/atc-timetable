import React from 'react';
import { Header } from './components/Header';
import { TimetableUpload } from './components/TimetableUpload';
import { AlertSettings } from './components/AlertSettings';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TimetableUpload />
          <AlertSettings />
        </div>
      </main>
    </div>
  );
}

export default App;