import React from 'react';
import { Upload } from 'lucide-react';

export function TimetableUpload() {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, this would handle PDF upload and processing
    console.log('File selected:', event.target.files?.[0]);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Upload Timetable</h2>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">Upload your timetable PDF file</p>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-700"
        >
          Select File
        </label>
      </div>
    </div>
  );
}