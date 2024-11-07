import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { CreateBlog } from "./CreateBlog";
import { Homepage } from "./Homepage";
import { Profile } from "./Profile";
import { useSelector } from "react-redux";
import { ViewComment } from "./ViewComment";

export const User = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/comments/:id" element={<ViewComment />} />
      </Routes>
    </div>
  );
};
