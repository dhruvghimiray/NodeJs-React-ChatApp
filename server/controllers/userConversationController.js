import Conversation from "../models/conversationSchema.js";

// Function to create a new conversation
export const createConversation = async (req, res) => {
  const userId = req.user._id;
  const receiverId = req.body.receiver;

  try {
    // Check if a conversation already exists between the two users
    let conversation = await Conversation.findOne({
      members: { $all: [userId, receiverId] },
    });

    if (conversation) {
      return res.status(200).json({ message: "Conversation already exists", conversation });
    }

    // If no conversation exists, create a new one
    conversation = new Conversation({
      members: [userId, receiverId],
    });

    await conversation.save();

    return res.status(201).json({ message: "Conversation created successfully", conversation });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Function to get all conversations for a specific user
export const getConversations = async (req, res) => {
  const userId = req.user._id;

  try {
    // Find all conversations that include the user ID
    const conversations = await Conversation.find({ members: userId })
      .populate("members", "username") // Populate user details (e.g., username) if needed
      .exec();

    return res.status(200).json({ message: "Conversations retrieved successfully", conversations });
  } catch (error) {
    console.error("Error retrieving conversations:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
