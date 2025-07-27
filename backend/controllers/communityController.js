import CommunityModel from "../models/CommunityModel.js";
import nodemailer from "nodemailer";

// fetch all members pending list
export const getAllMembers = async (req, res) => {
   try {
      const members = await CommunityModel.find({ status: "pending"});
      res.status(200).json({
        success: true,
        members,
      });
    } catch (error) {
      console.error("Error fetching members:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching members",
      }); 
    }
  };

  // add request form 
export const addMember = async (req, res) => {
  console.log("Request received to add member:", req.body); 
   try {
     const { Name, email, phone, bio } = req.body;
 
     // Validate required fields
     if (!Name || !email || !phone ||!bio) {
       return res.status(400).json({
         success: false,
         message: "All fields are required",
       });
     }
 
     const newmember = new CommunityModel({
       Name,
       email,
       phone,
       bio
     });
 
     await newmember.save();
     // Send success response
     res.status(201).json({
       success: true,
       message: "memberer added successfully",
       member: newmember,
     });
   } catch (error) {
     console.error("Error adding member:", error);
     res.status(500).json({
       success: false,
       message: "Error adding membeer",
     });
   }
 };


 // delete controller
export const deleteMember = async (req, res) => {
  try {
    const member = await CommunityModel.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }
    res.status(200).json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting member" });
  }
};


// only accepted member controller
export const getAllAcceptedMembers = async (req, res) => {
  try {
    const acceptedMembers = await CommunityModel.find({ status: 'accepted' });
    res.status(200).send({ success: true, members: acceptedMembers });
  } catch (error) {
    console.error("Error fetching accepted members:", error);
    res.status(500).send({ success: false, message: "Error fetching accepted members" });
  }
};

// controller for accepting button
export const acceptMemberController = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the member by ID
    const member = await CommunityModel.findById(id);
    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    // Update status to 'accepted'
    member.status = "accepted";
    await member.save();

    // Get current date and time in Indian timezone
    const now = new Date();

    // Format full date-time for 'sent on' part
    const formattedDateTime = now.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Format just date (e.g., 27th July 2025)
    const interviewDate = now.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Static time and mode (can be made dynamic too)
    const interviewTime = "4:00 PM";
    const interviewMode = "Offline";
    const clubName = "Unsupervised Learners Club (ULC)"

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "prateekagrawal589@gmail.com",
        pass: "evqxuyjpxfuhcati",
      },
    });

    const mailOptions = {
      from: "prateekagrawal589@gmail.com",
      to: member.email,
      subject: "Interview Invitation for Our Club",
      text: `
Dear ${member.Name},

Thank you for showing interest in joining our Club!
We are excited to inform you that you have been shortlisted for the next step — the interview round. 🎯

🗓️ Date: ${interviewDate}
⏰ Time: ${interviewTime}
📍 Mode: ${interviewMode}
💬 Duration: Approx. 15–20 minutes

Please confirm your availability by replying to this email before the interview time.

This email was sent on: ${formattedDateTime}

If you have any questions or need to reschedule, feel free to reach out.

We’re looking forward to meeting you!

Warm regards,  
Recruitment Team  
${clubName}  
+91-7627073230
🌐 Visit our website: https://ulcclub1-1.onrender.com
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Member accepted and interview mail sent successfully!",
    });
  } catch (error) {
    console.error("Error accepting member:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
