import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FriendsPanel = ({ user, onSelectFriend }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/${user._id}/friends`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        setFriends(response.data);
      } catch (err) {
        setError("Error fetching friends data");
        console.error("Error fetching friends data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [user._id, cookies.token]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="inline-block w-72 h-full bg-zinc-700 rounded-lg p-4 mr-2">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h2 className="text-xl font-bold mb-4">Friends List</h2>
      {friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
            <li
              key={friend._id}
              className="mb-2 flex items-center border-zinc-500 border-2 p-2 rounded-xl hover:cursor-pointer"
              onClick={() => onSelectFriend(friend)}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${friend.username}`}
                alt="Friend avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-white">{friend.username}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No friends found.</p>
      )}
    </div>
  );
};

export default FriendsPanel;
