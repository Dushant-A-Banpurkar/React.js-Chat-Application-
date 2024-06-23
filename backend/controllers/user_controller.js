import mongoose from "mongoose";
import User from "../models/user_model.js";
mongoose;

export const getUserForSideBar = async (req, res) => {
  try {
    const { loggedInUserID } = req.body;

    const loggedInUserObjectId = new mongoose.Types.ObjectId(loggedInUserID);

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserObjectId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in GetUserForSideBar: ", error.message);
    res.status(400).json({ error: "Internal server error!!!" });
  }
};
