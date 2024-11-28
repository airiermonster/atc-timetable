import express from 'express';
import multer from 'multer';
import { auth } from '../middleware/auth.js';
import { uploadTimetable, getTimetable, toggleTimetableStatus } from '../controllers/timetableController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', auth, upload.single('timetable'), uploadTimetable);
router.get('/', auth, getTimetable);
router.patch('/:id/toggle', auth, toggleTimetableStatus);

export default router;