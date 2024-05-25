import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";

export default async (req, res) => {
  const { name, username, password, email } = req.body;

  if (!name || !username || !password || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await userSchema.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Username or email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userSchema({
      name,
      username,
      password: hashedPassword,
      email,
    });

    // Save the user to the database
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
