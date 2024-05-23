import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-zinc-900 h-screen w-screen">
      <div className=" flex justify-center items-center flex-col">
        <div className=" text-white text-center text-3xl pt-40">
          {" "}
          Welcome to the Chat App
        </div>

        <div className=" text-white text-center bg-zinc-700 h-80 w-72 mt-12 rounded-xl p-4">
          <div>Please Sign In/Sign Up to continue</div>
          <form className=" w-full flex flex-col justify-center items-center my-6">
            <div className="flex flex-col  items-start ">
              <div className="">Username</div>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Your Useranme"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="bg-zinc-800 rounded-lg text-white p-2 mt-1 outline-none"
              ></input>
            </div>
            <div className="flex flex-col  items-start ">
              <div className="">Passowrd</div>
              <input
                type="text"
                name="pasword"
                value={password}
                placeholder="Your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-zinc-800 rounded-lg text-white p-2 mt-1 outline-none"
              ></input>
            </div>
          </form>
          <div>
            Not a user? <span className=" hover:cursor-pointer ">Signin</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
