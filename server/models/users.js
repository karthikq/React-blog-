/** @format */

import mongoose from "mongoose";

const PostsSchema = mongoose.Schema(
  {
    username: String,
    googleId: String,
    email: String,
    password: String,
    date: Date,
    userId: String,
    posts: [],
    likes: [],
    fav: [],
    profileUrl: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", PostsSchema);
export default User;
