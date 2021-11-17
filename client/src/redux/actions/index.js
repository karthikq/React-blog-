/** @format */

import api from "../../api/Api";
import history from "../../history";

export const fetchUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");

    if (token) {
      const { data } = await api.get("/user/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        return dispatch({
          type: "USER_DETAILS",
          payload: data,
        });
      }
    } else {
      return dispatch({
        type: "NO_USER",
      });
    }
  } catch (error) {
    if (error) {
      return dispatch({
        type: "NO_USER",
      });
    }
  }
};
export const logoutUser = (history) => {
  return {
    type: "NO_USER",
  };
};
export const loginUser = (data, history) => async (dispatch) => {
  try {
    const resp = await api.post("/user/login", data);

    if (resp.data.noEmail) {
      return dispatch({
        type: "NO_EMAIL",
      });
    }
    if (resp.data.passwordErr) {
      return dispatch({
        type: "PASSWORD_ERR",
      });
    }
    if (!resp.data.noEmail && !resp.data.passwordErr) {
      localStorage.setItem("authToken", resp.data.token);
      dispatch({
        type: "LOGIN_USER",
        payload: resp.data.userData,
      });
      history.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = (data) => async (dispatch) => {
  try {
    const resp = await api.post("/user/register", data);
    console.log(resp.data);
    if (resp.data.usernameExists) {
      return dispatch({
        type: "USERNAME_EXISTS",
      });
    }
    if (resp.data.useremailExists) {
      return dispatch({
        type: "USEREMAIL_EXISTS",
      });
    }
    if (!resp.data.usernameExists && !resp.data.useremailExists) {
      localStorage.setItem("authToken", resp.data.token);
      dispatch({
        type: "REGISTER_USER",
        payload: resp.data,
      });
      return history.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};
