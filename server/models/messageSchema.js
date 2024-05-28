import { text } from "express";
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  conversationId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  ],
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

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
