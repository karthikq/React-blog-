/** @format */

import express from "express";
import Post from "../models/posts.js";
import mommnet from "moment";
import { nanoid } from "nanoid";
import Authmiddleware from "../middleware/Authmiddleware.js";
import User from "../models/users.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("server is running");
});

router.post("/data/post", Authmiddleware, async (req, res) => {
  const date = mommnet().format("MMMM Do YYYY h:mm:ss a");
  const post_Id = nanoid();

  if (req.user) {
    try {
      const checkFieldName = await Post.findOne({
        fieldName: req.body.fieldName,
      });

      req.body.userId = req.user.userId;
      req.body.post_Id = post_Id;

      if (checkFieldName) {
        await Post.findOneAndUpdate(
          { fieldName: req.body.fieldName },
          { $push: { usersPost: req.body } },
          { new: true }
        );

        res.status(200).json(req.body);
      } else {
        const post = new Post({
          fieldName: req.body.fieldName,
          usersPost: req.body,
        });
        await post.save();
        res.status(200).json(req.body);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("err");
  }
});

router.get("/user/posts", async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

router.get("/post/user/:id", async (req, res) => {
  const userId = req.params.id;
  const userDetails = await User.findOne({ userId });
  if (userDetails) {
    res.json(userDetails);
  } else {
    res.json("no user found");
  }
});
router.patch("/post/like", async (req, res) => {
  const { userId, _id, post_Id, fieldName, loggedInuserId } = req.body;

  const checkPost = await Post.findOne({
    fieldName,
  });

  const elem = checkPost.usersPost.find((el) => el.post_Id === post_Id);

  const updateLikes = await User.findOneAndUpdate(
    { userId: loggedInuserId },
    {
      $push: { likes: { user: loggedInuserId, postuserId: userId, post_Id } },
    },
    { new: true }
  );
  await Post.findOneAndUpdate(
    { fieldName, "usersPost.post_Id": post_Id },
    {
      $set: { "usersPost.$.like": elem.like + 1 },
    },
    {
      new: true,
    }
  );
  const elem2 = checkPost.usersPost.find((el) => el.post_Id === post_Id);

  res.json({ elem2, updateLikes });
});

router.patch("/post/unlike/:id", async (req, res) => {
  const { userId, _id, post_Id, fieldName, loggedInuserId } = req.body;

  const checkPost = await Post.findOne({
    fieldName,
  });

  //finding userspost with post_Id
  const elem = checkPost.usersPost.find((el) => el.post_Id === post_Id);

  const removeuserLikes = await User.findOneAndUpdate(
    { userId: loggedInuserId },
    {
      $pull: { likes: { post_Id: post_Id } },
    },
    { new: true }
  );

  const removeLikes = await Post.findOneAndUpdate(
    { fieldName, "usersPost.post_Id": post_Id },
    {
      $set: { "usersPost.$.like": elem.like - 1 },
    },
    {
      new: true,
    }
  );
  const elem2 = removeLikes.usersPost.find((el) => el.post_Id === post_Id);

  res.json({ elem2, removeuserLikes });
});

export default router;
