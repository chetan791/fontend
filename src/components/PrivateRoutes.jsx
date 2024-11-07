import React from "react";
import { useSelector } from "react-redux";
import { Login } from "../pages/Login";
import { useNavigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  {
    if (isAuthenticated) {
      return <div>{children}</div>;
    } else {
      navigate("/");
    }
  }
};
