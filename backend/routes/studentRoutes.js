import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  addComplaint,
  updateComplaint,
  deleteComplaint,
  upload
} from "../controllers/studentController.js";

const router = express.Router();


router.get('/all', getAllStudents);

router.get('/:id', getStudentById);

router.post('/students', upload.single('photo'), createStudent);

router.put('/:id', upload.single('photo'), updateStudent);

router.delete('/:id', deleteStudent);

router.post('/:id/complaints', addComplaint);

router.put('/:id/complaints/:complaintId', updateComplaint);

router.delete('/:id/complaints/:complaintId', deleteComplaint);
export default router;
