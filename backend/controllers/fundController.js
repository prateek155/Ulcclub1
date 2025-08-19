import fundModel from "../models/fundModel.js"

// Create a new fund entry
export const createFund = async (req, res) => {
    try {
        const newFund = new fundModel(req.body);
        await newFund.save();
        res.status(201).json({
            success: true,
            message: 'Fund entry created successfully',
            fund: newFund
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create fund entry',
            error: error.message
        });
    }
};

// Get all fund entries
export const getAllFunds = async (req, res) => {
    try {
        const funds = await fundModel.find({});
        res.status(200).json({
            success: true,
            funds: funds
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch fund entries',
            error: error.message
        });
    }
};

// Get funds summary (e.g., total income, total expenses)
export const getFundsSummary = async (req, res) => {
    try {
        const income = await fundModel.aggregate([
            { $match: { type: 'Income' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const expenses = await fundModel.aggregate([
            { $match: { type: 'Expense' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalEntries = await fundModel.countDocuments();

        const summary = {
            totalIncome: income[0]?.total || 0,
            totalExpenses: expenses[0]?.total || 0,
            totalEntries
        };

        res.status(200).json({
            success: true,
            summary: summary
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to generate funds summary',
            error: error.message
        });
    }
};

// Delete a fund entry by ID
export const deleteFund = async (req, res) => {
    try {
        const { id } = req.params;
        const fund = await fundModel.findByIdAndDelete(id);
        if (!fund) {
            return res.status(404).json({
                success: false,
                message: 'Fund entry not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Fund entry deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while deleting fund entry',
            error: error.message
        });
    }
};
