import express from 'express';
import {
  createRegistration,
  getAllRegistrations,
  deleteRegistration,
  getRegistrationByName
} from '../controllers/registerController.js';

const router = express.Router();

router.post('/register', createRegistration);       // Create
router.get('/all', getAllRegistrations);  // Read All
router.get ('/name/:name', getRegistrationByName); //see the perticuler registration
router.delete('/delete/:id', deleteRegistration); // Delete by ID

export default router;
