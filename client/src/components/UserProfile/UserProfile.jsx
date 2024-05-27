import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8000/user/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError("Error fetching user data");
        console.error("Error fetching user data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, cookies.token]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-white">No user found</div>;
  }

  return (
    <div className="text-white p-4 max-w-lg mx-auto bg-zinc-800 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={`https://ui-avatars.com/api/?name=${user.name}`}
          alt="User avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-sm text-gray-400">
            Joined on {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <div className="mt-4">
        {user.friends ? (
          <button className="px-4 py-2 bg-red-500 text-white rounded-full">
            Remove Friend
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-full"
            onClick={() => console.log("add friend")}
          >
            Add Friend
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
