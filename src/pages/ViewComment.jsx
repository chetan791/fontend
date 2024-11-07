import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ViewComment = () => {
  const { id } = useParams();
  const [currBlog, setCurrBlog] = useState({});
  const [expand, setExpand] = useState(
    Array(currBlog?.comments?.length).fill(false)
  );

  const handleExpand = (index) => {
    setExpand((prev) => {
      const newExpand = [...prev];
      newExpand[index] = !newExpand[index];
      return newExpand;
    });
  };

  const getBlogData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/comment/get_comments/${id}`
      );
      setCurrBlog(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(currBlog);

  useEffect(() => {
    getBlogData();
  }, []);

  return (
    <div>
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
            Title : {currBlog?.blog?.title}
          </p>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              wordBreak: "break-word",
            }}
          >
            Content : {currBlog?.blog?.content}
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
          <p>Date : {currBlog?.blog?.date.substring(0, 10)}</p>
          {/* <div style={{ display: "flex", gap: "10px" }}>
            <button className="submitbtn iconButton">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button className="submitbtn iconButton">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div> */}
        </div>
      </div>
      <p style={{ fontWeight: "bold", fontSize: "20px", textAlign: "left" }}>
        Comments
      </p>
      {currBlog?.comments?.map((comment, i) => {
        return (
          <div
            style={{
              border: "2px dashed #1d9bf0",
              margin: "10px 0 10px 20px",
              padding: "10px",
              backgroundColor: "#242d34",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                gap: "10px",
                alignItems: "center",
                // border: "2px dashed #1d9bf0",
              }}
            >
              <div
                style={{
                  border: "2px solid #1d9bf0",
                  padding: "5px",
                  borderRadius: "50px",
                  width: "20px",
                }}
              >
                <i class="fa-solid fa-user"></i>
              </div>
              <p>{comment.author}</p>
              <p style={{ fontSize: "10px" }}>
                {comment.date.substring(0, 10)}
              </p>
            </div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "17px",
                // border: "2px dashed #1d9bf0",
                margin: "0 0 10px 0",
                wordBreak: "break-word",
                paddingLeft: "5%",
                textAlign: "left",
              }}
              onClick={() => {
                handleExpand(i);
              }}
            >
              {expand[i]
                ? comment.comment
                : comment.comment.substring(0, 100) + "..."}
            </p>
          </div>
        );
      })}
    </div>
  );
};
