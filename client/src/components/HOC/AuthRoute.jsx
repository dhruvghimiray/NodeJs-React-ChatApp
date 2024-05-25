// src/components/withAuth.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    if (!token) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };

  return AuthRoute;
};

export default withAuth;
