/** @format */

import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/login", passport.authenticate("google"), (req, res) => {
  const token = jwt.sign(
    { userId: req.user.userId, email: req.user.email },
    "key",
    { expiresIn: "24h" }
  );

  res.redirect("http://localhost:3000/?user=" + token);
});
export default router;
