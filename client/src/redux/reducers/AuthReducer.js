/** @format */
const initialState = {
  Auth: false,
  userData: "",
  usernameExists: null,
  useremailExists: null,
  noEmail: null,
  passwordErr: null,
  token: null,
};
export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        Auth: true,
        passwordErr: false,
        noEmail: false,
        userData: action.payload,
      };
    case "NO_USER":
      return { ...state, Auth: false };

    case "NO_EMAIL":
      return { ...state, noEmail: true };

    case "PASSWORD_ERR":
      return { ...state, passwordErr: true, noEmail: false };

    case "USERNAME_EXISTS":
      return { ...state, usernameExists: true };

    case "USEREMAIL_EXISTS":
      return { ...state, useremailExists: true, usernameExists: false };

    case "USER_DETAILS":
      return { ...state, Auth: true, userData: action.payload };

    case "REGISTER_USER":
      return {
        ...state,
        Auth: true,
        useremailExists: false,
        usernameExists: false,
        userData: action.payload.userData,
      };
    case "UPDATE_AUTH_USER":
      return {
        ...state,
        userData: { ...state.userData, likes: action.payload.likes },
      };

    case "DISLIKE_POST_USER_AUTH":
      return {
        ...state,
        userData: { ...state.userData, dislikes: action.payload.dislikes },
      };
    case "ADD_FAV":
      return {
        ...state,
        userData: { ...state.userData, fav: action.payload.fav },
      };
    case "REMOVE_FAV":
      return {
        ...state,
        userData: { ...state.userData, fav: action.payload.fav },
      };
    case "UPDATE_USER":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};
