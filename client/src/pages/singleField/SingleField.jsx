/** @format */

import React, { useEffect, useState } from "react";
import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import { connect } from "react-redux";
import { useParams } from "react-router";
import UserPostdetails from "../../components/UserPostDetails/UserPostdetails";
import history from "../../history";
import {
  DislikePost,
  FetchPosts,
  LikePost,
  removedisLikes,
  removeLikes,
} from "../../redux/actions/post";
import "./sfield.styles.scss";

const SingleField = (props) => {
  const [posts, setPosts] = useState("");
  const [loaderState, setloaderState] = useState(false);
  const [dislikeloaderState, setdislikeloaderState] = useState(false);
  const [selPost, setselPost] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const FieldPost = props.userposts.find(
      (item) => item.fieldName.toLowerCase() === id
    );
    setPosts(FieldPost);
  }, [id, props]);

  const handleLikes = async (post) => {
    const checkLike = props.user.userData.dislikes.find(
      (elem) => elem.post_Id === post.post_Id
    );
    if (checkLike) {
      props.removedisLikes(post);
    }
    setloaderState(true);
    setselPost(post.post_Id);
    await props.LikePost(post);
    setloaderState(false);
  };
  const handledisLikes = async (post) => {
    console.log(post);
    //finding if user altreafy liked
    const checkLike = props.user.userData.likes.find(
      (elem) => elem.post_Id === post.post_Id
    );
    if (checkLike) {
      props.removeLikes(post);
    }
    setdislikeloaderState(true);
    setselPost(post.post_Id);
    await props.DislikePost(post);
    setdislikeloaderState(false);
  };
  const removeLike = (post) => {
    props.removeLikes(post);
  };
  const removedisLike = (post) => {
    props.removedisLikes(post);
  };
  return (
    <div className="sfield-container">
      <div className="sfield-contents">
        <div className="sfield-header">
          <div className="box"></div>
          <h2>{posts?.fieldName}</h2>
        </div>
        <div className="sfield-posts">
          {posts?.usersPost?.map((item, index) => (
            <div
              className={
                (index + 1) % 2 === 0
                  ? "sfield-post-box post-align-left"
                  : "sfield-post-box"
              }
              key={index}>
              <div
                className={
                  (index + 1) % 2 === 0
                    ? "sfield-post-text sfield-text-align"
                    : "sfield-post-text"
                }>
                <h3>{item.title}</h3>
                <UserPostdetails
                  post={item}
                  class={
                    (index + 1) % 2 === 0 ? "avatar avatar-align" : "avatar"
                  }
                />
                <span className="sfield-desp">
                  {item.description.length > 10
                    ? item.description.substring(0, 100) + "..."
                    : item.description}
                </span>
              </div>
              <div className="sfield-image">
                <img src={item.image} alt="postimage" />
              </div>
              <div className="sfield-likes">
                <span>
                  {props.user.Auth ? (
                    props.user?.userData?.likes?.find(
                      (user) => user.post_Id === item.post_Id
                    ) ? (
                      <AiTwotoneLike
                        className="sfield-like-icon"
                        onClick={() => removeLike(item)}
                      />
                    ) : (
                      <BiLike
                        className="sfield-like-icon"
                        onClick={() => handleLikes(item)}
                      />
                    )
                  ) : (
                    <BiLike
                      className="sfield-like-icon"
                      onClick={() => history.push("/user/login")}
                    />
                  )}
                  {props.user.Auth && !loaderState ? (
                    item.like
                  ) : selPost === item.post_Id ? (
                    <div className="sfield-loading">
                      <span className="sfield-loading-span"></span>{" "}
                    </div>
                  ) : (
                    item.like
                  )}
                </span>
                <span>
                  {props.user.Auth && !dislikeloaderState ? (
                    item.dislike
                  ) : selPost === item.post_Id ? (
                    <div className="sfield-loading">
                      <span className="sfield-loading-span"></span>{" "}
                    </div>
                  ) : (
                    item.dislike
                  )}
                  {props.user.Auth ? (
                    props.user.userData?.dislikes?.find(
                      (elem) => elem.post_Id === item.post_Id
                    ) ? (
                      <AiTwotoneDislike
                        style={{
                          transform: "scaleX(-1)",
                        }}
                        className="sfield-like-icon sfield-dislike-icon dislike-fill"
                        onClick={() => removedisLike(item)}
                      />
                    ) : (
                      <BiDislike
                        className="sfield-like-icon sfield-dislike-icon"
                        onClick={() => handledisLikes(item)}
                      />
                    )
                  ) : (
                    <>
                      {item.dislike}
                      <BiDislike
                        className="sfield-like-icon sfield-dislike-icon"
                        onClick={() => history.push("/user/login")}
                      />
                    </>
                  )}
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
  return { userposts: state.posts, user: state.Auth };
};
export default connect(mapStateToProps, {
  FetchPosts,
  LikePost,
  removeLikes,
  DislikePost,
  removedisLikes,
})(SingleField);
