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

    case "DISLIKE_POST_USER":
      return state.map((user) =>
        user.userId === action.payload.userId
          ? { ...user, dislikes: action.payload.dislikes }
          : user
      );

    default:
      return state;
  }
};
