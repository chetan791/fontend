import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Profile.css";
import { Input } from "@mui/joy";
import { logout } from "../redux/AuthReducer/Action";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { fullname, email } = useSelector((state) => state.auth);
  const [allPosts, setAllPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
  });
  const [currentId, setCurrentId] = useState("");
  const [display, setDisplay] = useState(true);

  const editHandler = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const getMyPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/get_my_blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/delete_blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getMyPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/user/update_blog/${currentId}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditFlag(false);
      getMyPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyComments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/comment/get_all_comments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  console.log(comments);

  const deleteMyComment = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/comment/delete_comment/${id}`
      );
      console.log(res.data);
      alert("comment Deleted successfully");
      fetchAll();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAll = async () => {
    try {
      const [res1, res2] = await Promise.all([getMyPosts(), fetchMyComments()]);
      setAllPosts(res1);
      setComments(res2);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  console.log(comments);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
        }}
      >
        <h1>Name : {fullname}</h1>
        <h1>Email : {email}</h1>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            padding: "0.5rem 1rem",
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
              cursor: "pointer",
              color: display ? "#1d9bf0" : "",
              borderRight: "2px dashed #242d34",
              paddingRight: "10px",
            }}
            onClick={() => setDisplay(!display)}
          >
            Your Blog Post
          </h1>
          <h1
            style={{
              fontWeight: "bold",
              cursor: "pointer",
              color: !display ? "#1d9bf0" : "",
            }}
            onClick={() => setDisplay(!display)}
          >
            Your comments
          </h1>
        </div>
        {display ? (
          <div className="blog_container" style={{ padding: "0.5rem 1rem" }}>
            {allPosts?.map((post) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
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
        ) : (
          <div className="blog_container">
            {comments?.map((comment) => {
              return (
                <div style={{ position: "relative" }} key={comment?._id}>
                  <div>
                    <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                      Title : {comment?.blogID?.title}
                    </p>
                    <p>date : {comment?.date.substring(0, 10)}</p>
                  </div>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "15px",
                      wordBreak: "break-word",
                    }}
                  >
                    comment : {comment?.comment}
                  </p>

                  <button
                    className="submitbtn"
                    style={{
                      position: "absolute",
                      width: "50px",
                      top: "0",
                      right: "0",
                      // border: "1px solid white",
                      margin: "10px",
                    }}
                  >
                    <i
                      onClick={() => {
                        deleteMyComment(comment._id);
                      }}
                      class="fa-solid fa-trash"
                    ></i>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button
        onClick={() => {
          dispatch(logout());
          alert("Logout Successful");
          navigate("/");
        }}
        style={{ width: "100px" }}
        className="submitbtn"
      >
        Logout
      </button>

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
