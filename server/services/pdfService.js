import pdf from 'pdf-parse';

class PDFService {
  async extractTimetable(buffer) {
    try {
      const data = await pdf(buffer);
      return this.parseTimetableData(data.text);
    } catch (error) {
      console.error('PDF extraction failed:', error);
      throw new Error('Failed to extract timetable data');
    }
  }

  parseTimetableData(text) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = [];
    const entries = [];

    // Generate time slots from 08:00 to 18:00
    for (let hour = 8; hour <= 18; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    // Split text into lines and process each line
    const lines = text.split('\n');
    
    days.forEach((day, dayIndex) => {
      timeSlots.forEach((timeSlot) => {
        // Find the corresponding cell in the timetable
        const pattern = new RegExp(`${timeSlot}.*?(${day}).*?(CSU\\s*\\d+).*?(Comp\\s*R\\d+(?:/\\d+)?).*?([\\w.,]+)`, 'i');
        const match = lines.find(line => pattern.test(line));

        if (match) {
          const [_, courseCode, location, lecturer] = pattern.exec(match).slice(2);
          entries.push({
            day,
            startTime: timeSlot,
            courseCode: courseCode.trim(),
            location: location.trim(),
            lecturer: lecturer.trim(),
          });
        }
      });
    });

    return entries;
  }
}

export default new PDFService();