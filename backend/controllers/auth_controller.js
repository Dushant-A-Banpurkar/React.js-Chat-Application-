import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import generateTokenSetCookie from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const userPassword = await bcrypt.compare(password, user?.password || "");
    console.log(user);
    if (!user || !userPassword)
      return res.status(400).json({ error: "Invalid Username or Password" });

    generateTokenSetCookie(user._id, res);
    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profileImg: user.profilePic,
    })
  } catch (error) {
    console.log("Error in login controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
};
export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    // Logging the received data
    console.log("Request Body:", req.body);

    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "Male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    generateTokenSetCookie(newUser._id, res);

    res.status(200).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      gender: newUser.gender,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const logout = async (req, res) => { 
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User Logout successfully" });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
};
