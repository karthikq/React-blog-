/** @format */

import React, { useEffect, useState } from "react";
import "./up.styles.scss";
import { MdOutlineContacts, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useParams } from "react-router";
import { connect } from "react-redux";

import UserPost from "../../components/UserPost";
import { Link } from "react-router-dom";
import history from "../../history";
import UserSettings from "../../components/ProfileComp/UserSettings";
import { FiSettings } from "react-icons/fi";
import { BsHeart, BsHeartFill, BsListUl } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { MetaTags } from "../../components/MetaTags";

const UserProfle = ({ user, posts, otherusers }) => {
  const { id } = useParams();

  const [adminUser, setadminUser] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const { path } = window.Qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    if (id === user.userId) {
      setadminUser(true);
    } else {
      setadminUser(false);
      const userDfromState = otherusers.find((item) => item.userId === id);

      userDfromState && setUserDetails(userDfromState);
    }
  }, [id, user, otherusers]);

  const handleUserClick = (userselPath) => {
    history.push(`/user/profile/${id}?path=${userselPath}`);
  };
  return (
    <div className="up-container">
      <MetaTags
        title={`Profile | ${user ? user.username : userDetails?.username}`}
        description={`Articles of ${
          user ? user.username : userDetails.username
        }`}
      />
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
                <BsHeart /> Favorites
              </span>
              <MdOutlineKeyboardArrowRight className="up-arraow-icon" />
            </p>
            {!adminUser && (
              <p
                className={
                  path !== "contact" ? "up-p-tag" : "up-p-tag up-p-tag-active"
                }
                onClick={() => handleUserClick("contact")}>
                <span>
                  <MdOutlineContacts /> Contact
                </span>
                <MdOutlineKeyboardArrowRight className="up-arraow-icon" />
              </p>
            )}
          </div>
        </div>
        <div className="up-details">
          {path === "posts" && (
            <React.Fragment>
              {adminUser
                ? user.posts?.map((item, index) => (
                    <UserPost
                      item={item}
                      key={index}
                      state={true}
                      userState={true}
                    />
                  ))
                : userDetails?.posts?.map((item, index) => (
                    <UserPost
                      item={item}
                      key={index}
                      state={true}
                      userState={false}
                    />
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
                user.fav?.length > 0 ? (
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
          {path === "contact" ? (
            adminUser ? (
              ""
            ) : (
              <div className="contact-container">
                <h3>
                  Username :{" "}
                  <span style={{ fontWeight: 400 }}>
                    {userDetails?.username}
                  </span>
                </h3>
                <h4>
                  Email :
                  <span style={{ fontWeight: 400 }}>{userDetails?.email} </span>
                </h4>
                {/* <h5>
                  To Mail {userDetails.username}
                  <Link to="/"> Click here </Link>
                </h5> */}
              </div>
            )
          ) : (
            ""
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
