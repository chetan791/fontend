import React, { useEffect, useState } from "react";
import "../CSS/Profile.css";
import axios from "axios";
import { Input } from "@mui/joy";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState([]);
  const [commentFlag, setCommentFlag] = useState(false);
  const [comment, setComment] = useState({
    comment: "",
    blogID: "",
  });

  const commentHandler = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const getBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/get_blogs");
      setBlogs(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/comment/create_comment",
        comment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.msg);
      setCommentFlag(false);
      getBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  const sortBydate = (code) => {
    const sorted = [...blogs].sort((a, b) => {
      if (code === "asc") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
    setBlogs(sorted);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "white",
            textTransform: "uppercase",
          }}
        >
          All Posts
        </h1>
        <select
          name=""
          id=""
          style={{
            color: "white",
            padding: "0.5rem 1rem",
            backgroundColor: "#242d34",
            textTransform: "uppercase",
            fontSize: "10px",
          }}
          onChange={(e) => sortBydate(e.target.value)}
        >
          <option value="" selected disabled>
            Sort
          </option>
          <option value="asc">sort by date in asc</option>
          <option value="desc">sort by date in desc</option>
        </select>
      </div>
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
          {blogs?.map((post) => {
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
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      cursor: "pointer",
                      // border: "1px solid #1d9bf0",
                      padding: "10px",
                      fontSize: "20px",
                      color: "#1d9bf0",
                    }}
                  >
                    <button
                      className="submitbtn"
                      onClick={() => {
                        setCommentFlag(!commentFlag);
                        setComment((prev) => {
                          return {
                            ...prev,
                            blogID: post._id,
                          };
                        });
                        document.documentElement.scrollTop = 0;
                      }}
                    >
                      Add comment
                    </button>
                    <button
                      className="submitbtn"
                      onClick={() => {
                        navigate(`/user/comments/${post._id}`);
                      }}
                    >
                      View all {post.commentCount} Comment
                    </button>
                    <i class="fa-solid fa-thumbs-up"></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      }

      {commentFlag && (
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
            height: "100vh",
            width: "100vw",
          }}
        >
          <div
            style={{
              backgroundColor: "#242d34",
              borderRadius: "20px",
              position: "relative",
              margin: "auto",
              width: "40%",
            }}
          >
            <h1>Add comment</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                gap: "10px",
                padding: "40px",
              }}
            >
              <label>Comment</label>
              <Input
                size="md"
                placeholder="Enter comment"
                type="comment"
                name="comment"
                required
                onChange={commentHandler}
              />

              <button onClick={addComment} type="submit" className="submitbtn">
                Add
              </button>
            </div>
            <p
              onClick={() => setCommentFlag(false)}
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
