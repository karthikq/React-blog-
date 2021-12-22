/** @format */
const inittalState = [];
export const PostsReducer = (state = inittalState, action) => {
  switch (action.type) {
    case "CREATE_USER_POST":
      return [
        ...state,
        { fieldName: action.payload.fieldName, usersPost: [action.payload] },
      ];
    case "UPDATE_POST":
      return state.map((item, index) =>
        item.fieldName === action.payload.fieldName
          ? {
              ...item,
              usersPost: [...item.usersPost, action.payload],
            }
          : state[index]
      );
    case "LIKE_POST":
      return state.map((item, index) =>
        item.fieldName === action.payload.fieldName
          ? {
              ...item,
              usersPost: item.usersPost.map((el) =>
                el.post_Id === action.payload.post_Id
                  ? { ...el, like: el.like + 1 }
                  : el
              ),
            }
          : state[index]
      );

    case "REMOVE_LIKE":
      return state.map((item, index) =>
        item.fieldName === action.payload.fieldName
          ? {
              ...item,
              usersPost: item.usersPost.map((post) =>
                post.post_Id === action.payload.post_Id
                  ? { ...post, like: post.like - 1 }
                  : post
              ),
            }
          : state[index]
      );
    case "DISLIKE_POST":
      return state.map((item, index) =>
        item.fieldName === action.payload.fieldName
          ? {
              ...item,
              usersPost: item.usersPost.map((el) =>
                el.post_Id === action.payload.post_Id
                  ? { ...el, dislike: el.dislike + 1 }
                  : el
              ),
            }
          : state[index]
      );
    case "REMOVE_DISLIKE":
      return state.map((item, index) =>
        item.fieldName === action.payload.fieldName
          ? {
              ...item,
              usersPost: item.usersPost.map((post) =>
                post.post_Id === action.payload.post_Id
                  ? { ...post, dislike: post.dislike - 1 }
                  : post
              ),
            }
          : state[index]
      );
    case "FETCH_POST":
      return [...action.payload];
    case "UP_USER_POST":
      return state.map((items) =>
        items.fieldName === action.payload.fieldName
          ? { ...items, usersPost: action.payload.usersPost }
          : items
      );

    case "DELETE_POST":
      return state.map((item) =>
        item.fieldName === action.payload.fieldName
          ? {
              ...item,
              usersPost: item.usersPost.filter(
                (post) => post.post_Id !== action.payload.post_Id
              ),
            }
          : item
      );
    case "DELETE_POST_FIELD":
      return state.filter(
        (item) => item.fieldName !== action.payload.fieldName
      );
    default:
      return state;
  }
};
