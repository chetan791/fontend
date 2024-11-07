import axios from "axios";
import {
  ADMIN_LOGIN,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../ActionTypes";

export const login = (details) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const res = await axios.post(
      "http://localhost:5000/authentication/login",
      details
    );

    console.log(res.data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    alert("Login Successful");
  } catch (error) {
    alert("Login Failed");
    dispatch({
      type: LOGIN_FAILURE,
    });
    console.log(error);
  }
};

export const logout = () => (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};

export const AdminLogin = () => (dispatch) => {
  dispatch({ type: ADMIN_LOGIN });
};
