import React from "react";
import "../CSS/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.auth);
  // console.log(isAdmin);
  return (
    <div id="navbar">
      <p>Blog DashBoard</p>
      {isAdmin ? (
        <ul>
          <li onClick={() => navigate("/admin/")}>Manage Post</li>
          <li onClick={() => navigate("/admin/manage-user")}>Manage User</li>
          <li>Post Moderation</li>
          <li>Reports</li>
          <li></li>
        </ul>
      ) : (
        <ul>
          <li onClick={() => navigate("/user/")}>Home</li>

          <li onClick={() => navigate("/user/create-blog")}>Create Post</li>

          <li onClick={() => navigate("/user/profile")}>Profile</li>
        </ul>
      )}
    </div>
  );
};
