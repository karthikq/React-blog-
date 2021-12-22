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
import { FiSettings } from "react-icons/fi";
import { BsHeart, BsHeartFill, BsListUl } from "react-icons/bs";
import { BiLike } from "react-icons/bi";

const UserProfle = ({ user, posts, otherusers }) => {
  const { id } = useParams();

  const [userPosts, setUserPost] = useState([]);
  const [userpath, setUserpath] = useState("");
  const [adminUser, setadminUser] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (id === user.userId) {
      setadminUser(true);
    } else {
      const userDfromState = otherusers.find((item) => item.userId === id);

      setUserDetails(userDfromState);
    }
  }, [id, user, otherusers]);

  const { path } = window.Qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  const handleUserClick = (userselPath) => {
    history.push(`/user/profile/${id}?path=${userselPath}`);
  };
  return (
    <div className="up-container">
      <div className="up-contents">
        <div className="up-sidebar">
          <div className="up-profile-img">
            {adminUser ? (
              <img src={user.profileUrl} alt="err" />
            ) : (
              <img src={userDetails?.profileUrl} alt="err" />
            )}
          </div>
          <div className="up-sidebar-details">
            <p
              className={
                path !== "posts" ? "up-p-tag" : "up-p-tag up-p-tag-active"
              }
              onClick={() => handleUserClick("posts")}>
              {" "}
              <span>
                <BsListUl /> Posts{" "}
              </span>
              <MdOutlineKeyboardArrowRight className="up-arraow-icon" />
            </p>
            {adminUser && (
              <p
                className={
                  path !== "settings" ? "up-p-tag" : "up-p-tag up-p-tag-active"
                }
                onClick={() => handleUserClick("settings")}>
                <span>
                  <FiSettings /> Settings{" "}
                </span>

                <MdOutlineKeyboardArrowRight className="up-arraow-icon" />
              </p>
            )}
            {adminUser && (
              <p
                className={
                  path !== "likes" ? "up-p-tag" : "up-p-tag  up-p-tag-active"
                }
                onClick={() => handleUserClick("likes")}>
                {" "}
                <span>
                  <BiLike /> Likes
                </span>
                <MdOutlineKeyboardArrowRight className="up-arraow-icon" />
              </p>
            )}
            <p
              className={
                path !== "favorites" ? "up-p-tag" : "up-p-tag up-p-tag-active"
              }
              onClick={() => handleUserClick("favorites")}>
              <span>
                <BsHeart /> favorites
              </span>
              <MdOutlineKeyboardArrowRight className="up-arraow-icon" />
            </p>
          </div>
        </div>
        <div className="up-details">
          {path === "posts" && (
            <React.Fragment>
              {adminUser
                ? user.posts?.map((item, index) => (
                    <UserPost item={item} key={index} state={true} />
                  ))
                : userDetails?.posts?.map((item, index) => (
                    <UserPost item={item} key={index} state={true} />
                  ))}
            </React.Fragment>
          )}

          {path === "settings" && <UserSettings userData={user} />}
          {path === "likes" && (
            <React.Fragment>
              {user.likes?.length > 0 ? (
                user.likes.map((item, index) => (
                  <UserPost
                    item={item}
                    key={index}
                    state={true}
                    userState={true}
                  />
                ))
              ) : (
                <h2>No Items found</h2>
              )}
            </React.Fragment>
          )}

          {path === "favorites" && (
            <React.Fragment>
              {adminUser ? (
                user.fav.length > 0 ? (
                  user.fav?.map((item, index) => (
                    <UserPost
                      item={item}
                      key={index}
                      state={false}
                      userState={true}
                    />
                  ))
                ) : (
                  <h2>No Posts found</h2>
                )
              ) : userDetails?.fav?.length > 0 ? (
                userDetails?.fav?.map((item, index) => (
                  <UserPost
                    item={item}
                    key={index}
                    state={false}
                    userState={false}
                  />
                ))
              ) : (
                <h2>No Favorites items found</h2>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.Auth.userData,
    posts: state.posts,
    otherusers: state.user,
  };
};
export default connect(mapStateToProps)(UserProfle);
