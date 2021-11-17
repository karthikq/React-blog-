/** @format */

import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";
import { PostsReducer } from "./PostsReducer";
import { UserReducer } from "./UserReducer";

export const reducers = combineReducers({
  Auth: AuthReducer,
  posts: PostsReducer,
  user: UserReducer,
});
