import { Input } from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const ManagePost = () => {
  const [allPost, setallPost] = useState([]);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
  });
  const [editFlag, setEditFlag] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const editHandler = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const editPost = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/admin/update_blog/${currentId}`,
        editData
      );

      setEditFlag(false);
      getallPost();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/delete_blog/${id}`);
      getallPost();
    } catch (error) {
      console.log(error);
    }
  };

  const getallPost = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/get_blogs");
      setallPost(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallPost();
  }, []);
  return (
    <div>
      {
        <div
          style={{
            padding: "0.5rem 1rem",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "20px",
            color: "white",
          }}
        >
          {allPost?.map((post) => {
            return (
              <div
                style={{
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  border: "2px dashed #1d9bf0",
                  padding: "10px",
                  gap: "10px",
                }}
              >
                <div>
                  <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Title : {post.title}
                  </p>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "15px",
                      wordBreak: "break-word",
                    }}
                  >
                    Content : {post.content}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <p>Date : {post.date.substring(0, 10)}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => {
                        setEditFlag(true);
                        setEditData(post);
                        setCurrentId(post._id);
                      }}
                      className="submitbtn iconButton"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="submitbtn iconButton"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      }
      {editFlag && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: "0",
            right: "0",
            backgroundColor: "#4b4f52",
            zIndex: "1",
            backgroundColor: "rgb(0 0 0 / 80%)",
            alignItems: "center",
            height: "90vh",
            width: "100vw",
          }}
        >
          <div
            style={{
              backgroundColor: "#242d34",
              borderRadius: "20px",
              position: "relative",
              margin: "auto",
              width: "70%",
            }}
          >
            <h1>Edit Your Blog</h1>
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
                value={editData.title}
                required
                onChange={editHandler}
              />
              <label>Content</label>
              <textarea
                style={{ padding: "10px", fontSize: "15px" }}
                aria-label="minimum height"
                placeholder="Content"
                type="content"
                name="content"
                value={editData.content}
                required
                onChange={editHandler}
              />
              <button onClick={editPost} type="submit" className="submitbtn">
                Update
              </button>
            </div>
            <p
              onClick={() => setEditFlag(false)}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "10px",
                right: "30px",
                fontSize: "20px",
              }}
            >
              X
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
