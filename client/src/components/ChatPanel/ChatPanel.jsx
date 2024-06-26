import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import io from "socket.io-client";

const ChatPanel = ({ selectedFriend }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [cookies] = useCookies(["token"]);
  const [conversationExists, setConversationExists] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);

  const baseUrl = process.env.REACT_APP_HOSTED_BASE_URL;

  useEffect(() => {
    const socketInstance = io(`${baseUrl}`, {
      auth: {
        token: cookies.token,
      },
    });
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socketInstance.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [cookies.token]);

  useEffect(() => {
    const fetchConversation = async () => {
      if (selectedFriend) {
        try {
          const response = await axios.get(`${baseUrl}/conversations`, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });

          const conversation = response.data.conversations.find((convo) =>
            convo.members.some((member) => member._id === selectedFriend._id)
          );

          if (conversation) {
            setConversationId(conversation._id);
            setMessages(conversation.messages || []);
            setConversationExists(true);
            socket.emit("joinConversation", conversation._id);

            // Set the user ID based on conversation members
            const user = conversation.members.find(
              (member) => member._id !== selectedFriend._id
            );
            setUserId(user._id);
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

    if (socket) {
      fetchConversation();
    }
  }, [selectedFriend, cookies.token, socket]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        conversationId: conversationId,
        text: newMessage,
        senderId: userId, // Use the correct user ID
        receiverId: selectedFriend._id,
      };

      try {
        // Send message to backend
        await axios.post(`${baseUrl}/messages`, messageData, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });

        // Emit the message to the socket server
        socket.emit("sendMessage", messageData);

        // Clear the input field
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
            `${baseUrl}/messages/${conversationId}`,
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
        <div className="flex flex-col h-full  ">
          <div className="flex items-center mb-4 p-2 bg-zinc-800 rounded-lg">
            <img
              src={`https://ui-avatars.com/api/?name=${selectedFriend.username}`}
              alt="Friend avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <h2 className="text-xl font-bold">{selectedFriend.username}</h2>
          </div>

          <div className="flex-grow  overflow-y-auto bg-zinc-800 p-4 rounded-lg">
            {conversationExists ? (
              messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded-lg ${
                      msg.senderId === userId
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
