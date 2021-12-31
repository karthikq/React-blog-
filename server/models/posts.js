/** @format */

import mongoose from "mongoose";

const PostsSchema = mongoose.Schema(
  {
    fieldName: String,
    usersPost: [
      {
        title: String,
        post_Id: String,
        fieldName: String,
        description: String,
        status: String,
        like: {
          type: Number,
          default: 1,
        },
        dislike: {
          type: Number,
          default: 1,
        },
        image: String,
        userId: String,
        date: String,
        sortDate: String,
        profileUrl: String,
        userDetails: {},
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostsSchema);
export default Post;
