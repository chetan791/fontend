import React from "react";
import { Route, Routes } from "react-router-dom";
import { ManagePost } from "./ManagePost";
import { Navbar } from "../components/Navbar";
import { ManageUser } from "./ManageUser";

export const Admin = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ManagePost />} />
        <Route path="/manage-user" element={<ManageUser />} />
      </Routes>
    </div>
  );
};
