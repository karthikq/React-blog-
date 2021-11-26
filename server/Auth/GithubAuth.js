/** @format */

import GitHubStrategy from "passport-github2";
import User from "../models/users.js";
import { nanoid } from "nanoid";
import { doesNotReject } from "assert";

const GithubLogin = (passport) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GIT_CLIENT_ID,
        clientSecret: process.env.GIT_CLIENT_SECRECT,
        callbackURL: "http://localhost:4000/auth/github/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        const chechGithubuser = await User.findOne({ githubId: profile.id });
        if (chechGithubuser) {
          return done(null, chechGithubuser);
        } else {
          const userId = nanoid();
          const newGithubUser = new User({
            username: profile.displayName.replace(/\s/g, "_"),
            githubId: profile.id,
            email:
              profile.emails.length > 0
                ? profile.emails[0].value
                : profile.nodeId,
            profileUrl: profile.photos[0].value,
            userId,
            date: new Date().toLocaleDateString(),
          });
          await newGithubUser.save();
          done(null, newGithubUser);
        }
        passport.serializeUser(function (user, done) {
          done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
          User.findById(id, function (err, user) {
            done(err, user);
          });
        });
      }
    )
  );
};

export default GithubLogin;
