import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //npm i react-router-dom --save

import Login from "./components/Login.jsx";
import RegesterUser from "./components/RegesterUser.jsx";

const App = () => {
  return (
    <div className="bg-zinc-900 h-screen w-screen">
      <div className="flex justify-center items-center flex-col">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<RegesterUser />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
