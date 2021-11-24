/** @format */

import React from "react";
import UserPostdetails from "../../components/UserPostDetails/UserPostdetails";
import "./fields.styles.scss";
import { FcLikePlaceholder } from "react-icons/fc";
import { RiShareBoxFill } from "react-icons/ri";

import UserLikes from "../../components/UserLikes";

import {
  DislikePost,
  LikePost,
  removedisLikes,
  removeLikes,
} from "../../redux/actions/post";
import { connect } from "react-redux";
import ImageFlip from "../../ImageFlip/ImageFlip";
import { Link } from "react-router-dom";

const Fields = (props) => {
  return (
    <div className="field-container">
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

          <UserPostdetails post={props.item?.usersPost[0]} userclass="avatar" />
          <span>
            {props.item.usersPost[0]?.description.length > 30 ? (
              <React.Fragment>
                {props.item.usersPost[0]?.description.substring(0, 50) + "... "}
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
          {props.item.usersPost.map((post, index) => (
            <div className="field-right-items" key={index}>
              <div className="field-fav">
                <FcLikePlaceholder className="fav-icon" />
              </div>
              <Link
                className="fieldatag"
                style={{ textDecoration: "none" }}
                to={`/post/?postId=${props.item.usersPost[0]?.post_Id}&field=${props.item?.usersPost[0]?.fieldName}`}>
                <h3>{post.title} </h3>
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
              <Link
                to={`/post/?postId=${post.post_Id}&field=${post.fieldName}`}>
                <div className="open-item" title="Read Post">
                  <RiShareBoxFill />
                </div>
              </Link>

              <p className="post-date">{post.date?.substring(0, 19)}</p>
            </div>
          ))}
        </div>
      </div>
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
})(Fields);
