import User from "../models/User.js";

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {

    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete User
export const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Toggle Admin
export const toggleAdmin = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    user.isAdmin = !user.isAdmin;

    await user.save();

    res.json({
      message: "Role Updated Successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};