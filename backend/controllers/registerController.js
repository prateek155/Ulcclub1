import registrationModel from '../models/registrationModel.js';
import nodemailer from "nodemailer";

// CREATE: Register an individual or group
export const createRegistration = async (req, res) => {
  try {
    const { type } = req.body;

    if (!type || (type !== 'individual' && type !== 'group')) {
      return res.status(400).json({ success: false, message: "Invalid registration type" });
    }

    let recipientEmail = "";
    let userName = "";

    if (type === 'individual') {
      const { name, department, phone, email } = req.body;
      if (!name || !phone || !department || !email) {
        return res.status(400).json({
          success: false,
          message: "Name, department, phone, and email are required for individual registration"
        });
      }
      recipientEmail = email;
      userName = name;
    }

    if (type === 'group') {
      const { groupName, leadername, leaderphone, leaderemail, members } = req.body;
      if (!groupName || !leadername || !leaderphone || !leaderemail || !Array.isArray(members) || members.length < 1) {
        return res.status(400).json({
          success: false,
          message: "Group name, leader name, leader phone, leader email, and at least one member are required"
        });
      }
      recipientEmail = leaderemail;
      userName = leadername;
    }

    // Save registration
    const registration = new registrationModel(req.body);
    await registration.save();

    // Get date/time
    const now = new Date();
    const formattedDateTime = now.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    // Email setup
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "prateekagrawal589@gmail.com",
        pass: "evqxuyjpxfuhcati",
      },
    });

    const mailOptions = {
      from: "prateekagrawal589@gmail.com",
      to: recipientEmail,
      subject: "Event Registration Confirmation",
      text: `
Dear ${userName},

Thank you for registering for the event through our club.

📌 Registration Type: ${type === 'individual' ? 'Individual' : 'Group'}
🕒 Registered On: ${formattedDateTime}

We have received your registration details and will be in touch with updates related to the event.

If you have any questions, feel free to reply to this email.

Warm regards,  
Event Coordination Team  
Unsupervised Learners Club.
📞 +91-7627073230
🌐 Visit our website: https://ulcclub1-1.onrender.com
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Registration successful and confirmation email sent",
      registration
    });

  } catch (error) {
    console.error("Registration error:", error);
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
