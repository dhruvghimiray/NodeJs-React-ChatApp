import User from "../models/userSchema.js"; // Adjust the path to your User model as necessary

export const getUser = (req, res) => {
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password"); // Assuming you don't want to return the password field
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isFriend = user.friends.includes(req.user._id);

    const userResponse = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      friends: isFriend,
      createdAt: user.createdAt,
      __v: user.__v,
    };

    res.json(userResponse);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
