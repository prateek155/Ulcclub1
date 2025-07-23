import express from 'express';
import {
  createGroup,
  getAllGroups,
  deleteGroup,
  addMember,
  removeMember,
} from '../controllers/participentController.js';

const router = express.Router();

router.post('/groups', createGroup);
router.get('/groups', getAllGroups);
router.delete('/groups/:groupId', deleteGroup);
router.put('/groups/:groupId/members', addMember);
router.delete('/groups/:groupId/members/:memberId', removeMember);

export default router;
