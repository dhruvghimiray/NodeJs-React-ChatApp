import { text } from "express";
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
