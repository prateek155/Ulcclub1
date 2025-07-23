import userModel from "../models/userModel.js";

// Controller to delete a user
export const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user ID from the request
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Controller to update a user
export const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const role = Number(req.body.role); // ensure it's a number

    if (![0, 1, 2].includes(role)) {
      return res.status(400).send({
        success: false,
        message: "Invalid role. Must be 0 (User), 1 (Admin), or 2 (President)",
      });
    }

    console.log("Attempting role update for:", userId, "New Role:", role);

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: `User role updated to ${role}`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error changing user role:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
