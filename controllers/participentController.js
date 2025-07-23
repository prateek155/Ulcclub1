import Participent from '../models/participentModel.js';

// Create a new group
export const createGroup = async (req, res) => {
  try {
    const { name, position } = req.body;

    if (!name || !position) {
      return res.status(400).json({ message: 'Name and position are required' });
    }

    const newGroup = new Participent({ name, position });
    await newGroup.save();

    res.status(201).json({
      success: true,
      message: 'Group created successfully',
      group: newGroup,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Get all groups
export const getAllGroups = async (req, res) => {
  try {
    const groups = await Participent.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, groups });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Delete a group
export const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const deleted = await Participent.findByIdAndDelete(groupId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    res.status(200).json({ success: true, message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Add member to a group
export const addMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name } = req.body;

    const group = await Participent.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    if (group.members.length >= 6) {
      return res.status(400).json({ success: false, message: 'Maximum 6 members allowed' });
    }

    group.members.push({ name });
    await group.save();

    res.status(200).json({
      success: true,
      message: 'Member added successfully',
      group,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Remove a member from a group
export const removeMember = async (req, res) => {
  try {
    const { groupId, memberId } = req.params;

    const group = await Participent.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    group.members = group.members.filter(
      (member) => member._id.toString() !== memberId
    );

    await group.save();

    res.status(200).json({
      success: true,
      message: 'Member removed successfully',
      group,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
