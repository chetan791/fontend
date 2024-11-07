import React, { useState } from "react";
import "../CSS/Login.css";
import { Input } from "@mui/joy";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export const CreateBlog = () => {
  const { token } = useSelector((state) => state.auth);
  const [newBlog, setNewBlog] = useState({});

  const changeHandler = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/create_new_blog",
        newBlog,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data);

      setNewBlog({});
      alert("Blog created successfully");
    } catch (error) {
      console.log(error);
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
      <div
        style={{
          backgroundColor: "#242d34",
          borderRadius: "20px",
          margin: "auto",
          width: "70%",
        }}
        // onSubmit={submitHandler}
      >
        <h1>Create Blog</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            gap: "10px",
            padding: "40px",
          }}
        >
          <label>Title</label>
          <Input
            size="md"
            placeholder="title"
            type="title"
            name="title"
            required
            onChange={changeHandler}
          />
          <label>Content</label>
          <textarea
            style={{ padding: "10px", fontSize: "15px" }}
            aria-label="minimum height"
            placeholder="Content"
            type="content"
            name="content"
            required
            onChange={changeHandler}
          />
          <button onClick={submitHandler} type="submit" className="submitbtn">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
