/** @format */

import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = express.Router();
const port = process.env.PORT || 4000;

function Checkenv2() {
  if (port === 4000) {
    return "http://localhost:3000";
  } else {
    return "https://reactblogwebsite.netlify.app";
  }
}

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

  const username = req.user.username;
  res.redirect(Checkenv2() + "/?user=" + token + "&username=" + username);
});
export default router;
