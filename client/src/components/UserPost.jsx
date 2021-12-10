/** @format */

import React, { useEffect, useState } from "react";
import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import { connect } from "react-redux";
import UserLikes from "./UserLikes";
import {
  DislikePost,
  LikePost,
  removedisLikes,
  removeLikes,
  AddFav,
  RemoveFav,
} from "../redux/actions/post/index";
import { Link } from "react-router-dom";
import FavComp from "./FavComp";

const UserPost = (props) => {
  const [postData, setPostData] = useState({});

  useEffect(() => {
    const data = props.posts.find(
      (elem) => elem.fieldName === props.item.fieldName
    );
    console.log(data);
    if (props.state) {
      const res = data?.usersPost?.filter(
        (item) => item.post_Id === props.item.post_Id
      );
      res && setPostData(res[0]);
    } else {
      const res = data?.usersPost?.filter(
        (item) => item.post_Id === props.item.fav_postId
      );

      res && setPostData(res[0]);
    }
  }, [props]);

  const handleFav = (post) => {
    props.AddFav(post);
  };
  const removeFav = (post) => {
    props.RemoveFav(post);
  };
  return (
    <div className="up-userPost-box">
      <Link
        className="up-a-tag"
        to={`/post/?postId=${postData.post_Id}&field=${postData.fieldName}`}>
        <h2>{postData?.title}</h2>
      </Link>
      <p>
        {postData.description?.length > 80 ? (
          <React.Fragment>
            {postData.description.substring(0, 80) + "..."}
            <Link
              to={`/post/?postId=${postData.post_Id}&field=${postData.fieldName}`}
              className="readtag">
              read more
            </Link>
          </React.Fragment>
        ) : (
          postData.description
        )}
      </p>
      <div className="up-userpost-likes">
        <UserLikes
          props={props}
          item={postData}
          itemclass={"up-likes"}
          iconClass={"up-like-icon"}
          dislikeClass={"up-like-icon up-dislike-icon"}
        />
      </div>
      <div className="up-userpost-fav">
        <FavComp
          addFav={handleFav}
          removeFav={removeFav}
          post={postData}
          itemClass="up-userpost-item-fav"
          iconClass="up-userpost-item-fav-icon"
          favClass="up-userpost-item-icon-fill"
          user={props.user}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { posts: state.posts, user: state.Auth };
};
export default connect(mapStateToProps, {
  LikePost,
  removeLikes,
  removedisLikes,
  DislikePost,
  AddFav,
  RemoveFav,
})(UserPost);
