import React, { useContext, useEffect, useRef, useState } from "react";
import "../CSS/Login.css";
import { Input } from "@mui/joy";
import axios from "axios";
import { Link } from "react-router-dom";
import { themeContext } from "./Context";

export const Register = () => {
  const [details, setDetails] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/authentication/register",
          details
        );

        alert(response.data.msg);
      } catch (error) {}
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
        id="form"
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
          <label>Full Name</label>
          <Input
            size="md"
            name="fullname"
            placeholder="Full Name"
            type="text"
            required
            onChange={changeHandler}
          />
          <label>Username</label>
          <Input
            size="md"
            name="username"
            placeholder="Username"
            type="text"
            required
            onChange={changeHandler}
          />
          <label>Email</label>
          <Input
            size="md"
            name="email"
            placeholder="Email"
            type="email"
            required
            onChange={changeHandler}
          />
          <label>Password</label>
          <Input
            size="md"
            name="password"
            placeholder="Password"
            type="password"
            required
            onChange={changeHandler}
          />
          <button type="submit" className="submitbtn">
            Register
          </button>

          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            <p style={{ textAlign: "center" }}>
              Already have an account? Login
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};
