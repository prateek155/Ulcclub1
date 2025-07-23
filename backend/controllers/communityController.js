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
    const { id } = req.params; // Extract the member ID from the request parameters

    // Find the member by ID
    const member = await CommunityModel.findById(id);

    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    // Update the member's status to 'accepted'
    member.status = "accepted";
    await member.save();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use your email service (e.g., Gmail, Outlook, etc.)
      auth: {
        user: "prateekagrawal589@gmail.com", // Replace with your email
        pass: "evqxuyjpxfuhcati", // Replace with your email password or app password
      },
    });

    // Email options
    const mailOptions = {
      from: "prateekagrawal589@gmail.com", // Sender address
      to: member.email, // Recipient's email (from the member's data)
      subject: "Membership Accepted",
      text: `Dear ${member.Name},\n\nYour membership request has been accepted!\n\nWelcome to the community!\n\nBest regards,\nThe Community Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Member accepted successfully and email sent!" });
  } catch (error) {
    console.error("Error accepting member:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};