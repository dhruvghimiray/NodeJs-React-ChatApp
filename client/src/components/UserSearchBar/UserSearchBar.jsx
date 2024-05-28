import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const UserSearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [cookies] = useCookies(["token"]); // Retrieve the token from cookies

  const navigate = useNavigate();

  // Debounced API call to avoid sending request on every keystroke
  const fetchData = useCallback(
    debounce(async (value) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8000/users", {
          params: { query: value },
          headers: {
            Authorization: `Bearer ${cookies.token}`, // Include the token in the headers
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError("Error fetching data");
        console.error("Error fetching user data", err);
      } finally {
        setLoading(false);
      }
    }, 300),
    [cookies.token] // Add cookies.token as a dependency
  );

  useEffect(() => {
    if (searchValue) {
      fetchData(searchValue);
    } else {
      setUsers([]);
      setError(null);
    }
  }, [searchValue, fetchData]);

  return (
    <div className="w-full flex flex-col items-center relative my-6">
      {/* Search Bar */}
      <div className="w-full h-12 rounded-xl bg-zinc-600 flex flex-row items-center px-2 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width={30}
          height={30}
          className="text-white"
        >
          <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
        </svg>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="Search for users..."
          className="w-full h-full rounded-xl bg-zinc-600 outline-none px-4 text-white"
        />
        {loading && <div className="ml-2 text-white">Loading...</div>}
        {error && <div className="ml-2 text-red-500">{error}</div>}
      </div>

      {/* Search Results Container */}
      <div className="absolute top-full left-0 w-full  z-10 mt-2">
        {users.length > 0 ? (
          <ul className="backdrop-blur-xl bg-white/20 opacity-95 rounded-lg p-4">
            {users.map((user) => (
              <li
                key={user._id}
                className="text-white py-2 border-b border-gray-600 last:border-b-0 cursor-pointer"
                onClick={() => navigate(`/user/${user._id}`)} // Navigate to user profile page
              >
                {user.username}
              </li>
            ))}
          </ul>
        ) : (
          !loading &&
          searchValue && (
            <div className="text-white backdrop-blur-xl bg-white/20 opacity-95 rounded-lg p-4 mt-2">
              No users found
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserSearchBar;
