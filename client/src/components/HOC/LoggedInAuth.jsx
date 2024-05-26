// src/components/withAuth.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const loginAuth = (Component) => {
  const LoginAuthRoute = (props) => {
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    if (token) {
      return <Navigate to="/home" />;
    }

    return <Component {...props} />;
  };

  return LoginAuthRoute;
};

export default loginAuth;
