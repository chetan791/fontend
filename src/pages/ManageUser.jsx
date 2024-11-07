import { Input } from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const ManageUser = () => {
  const [userData, setUserData] = useState([]);
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
        `http://localhost:5000/admin/update_user/${currentId}`,
        editData
      );
      setEditFlag(false);
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/get_users");
      setUserData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/delete_user/${id}`);
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      {
        <table
          style={{
            width: "100%",
            fontSize: "20px",
            borderCollapse: "separate",
            borderSpacing: "15px",
            // backgroundColor: "red",
            padding: "20px",
            borderCollapse: "collapse",
            border: "3px Dashed #1d9bf0",
          }}
          cellPadding={10}
          border={2}
        >
          <tr
            style={{
              color: "white",
              backgroundColor: "#1d9bf0",
              //   border: "1px solid black",
            }}
            // border="1px solid black"
          >
            <th>Full Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {userData?.map((user) => (
            <tr style={{ textAlign: "center" }}>
              <td>{user.fullname}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <i
                  onClick={() => {
                    setEditFlag(true);
                    setCurrentId(user._id);
                    setEditData({
                      fullname: user.fullname,
                      username: user.username,
                      email: user.email,
                    });
                  }}
                  style={{ cursor: "pointer" }}
                  class="fa-solid fa-pen-to-square"
                ></i>
              </td>
              <td>
                <i
                  style={{ cursor: "pointer" }}
                  class="fa-solid fa-trash"
                  onClick={() => deleteUser(user._id)}
                ></i>
              </td>
            </tr>
          ))}
        </table>
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
              width: "40%",
            }}
          >
            <h1>Edit User</h1>
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
                placeholder="fullname"
                type="fullname"
                name="fullname"
                value={editData.fullname}
                required
                onChange={editHandler}
              />
              <label>Username</label>
              <Input
                size="md"
                placeholder="username"
                type="username"
                name="username"
                value={editData.username}
                required
                onChange={editHandler}
              />
              <label>Email</label>
              <Input
                size="md"
                placeholder="email"
                type="email"
                name="email"
                value={editData.email}
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
