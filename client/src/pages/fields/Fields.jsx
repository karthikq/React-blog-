/** @format */

import React, { useState } from "react";

import UserPostdetails from "../../components/UserPostDetails/UserPostdetails";
import "./fields.styles.scss";
import { FaRegUserCircle, FaUserAlt } from "react-icons/fa";
import {
  RiShareBoxFill,
  RiDeleteBinLine,
  RiEditBoxLine,
  RiUser2Fill,
  RiUserLine,
} from "react-icons/ri";
import { Menu, Dropdown } from "antd";
import UserLikes from "../../components/UserLikes";

import { BsFillHeartFill, BsThreeDots } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";

import {
  AddFav,
  DeletePost,
  DislikePost,
  LikePost,
  removedisLikes,
  RemoveFav,
  removeLikes,
} from "../../redux/actions/post";
import { connect } from "react-redux";
import ImageFlip from "../../ImageFlip/ImageFlip";
import { Link } from "react-router-dom";
import FavComp from "../../components/FavComp";
import Alert from "../../components/alert/Alert";
import "antd/dist/antd.less";

const Fields = (props) => {
  const [alertState, setAlertState] = useState(false);
  const [alertsucessState, setAlertsucessState] = useState(false);
  const [dropdownState, setdropdownState] = useState(false);
  const [selPost, setselPost] = useState("");
  const [dropdownPost, setdropdownPost] = useState("");

  const handleDelete = (post) => {
    console.log(post);
    setselPost(post);
    setAlertState(true);
  };

  const handleFav = (post) => {
    props.AddFav(post);
  };
  const removeFav = (post) => {
    props.RemoveFav(post);
  };
  const confirmDelete = () => {
    props.DeletePost(selPost);
    // setAlertState(true);
    setAlertsucessState(true);
  };

  const handlePost = (post) => {
    setdropdownPost(post);
    setdropdownState(true);
  };

  return (
    <div className="field-container">
      {alertState ? (
        <Alert
          setAlertsucessState={setAlertsucessState}
          setAlertState={setAlertState}
          alertsucessState={alertsucessState}
          DeletePost={props.DeletePost}
          confirmDelete={confirmDelete}
          selPost={selPost}
        />
      ) : (
        <React.Fragment>
          <div className="field-header">
            <div className="field-header-name">
              <div className="box"></div>
              <h2>{props.item?.fieldName} </h2>
            </div>
            <Link
              to={`/field/${props.item?.fieldName}`}
              style={{ textDecoration: "none" }}>
              <span className="field-header-span">
                All {props.item?.fieldName} articles
              </span>
            </Link>
          </div>
          <div className="field-contents">
            <div className="field-left-content">
              <ImageFlip
                imageLink={props.item?.usersPost[0]?.image}
                imageClass={"post-left-img"}
              />
              <Link
                style={{ textDecoration: "none" }}
                to={`/post/?postId=${props.item.usersPost[0]?.post_Id}&field=${props.item?.usersPost[0]?.fieldName}`}>
                <h3> {props.item.usersPost[0]?.title}</h3>
              </Link>
              <UserPostdetails
                post={props.item?.usersPost[0]}
                userclass="avatar"
              />
              <span>
                {props.item.usersPost[0]?.description.length > 30 ? (
                  <React.Fragment>
                    {props.item.usersPost[0]?.description.substring(0, 50) +
                      "... "}
                    <Link
                      to={`/post/?postId=${props.item.usersPost[0]?.post_Id}&field=${props.item?.usersPost[0]?.fieldName}`}
                      className="readtag">
                      Read more
                    </Link>
                  </React.Fragment>
                ) : (
                  props.item.usersPost[0]?.description
                )}
              </span>
              {/* <Link
            to={`/post/?postId=${props.item.usersPost[0]?.post_Id}&field=${props.item?.usersPost[0]?.fieldName}`}>
            <div className="open-left-item">
              <RiShareBoxFill />
            </div>
          </Link> */}{" "}
            </div>
            <div
              className={
                props.item.usersPost.length > 1
                  ? "field-right-content"
                  : "field-right-content field-right-nocontent"
              }>
              <p className="field-right-header">
                {props.item.usersPost.length > 1 && "Related Articles"}
              </p>
              {props.item.usersPost.map((post, index) =>
                index >= 0 ? (
                  <div className="field-right-items" key={index}>
                    <FavComp
                      addFav={handleFav}
                      removeFav={removeFav}
                      post={post}
                      user={props.user}
                      itemClass="field-fav"
                      iconClass="fav-icon"
                      favClass="fav-fill"
                    />
                    <Link
                      className="fieldatag"
                      style={{ textDecoration: "none" }}
                      to={`/post/?postId=${post?.post_Id}&field=${post?.fieldName}`}>
                      <h3>
                        {post.title.length > 70
                          ? post.title.substring(0, 50) + " ..."
                          : post.title}{" "}
                      </h3>
                    </Link>

                    <UserPostdetails post={post} userclass="avatar" />
                    <span className="field-desp">
                      <React.Fragment>
                        {post.description.length > 30 ? (
                          <React.Fragment>
                            {post.description.substring(0, 50) + "... "}
                            <Link
                              className="readtag"
                              to={`/post/?postId=${post.post_Id}&field=${post.fieldName}`}>
                              Read more
                            </Link>
                          </React.Fragment>
                        ) : (
                          post.description
                        )}
                      </React.Fragment>
                    </span>
                    <div className="field-likes">
                      <UserLikes
                        props={props}
                        item={post}
                        itemclass={"likes"}
                        iconClass={"like-icons"}
                        dislikeClass={"like-icons dislike"}
                      />
                    </div>

                    <div className="user-options">
                      <div className="dropdown-item-container">
                        {dropdownPost.post_Id === post.post_Id ? (
                          <IoIosCloseCircleOutline
                            className="dropdown-item-icon"
                            onClick={() => {
                              setdropdownPost("");
                              setdropdownState(false);
                            }}
                          />
                        ) : (
                          <BsThreeDots
                            className="dropdown-item-icon"
                            onClick={() => handlePost(post)}
                          />
                        )}
                        {dropdownPost.post_Id === post.post_Id &&
                          dropdownState && (
                            <div className="dropdown-items-list">
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                                to={`/post/?postId=${post.post_Id}&field=${post.fieldName}`}>
                                {" "}
                                <span>
                                  <RiShareBoxFill
                                    style={{ marginRight: "0.3rem" }}
                                  />
                                  Read Post
                                </span>{" "}
                              </Link>

                              {props.user.Auth &&
                                props.user.userData.userId === post.userId && (
                                  <React.Fragment>
                                    <span>
                                      <RiEditBoxLine
                                        style={{ marginRight: "0.3rem" }}
                                      />
                                      Edit Post
                                    </span>
                                    <span onClick={() => handleDelete(post)}>
                                      <RiDeleteBinLine
                                        style={{ marginRight: "0.3rem" }}
                                      />
                                      Delete Post
                                    </span>
                                  </React.Fragment>
                                )}
                              <span>
                                <RiUserLine style={{ marginRight: "0.3rem" }} />
                                User details
                              </span>
                            </div>
                          )}
                      </div>

                      {/* <Link
                        to={`/post/?postId=${post.post_Id}&field=${post.fieldName}`}>
                        <div className="open-item" title="Read Post">
                          <RiShareBoxFill />
                        </div>
                      </Link> */}
                      {/* {props.user.Auth &&
                        props.user.userData.userId === post.userId && (
                          <div
                            className="delete-item"
                            title="Delete Post"
                            onClick={() => handleDelete(post)}>
                            <RiDeleteBinLine />
                          </div>
                        )} */}
                    </div>
                    <p className="post-date">{post.date?.substring(0, 19)}</p>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { user: state.Auth };
};

export default connect(mapStateToProps, {
  LikePost,
  removeLikes,
  removedisLikes,
  DislikePost,
  DeletePost,
  AddFav,
  RemoveFav,
})(Fields);
