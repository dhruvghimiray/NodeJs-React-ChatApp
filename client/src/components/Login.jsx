import "../App.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_HOSTED_BASE_URL
  
  const loginUser = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        username,
        password,
      });

      if (response.data.message === "User login successful") {
        toast.success("User Logged In Successfully", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setCookie("token", response.data.token);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 404) {
        toast.error("🚫 Invalid username or password", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
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
      <div className="text-white text-center text-3xl">
        Welcome to the Chat App
      </div>

      <div className="text-white text-center bg-zinc-700 h-fit w-72 mt-12 rounded-xl p-4">
        <div>Please Sign In/Sign Up to continue</div>
        <form
          className="w-full h-fit flex flex-col justify-center items-center my-6"
          onSubmit={loginUser} // Use onSubmit on the form
        >
          <div className="flex flex-col items-start">
            <div>Username</div>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Your Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="bg-zinc-800 rounded-lg text-white p-2 mt-1 outline-none"
            />
          </div>
          <div className="flex flex-col items-start">
            <div>Password</div>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bg-zinc-800 rounded-lg text-white p-2 mt-1 outline-none"
            />
          </div>

          <button // Change this to a button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded-md w-fit h-fit hover:cursor-pointer mt-6"
          >
            Login
          </button>
        </form>
        <div>
          Not a user?
          <Link to={`/register`}>
            {" "}
            <span className="hover:cursor-pointer">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
