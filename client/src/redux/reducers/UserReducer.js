/** @format */

export const UserReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USER":
      return [...state, action.payload];
    case "UPDATE_USER":
      return state.map((user) =>
        user.userId === action.payload.userId
          ? { ...user, likes: action.payload.likes }
          : user
      );
    case "REMOVE_USER_LIKE":
      return state.map((user) =>
        user.userId === action.payload.userId
          ? { ...user, likes: action.payload.likes }
          : user
      );
    default:
      return state;
  }
};
