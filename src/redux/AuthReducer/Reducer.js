import {
  ADMIN_LOGIN,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../ActionTypes";

const InitialState = {
  isAuthenticated: false,
  username: null,
  fullname: null,
  email: null,
  token: null,
  error: null,
  loading: false,
  isAdmin: false,
};

export const AuthReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        error: null,
        fullname: null,
        email: null,
        username: null,
        token: null,
        isAdmin: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
        username: payload.username,
        fullname: payload.fullname,
        email: payload.email,
        token: payload.token,
        isAdmin: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: payload,
        fullname: null,
        email: null,
        username: null,
        token: null,
        isAdmin: false,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: null,
        fullname: null,
        email: null,
        username: null,
        token: null,
        isAdmin: false,
      };

    case ADMIN_LOGIN:
      return {
        ...state,
        isAdmin: true,
        loading: false,
        isAuthenticated: false,
        error: null,
        fullname: null,
        email: null,
        username: null,
        token: null,
      };
    default:
      return state;
  }
};
