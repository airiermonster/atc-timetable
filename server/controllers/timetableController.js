import { validationResult } from 'express-validator';
import { Timetable } from '../models/index.js';
import { parsePDF } from '../utils/pdfParser.js';
import { isHoliday } from '../utils/calendarService.js';

export const uploadTimetable = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const timetableEntries = await parsePDF(req.file.buffer);
    
    // Delete existing timetable entries for the user
    await Timetable.destroy({ where: { userId: req.user.id } });
    
    // Create new timetable entries
    const entries = await Timetable.bulkCreate(
      timetableEntries.map(entry => ({
        ...entry,
        userId: req.user.id
      }))
    );

    res.status(201).json(entries);
  } catch (error) {
    console.error('Timetable upload error:', error);
    res.status(500).json({ message: 'Failed to process timetable' });
  }
};

export const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findAll({
      where: { userId: req.user.id },
      order: [
        ['day', 'ASC'],
        ['startTime', 'ASC']
      ]
    });
    res.json(timetable);
  } catch (error) {
    console.error('Get timetable error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const toggleTimetableStatus = async (req, res) => {
  try {
    const timetable = await Timetable.findByPk(req.params.id);
    
    if (!timetable || timetable.userId !== req.user.id) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    timetable.isActive = !timetable.isActive;
    await timetable.save();

    res.json(timetable);
  } catch (error) {
    console.error('Toggle timetable status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};