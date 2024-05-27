import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import UserSearchBar from "./UserSearchBar/UserSearchBar";

const Home = () => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

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
      }
    };

    fetchUserData();
  }, [cookies.token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-white w-full h-full p-4 ">
      <div className="flex flex-row justify-between mb-6 ">
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
    </div>
  );
};

export default Home;
