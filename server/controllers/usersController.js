import userModel from "../models/userSchema.js";

export const getUsers = async (req, res) => {
  const { query } = req.query;
  const userId = req.user._id;


//   console.log({ _id: req.user });
  try {
    const users = await userModel.find({
      username: { $regex: query, $options: "i" }, // Case-insensitive search
      _id: { $ne: userId } // Exclude the current user

    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
