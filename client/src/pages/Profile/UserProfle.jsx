/** @format */

import React, { useEffect, useState } from "react";
import "./up.styles.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useParams } from "react-router";
import { connect } from "react-redux";

import UserPost from "../../components/UserPost";
import { Link } from "react-router-dom";
import history from "../../history";
import UserSettings from "../../components/ProfileComp/UserSettings";

const UserProfle = ({ user, posts }) => {
  const { id } = useParams();

  const [userPosts, setUserPost] = useState([]);
  const [userpath, setUserpath] = useState("");
  const [adminUser, setadminUser] = useState(false);

  useEffect(() => {
    if (id === user.userId) {
      setadminUser(true);
    }
  }, [id, user]);

  const { path } = window.Qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    if (path) setUserpath(path);
  }, [path]);
  const handleUserClick = (userselPath) => {
    setUserpath(userselPath);
    history.push(`/user/profile/${id}?path=${userselPath}`);
  };
  return (
    <div className="up-container">
      <div className="up-contents">
        <div className="up-sidebar">
          <div className="up-profile-img">
            <img src={user.profileUrl} alt="err" />
          </div>
          <div className="up-sidebar-details">
            <p
              className={
                path !== "posts" ? "up-p-tag" : "up-p-tag up-p-tag-active"
              }
              onClick={() => handleUserClick("posts")}>
              Posts <MdOutlineKeyboardArrowRight />
            </p>
            {adminUser && (
              <p
                className={
                  path !== "settings" ? "up-p-tag" : "up-p-tag up-p-tag-active"
                }
                onClick={() => handleUserClick("settings")}>
                Settings <MdOutlineKeyboardArrowRight />
              </p>
            )}
            {adminUser && (
              <p
                className={
                  path !== "likes" ? "up-p-tag" : "up-p-tag  up-p-tag-active"
                }
                onClick={() => handleUserClick("likes")}>
                Likes <MdOutlineKeyboardArrowRight />
              </p>
            )}
            <p
              className={
                path !== "favorites" ? "up-p-tag" : "up-p-tag up-p-tag-active"
              }
              onClick={() => handleUserClick("favorites")}>
              favorites <MdOutlineKeyboardArrowRight />
            </p>
          </div>
        </div>
        <div className="up-details">
          {path === "posts" &&
            user.posts?.map((item, index) => (
              <UserPost item={item} key={index} />
            ))}
          {path === "settings" && <UserSettings userData={user} />}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { user: state.Auth.userData, posts: state.posts };
};
export default connect(mapStateToProps)(UserProfle);
