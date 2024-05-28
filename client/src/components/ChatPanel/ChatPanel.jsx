import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const ChatPanel = ({ selectedFriend }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [cookies] = useCookies(["token"]);
  const [conversationExists, setConversationExists] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const fetchConversation = async () => {
      if (selectedFriend) {
        try {
          const response = await axios.get(
            `http://localhost:8000/conversations`,
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            }
          );

          const conversation = response.data.conversations.find((convo) =>
            convo.members.some((member) => member._id === selectedFriend._id)
          );

          if (conversation) {
            setConversationId(conversation._id);
            setMessages(conversation.messages || []);
            setConversationExists(true);
          } else {
            setConversationId(null);
            setMessages([]);
            setConversationExists(false);
          }
        } catch (error) {
          console.error("Error fetching conversation:", error);
        }
      }
    };

    fetchConversation();
  }, [selectedFriend, cookies.token]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        // Send message to backend
        await axios.post(
          `http://localhost:8000/messages`,
          {
            receiverId: selectedFriend._id,
            text: newMessage,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );

        // Update local state with the new message
        setMessages([...messages, { text: newMessage, senderId: "me" }]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (conversationId) {
        try {
          const response = await axios.get(
            `http://localhost:8000/messages/${conversationId}`,
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            }
          );

          setMessages(response.data.messages || []);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [conversationId, cookies.token]);

  return (
    <div className="flex flex-col w-full h-full bg-zinc-700 rounded-lg p-4 ml-2">
      {selectedFriend ? (
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-4 p-2 bg-zinc-800 rounded-lg">
            <img
              src={`https://ui-avatars.com/api/?name=${selectedFriend.username}`}
              alt="Friend avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <h2 className="text-xl font-bold">{selectedFriend.username}</h2>
          </div>

          <div className="flex-grow overflow-y-auto bg-zinc-800 p-4 rounded-lg">
            {conversationExists ? (
              messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded-lg ${
                      msg.senderId !== selectedFriend._id
                        ? "bg-blue-500 self-end"
                        : "bg-gray-500 self-start"
                    }`}
                  >
                    <p className="text-white">{msg.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-white text-center">
                  No messages yet. Start the conversation!
                </p>
              )
            ) : (
              <p className="text-white text-center">
                Write a message to start a conversation.
              </p>
            )}
          </div>

          <div className="mt-4 flex">
            <input
              type="text"
              className="flex-grow p-2 rounded-lg bg-zinc-800 text-white"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <p className="text-white text-center">
          Please select a friend to start messaging.
        </p>
      )}
    </div>
  );
};

export default ChatPanel;
