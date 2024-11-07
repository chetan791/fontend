import React, { useContext, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { User } from "./User";
import { PrivateRoutes } from "../components/PrivateRoutes";
import { Admin } from "./Admin";
import { ThemeContext } from "@emotion/react";
import { themeContext } from "./Context";

export const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user/*"
          element={
            <PrivateRoutes>
              <User />
            </PrivateRoutes>
          }
        />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
};
