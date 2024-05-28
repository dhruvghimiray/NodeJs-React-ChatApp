import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import UserSearchBar from "./UserSearchBar/UserSearchBar";
import FriendsPanel from "./FriendsPanel/FriendsPanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const navigate = useNavigate;

  const logout = () => {
    removeCookie("token", { path: "/" }); // Ensure the token is removed completely
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = cookies.token;
      try {
        const response = await axios.get("http://localhost:8000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        if (error.response.data.message == "Invalid token") {
          removeCookie("token");
          navigate("/");
        }
      }
    };

    fetchUserData();
  }, [cookies.token]);

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-white w-full h-full p-4 flex flex-col ">
      <div className="flex flex-row justify-between items-center h-16 ">
        <div className="flex justify-center items-center ">
          <img
            src={`https://ui-avatars.com/api/?name=${user.username}`}
            alt="User avatar"
            className="w-10 h-10 rounded-full mr-4"
          />

          <h1 className="max-w-fit  text-lg">Welcome, {user.username}!</h1>
        </div>
        <button
          className="px-5 bg-red-500 rounded-lg max-w-fit h-10 text-md"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <UserSearchBar />
      <div className=" h-full flex">
        <FriendsPanel user={user} onSelectFriend={handleSelectFriend} />
        <ChatPanel selectedFriend={selectedFriend} />
      </div>
    </div>
  );
};

export default Home;
