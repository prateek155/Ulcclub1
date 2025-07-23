import express from 'express';
import { 
  getAllMembers, 
  addMember, 
  deleteMember,
  getAllAcceptedMembers,
  acceptMemberController
} from '../controllers/communityController.js';

const router = express.Router();

// GET all members
router.get("/members", getAllMembers);
router.post("/create-member", addMember);
router.delete("/delete-member/:id", deleteMember);
router.get("/accepted-members", getAllAcceptedMembers);
router.post("/accept-member/:id", acceptMemberController);

export default router;
