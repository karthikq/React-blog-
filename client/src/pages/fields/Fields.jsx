/** @format */

import React from "react";
import UserPostdetails from "../../components/UserPostDetails/UserPostdetails";
import "./fields.styles.scss";

import { FcLikePlaceholder } from "react-icons/fc";
import { BiDislike, BiLike } from "react-icons/bi";
import { AiTwotoneLike } from "react-icons/ai";
import { LikePost, removeLikes } from "../../redux/actions/post";
import { connect } from "react-redux";

const Fields = (props) => {
  const randomNumber = Math.floor(Math.random() * props.item.usersPost.length);
  const handleLikes = (postId) => {
    props.LikePost(postId);
  };
  const handledisLikes = (postId) => {
    console.log(postId);
  };
  const removeLike = (post) => {
    props.removeLikes(post);
  };
  return (
    <div className="field-container">
      <div className="field-header">
        <div className="field-header-name">
          <div className="box"></div>
          <h2>{props.item.fieldName} </h2>
        </div>
        <span className="field-header-span">
          All {props.item.fieldName} articles
        </span>
      </div>
      <div className="field-contents">
        <div className="field-left-content">
          <img
            src={props.item.usersPost[randomNumber].image}
            className="post-left-img"
            alt="postimage"
          />
          <h3>{props.item.usersPost[randomNumber].title}</h3>
          <UserPostdetails post={props.item.usersPost[randomNumber]} />
          <span>
            {props.item.usersPost[randomNumber].description.substring(0, 20) +
              "..."}
          </span>
        </div>
        <div className="field-right-content">
          {props.item.usersPost.map((post, index) => (
            <div className="field-right-items" key={index}>
              <div className="field-fav">
                <FcLikePlaceholder className="fav-icon" />
              </div>
              <h3>{post.title} </h3>
              <UserPostdetails post={post} />
              <span className="field-desp">
                {post.description.substring(0, 100) + "..."}
              </span>
              <div className="field-likes">
                <span className="likes">
                  {props.userDetails?.userData?.likes.find(
                    (user) => user.post_Id === post.post_Id
                  ) ? (
                    <AiTwotoneLike
                      className="like-icons"
                      onClick={() => removeLike(post)}
                    />
                  ) : (
                    <BiLike
                      className="like-icons"
                      onClick={() => handleLikes(post)}
                    />
                  )}

                  {post.like}
                </span>
                <span className="likes">
                  <BiDislike
                    className="like-icons dislike"
                    onClick={() => handledisLikes(post)}
                  />{" "}
                  1
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { userDetails: state.Auth };
};

export default connect(mapStateToProps, { LikePost, removeLikes })(Fields);
