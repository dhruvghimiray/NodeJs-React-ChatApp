import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //npm i react-router-dom --save

import Login from "./components/Login.jsx";
import RegesterUser from "./components/RegesterUser.jsx";
import Home from "./components/Home.jsx";
import withAuth from "./components/HOC/AuthRoute.jsx";
import loginAuth from "./components/HOC/LoggedInAuth.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";

const Protedtedhome = withAuth(Home);
const LoginRoute = loginAuth(Login);
const ProtedtedProfile = withAuth(UserProfile);

const App = () => {
  return (
    <div className="bg-zinc-900 h-screen w-screen">
      <div className="flex justify-center items-center flex-col h-screen w-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginRoute />} />
            <Route path="/register" element={<RegesterUser />} />
            <Route path="/home" element={<Protedtedhome />} />
            <Route path="/user/:id" element={<ProtedtedProfile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
