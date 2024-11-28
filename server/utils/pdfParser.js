import pdfParse from 'pdf-parse';

const TIME_REGEX = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
const COURSE_CODE_REGEX = /CSU\s*\d+/i;
const LOCATION_REGEX = /Comp\s*R\d+(?:\/\d+)?/i;
const LECTURER_REGEX = /[A-Za-z]+,\s*[A-Z]/;

export const parsePDF = async (buffer) => {
  const data = await pdfParse(buffer);
  return extractTimetableData(data.text);
};

const extractTimetableData = (text) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const entries = [];
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

  for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
    const day = days[dayIndex];
    let currentTime = '08:00';

    while (timeToMinutes(currentTime) <= timeToMinutes('18:00')) {
      const cellContent = findCellContent(lines, day, currentTime);
      
      if (cellContent) {
        const entry = parseCell(cellContent, day, currentTime);
        if (entry) {
          entries.push(entry);
        }
      }

      currentTime = incrementTime(currentTime, 60); // Move to next hour
    }
  }

  return entries;
};

const findCellContent = (lines, day, time) => {
  const pattern = new RegExp(`${time}.*?(${day}).*?(CSU\\s*\\d+).*?(Comp\\s*R\\d+(?:/\\d+)?).*?([\\w.,]+)`, 'i');
  return lines.find(line => pattern.test(line));
};

const parseCell = (content, day, time) => {
  const courseCode = content.match(COURSE_CODE_REGEX)?.[0];
  const location = content.match(LOCATION_REGEX)?.[0];
  const lecturer = content.match(LECTURER_REGEX)?.[0];

  if (courseCode && location && lecturer) {
    return {
      day,
      startTime: time,
      courseCode: courseCode.trim(),
      location: location.trim(),
      lecturer: lecturer.trim(),
    };
  }
  return null;
};

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const incrementTime = (time, minutes) => {
  const totalMinutes = timeToMinutes(time) + minutes;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};