import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_KEY;

export default async (req, res) => {
  if (!req.body) {
    res.status(400).send("Please send valid data");
    return;
  }
  const { username, password } = req.body;
  try {
    const user = await userSchema.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid password" });
      return;
    }

    // At this point, the user is authenticated
    // Here you might generate a token and send it to the client
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    // Send the token along with user information
    res.json({ message: "User login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
