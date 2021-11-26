/** @format */

import { connect } from "react-redux";
import React, { useState } from "react";
import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import history from "../history";
import {
  LikePost,
  removedisLikes,
  removeLikes,
  DislikePost,
} from "../redux/actions/post";

const UserLikes = ({
  props,
  item,
  itemclass,
  iconClass,
  dislikeClass,
  likeActive,
}) => {
  const [loaderState, setloaderState] = useState(false);
  const [dislikeloaderState, setdislikeloaderState] = useState(false);
  const [selPost, setselPost] = useState("");

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
    // console.log(post);
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
    <React.Fragment>
      <span className={itemclass}>
        {props.user.Auth ? (
          props.user?.userData?.likes?.find(
            (user) => user.post_Id === item.post_Id
          ) ? (
            <AiTwotoneLike
              title="remove like"
              className={iconClass + " " + likeActive}
              onClick={() => removeLike(item)}
            />
          ) : (
            <BiLike
              title="like post"
              className={iconClass}
              onClick={() => handleLikes(item)}
            />
          )
        ) : (
          <BiLike
            title="like post"
            className={iconClass}
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
      <span className={itemclass}>
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
              title="reomve dislike"
              style={{
                transform: "scaleX(-1)",
              }}
              className={dislikeClass}
              onClick={() => removedisLike(item)}
            />
          ) : (
            <BiDislike
              title="dislike post"
              className={dislikeClass}
              onClick={() => handledisLikes(item)}
            />
          )
        ) : (
          <React.Fragment>
            <BiDislike
              title="dislike post"
              className={dislikeClass}
              onClick={() => history.push("/user/login")}
            />
          </React.Fragment>
        )}
      </span>
    </React.Fragment>
  );
};

export default connect(null, {
  LikePost,
  removedisLikes,
  removeLikes,
  DislikePost,
})(UserLikes);
