/** @format */

import { nanoid } from "nanoid";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/users.js";

async function GoogleAuth(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:4000/auth/google/login",
      },
      async function (token, refreshToken, profile, cb) {
        try {
          const userExists = await User.findOne({ googleId: profile.id });
          if (userExists) {
            return cb(null, userExists);
          } else {
            const userId = nanoid();
            const newUser = new User({
              username: profile.displayName.replace(/\s/g, "_"),
              googleId: profile.id,
              email: profile.emails[0].value,
              profileUrl: profile.photos[0].value,
              userId,
              date: new Date().toLocaleDateString(),
            });
            await newUser.save();
            cb(null, newUser);
          }
        } catch (error) {
          cb(error);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  console.log("user");
}
export default GoogleAuth;
