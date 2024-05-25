import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Home = () => {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(["token"]);

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
    <div className="text-white">
      <h1>Welcome, {user.username}!</h1>
    </div>
  );
};

export default Home;
