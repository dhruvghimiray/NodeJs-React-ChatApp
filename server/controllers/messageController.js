import Conversation from "../models/conversationSchema.js";
import Message from "../models/messageSchema.js";

// Function to send a message
export const sendMessage = async (req, res) => {
  const userId = req.user._id;
  const { receiverId, text } = req.body;

  try {
    // Check if a conversation already exists between the two users
    let conversation = await Conversation.findOne({
      members: { $all: [userId, receiverId] },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = new Conversation({
        members: [userId, receiverId],
      });
      await conversation.save();
    }

    // Create a new message
    const message = new Message({
      conversationId: conversation._id,
      senderId: userId,
      text: text,
    });

    await message.save();

    return res.status(201).json({ message: "Message sent successfully", message });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Function to get messages for a specific conversation
export const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });

    return res.status(200).json({ messages });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
