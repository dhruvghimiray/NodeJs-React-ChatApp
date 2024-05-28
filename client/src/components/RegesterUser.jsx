import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegesterUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/register", {
        name,
        username,
        email,
        password,
      });

      console.log(response);
      if (response.data.message == "User created successfully") {
        toast.success("User Created Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/");
        }, 5000); // Adding a 500ms delay before navigation
      }
    } catch (error) {
      console.log("catch block", error);
      if (error.response.status == 400) {
        toast.error("All fields are required !", {
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
      } else if (error.response.status == 409) {
        toast.error("Email or Username already Exists !", {
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
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="text-white text-center text-3xl ">
        Welcome to the Chat App
      </div>

      <div className="text-white text-center bg-zinc-700 h-fit w-fit px-12 mt-12 rounded-xl p-4">
        <div>Regester User</div>
        <form
          className="w-full flex flex-col justify-center items-center my-6"
          onSubmit={registerUser}
        >
          <div className="flex flex-col items-start">
            <div>Name</div>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Your name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="bg-zinc-800 rounded-lg text-white p-2 mt-1 outline-none"
            />
          </div>
          <div className="flex flex-col items-start">
            <div>Email</div>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-zinc-800 rounded-lg text-white p-2 mt-1 outline-none"
            />
          </div>
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
            className="px-5 rounded-md py-2 bg-blue-500  hover:cursor-pointer mt-4"
          >
            Register
          </button>
        </form>
        <div>
          Already a user?{" "}
          <Link to={`/`}>
            <span className="hover:cursor-pointer">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegesterUser;
