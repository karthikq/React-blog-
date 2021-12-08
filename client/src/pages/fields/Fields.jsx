/** @format */

import React, { useState } from "react";
import UserPostdetails from "../../components/UserPostDetails/UserPostdetails";
import "./fields.styles.scss";
import { FcLikePlaceholder } from "react-icons/fc";
import { RiShareBoxFill, RiDeleteBinLine } from "react-icons/ri";
import SweetAlert from "react-bootstrap-sweetalert";
import UserLikes from "../../components/UserLikes";
import { Toaster } from "react-hot-toast";
import { BsFillHeartFill } from "react-icons/bs";

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

const Fields = (props) => {
  const [alertState, setAlertState] = useState(false);
  const [alertsucessState, setAlertsucessState] = useState(false);
  const [selPost, setselPost] = useState("");

  const handleDelete = (post) => {
    setselPost(post);
    setAlertState(true);
  };
  const confirmDelete = () => {
    props.DeletePost(selPost);
    // setAlertState(true);
    setAlertsucessState(true);
  };

  const handleFav = (post) => {
    props.AddFav(post);
  };
  const removeFav = (post) => {
    props.RemoveFav(post);
  };
  return (
    <div className="field-container">
      {alertState ? (
        <div className="alert-container">
          {alertsucessState ? (
            <SweetAlert
              success
              title="Post Deleted"
              confirmBtnCssClass="con-btn"
              onConfirm={() => {
                setAlertsucessState(false);
                setAlertState(false);
              }}>
              <span style={{ fontSize: "1rem" }}> You Deleted the post</span>
              <p
                style={{
                  fontWeight: 500,
                  margin: "0.5rem 0",
                  color: "green",
                  fontSize: "1.02rem",
                }}>
                {selPost.title.substring(0, 30) + "..."}
              </p>
            </SweetAlert>
          ) : (
            <SweetAlert
              warning
              showCancel
              confirmBtnText="Yes, delete it!"
              confirmBtnBsStyle="danger"
              cancelBtnCssClass="can-btn"
              confirmBtnCssClass="con-btn"
              title="Are you sure?"
              onConfirm={() => {
                confirmDelete();
              }}
              onCancel={() => setAlertState(false)}
              focusCancelBtn>
              You will not be able to recover this Post!{" "}
            </SweetAlert>
          )}
          <Toaster />
        </div>
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
                imageLink={props.item?.usersPost[0].image}
                imageClass={"post-left-img"}
              />
              <Link
                style={{ textDecoration: "none" }}
                to={`/post/?postId=${props.item.usersPost[0]?.post_Id}&field=${props.item?.usersPost[0]?.fieldName}`}>
                <h3>{props.item.usersPost[0]?.title}</h3>
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
          </Link> */}
            </div>
            <div className="field-right-content">
              <p className="field-right-header">Related Articles</p>
              {props.item.usersPost.map((post, index) => (
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
                    to={`/post/?postId=${props.item.usersPost[0]?.post_Id}&field=${props.item?.usersPost[0]?.fieldName}`}>
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
                    <Link
                      to={`/post/?postId=${post.post_Id}&field=${post.fieldName}`}>
                      <div className="open-item" title="Read Post">
                        <RiShareBoxFill />
                      </div>
                    </Link>
                    {props.user.Auth &&
                      props.user.userData.userId === post.userId && (
                        <div
                          className="delete-item"
                          title="Delete Post"
                          onClick={() => handleDelete(post)}>
                          <RiDeleteBinLine />
                        </div>
                      )}
                  </div>
                  <p className="post-date">{post.date?.substring(0, 19)}</p>
                </div>
              ))}
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
