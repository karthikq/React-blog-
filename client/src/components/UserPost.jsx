/** @format */

import React, { useEffect, useState } from "react";

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
import { MdPublic } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";

const UserPost = (props) => {
  const [postData, setPostData] = useState({});
  const [datap, setdatap] = useState(false);

  useEffect(() => {
    const data = props.posts.find(
      (elem) => elem.fieldName === props.item.fieldName
    );
    if (data) {
      setdatap(true);
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
    } else {
      setdatap(false);
    }
  }, [props]);

  const handleFav = (post) => {
    props.AddFav(post);
  };
  const removeFav = (post) => {
    props.RemoveFav(post);
  };
  console.log(postData);
  return (
    <>
      {datap && (
        <div className="up-userPost-box">
          <Link
            className="up-a-tag"
            to={`/post/?postId=${postData?.post_Id}&field=${postData?.fieldName}`}>
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
          {props.userState && (
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
          )}
          {props.userState && (
            <div className="up-userpost-status">
              {postData.status === "Public" ? (
                <Link
                  to={`/user/post/edit/${postData.post_Id}?field=${postData.fieldName}`}>
                  <MdPublic
                    title="Click here to change status"
                    className="up-userpost-status-icon"
                  />
                </Link>
              ) : (
                <Link
                  to={`/user/post/edit/${postData.post_Id}?field=${postData.fieldName}`}>
                  <RiGitRepositoryPrivateLine
                    title="Click here to change status"
                    className="up-userpost-status-icon"
                  />
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </>
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
