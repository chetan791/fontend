import React, { useState } from "react";
import "../CSS/Login.css";
import { Input } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AdminLogin, login } from "../redux/AuthReducer/Action";

export const Login = () => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/user/");
  }

  if (isAdmin) {
    navigate("/admin/");
  }

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (e.target.checkValidity()) {
      if (details.email === "admin@gmail.com" && details.password === "admin") {
        navigate("/admin/");
        dispatch(AdminLogin());
      } else {
        dispatch(login(details));
      }
    } else {
      e.target.reportValidity();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        style={{ borderRadius: "20px", margin: "auto" }}
        onSubmit={submitHandler}
      >
        <h1>Sign in</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            gap: "10px",
            padding: "40px",
          }}
        >
          <label>Email</label>
          <Input
            size="md"
            placeholder="Email"
            type="email"
            name="email"
            required
            onChange={changeHandler}
          />
          <label>Password</label>
          <Input
            size="md"
            placeholder="Password"
            type="password"
            name="password"
            required
            onChange={changeHandler}
          />
          <button type="submit" className="submitbtn">
            Login
          </button>
          <Link
            style={{
              textDecoration: "none",
              textAlign: "center",
              color: "white",
            }}
            to="/register"
          >
            <p>Don't have an account? Register</p>
          </Link>
        </div>
      </form>
    </div>
  );
};
