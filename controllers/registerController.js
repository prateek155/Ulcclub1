import registrationModel from '../models/registrationModel.js';

// CREATE: Register an individual or group
export const createRegistration = async (req, res) => {
  try {
    const { type } = req.body;

    if (!type || (type !== 'individual' && type !== 'group')) {
      return res.status(400).json({ success: false, message: "Invalid registration type" });
    }

    if (type === 'individual') {
      const { name, department, phone } = req.body;
      if (!name || !phone || !department) {
        return res.status(400).json({ success: false, message: "Name, department and phone are required for individual registration" });
      }
    }

    if (type === 'group') {
      const { groupName, leadername, leaderphone, members } = req.body;
      if (!groupName || !leadername || !leaderphone || !Array.isArray(members) || members.length < 1) {
        return res.status(400).json({ success: false, message: "Group name, leader name,leaderphone and at least one member are required" });
      }
    }

    const registration = new registrationModel(req.body);
    await registration.save();

    res.status(201).json({ success: true, message: "Registration successful", registration });
  } catch (error) {
    res.status(400).json({ success: false, message: "Registration failed", error: error.message });
  }
};

// READ: Get all registrations
export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await registrationModel.find().sort({ registrationDate: -1 });
    res.status(200).json({ success: true, registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch registrations", error: error.message });
  }
};

// DELETE: Delete a registration by ID
export const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await registrationModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }
    res.status(200).json({ success: true, message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed", error: error.message });
  }
};

  export const getRegistrationByName = async (req, res) => {
  try {
    const { name } = req.params;

    const registration = await registrationModel.findOne({
      $or: [
        { name }, // individual
        { leadername: name } // group
      ]
    });

    if (!registration) {
      return res.status(404).json({ success: false, message: "No registration found for this name" });
    }

    res.status(200).json({ success: true, registration });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching registration", error: error.message });
  }
};
