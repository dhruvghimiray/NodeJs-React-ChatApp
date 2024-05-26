import userModel from "../models/userSchema.js";

export const getUsers = async (req, res) => {
  const { query } = req.query;

  console.log({ _id: req.user });
  try {
    const users = await userModel.find({
      username: { $regex: query, $options: "i" }, // Case-insensitive search
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
