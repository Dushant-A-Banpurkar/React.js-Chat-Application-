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
    const { fullname, username, password, conformPassword, gender } = req.body;
    if (password !== conformPassword)
      return res
        .status(400)
        .json({ error: "Conform password and Password does't match!!!" });

    const existinUser = await User.findOne({ username });
    if (existinUser)
      return res.status(400).json({ error: "Username is already taken!!!" });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
    });

    await newUser.save();

    if (newUser) {
      generateTokenSetCookie(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        fullname: fullname,
        username: username,
        gender: gender,
      });
    } else {
      res.status(400).json({ error: "Invalid Data!!!" });
    }
  } catch (error) {
    console.log("Error in signUp controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error!!!" });
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
