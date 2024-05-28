import React, { useState } from "react";

const ChatPanel = ({ selectedFriend }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "me" }]);
      setNewMessage("");
    }
  };

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
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg ${
                    msg.sender === "me" ? "bg-blue-500 self-end" : "bg-gray-500 self-start"
                  }`}
                >
                  <p className="text-white">{msg.text}</p>
                </div>
              ))
            ) : (
              <p className="text-white text-center">No messages yet. Start the conversation!</p>
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
        <p className="text-white text-center">Please select a friend to start messaging.</p>
      )}
    </div>
  );
};

export default ChatPanel;
