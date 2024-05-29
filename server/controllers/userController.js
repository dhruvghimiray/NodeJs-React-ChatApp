import User from "../models/userSchema.js"; // Adjust the path to your User model as necessary
import Conversation from "../models/conversationSchema.js";
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

import userModel from "../models/userSchema.js";

export const addFriend = async (req, res) => {
  const userId = req.user._id;
  const friendId = req.params.id;

  try {
    const user = await userModel.findById(userId);
    const friend = await userModel.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.friends.includes(friendId) || friend.friends.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    // Create a new conversation
    const newConversation = new Conversation({
      members: [userId, friendId],
    });
    await newConversation.save();

    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ message: "Error adding friend" });
  }
};

export const getFriends = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userModel
      .findById(userId)
      .populate("friends", "username _id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Error fetching friends" });
  }
};
