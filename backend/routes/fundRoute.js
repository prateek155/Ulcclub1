import express from "express";
import {
    createFund,
    getAllFunds,
    getFundsSummary,
    deleteFund
} from '../controllers/fundController';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new fund entry
router.post('/create', requireSignIn, isAdmin,createFund);

// Get all fund entries
router.get('/all-funds', requireSignIn, getAllFunds);

// Get a summary of all funds
router.get('/funds/summary', requireSignIn, getFundsSummary);

// Delete a fund entry by ID
router.delete('/delete/:id',requireSignIn, isAdmin, deleteFund);

export default router;
