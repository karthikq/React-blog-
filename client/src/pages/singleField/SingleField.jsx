/** @format */

import React, { useEffect, useState } from "react";
import "./sfield.styles.scss";

import { connect } from "react-redux";
import { useParams } from "react-router";
import UserLikes from "../../components/UserLikes";
import UserPostdetails from "../../components/UserPostDetails/UserPostdetails";
import SfieldAnimation from "../../lottie/SfieldAnimation";

import {
  AddFav,
  DislikePost,
  LikePost,
  removedisLikes,
  RemoveFav,
  removeLikes,
} from "../../redux/actions/post";
import ImageFlip from "../../ImageFlip/ImageFlip";
import { Link } from "react-router-dom";
import FavComp from "../../components/FavComp";

const SingleField = (props) => {
  const [posts, setPosts] = useState("");
  const [itemState, setitemState] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const FieldPost = props.userposts.find(
      (item) => item.fieldName.toLowerCase() === id.toLowerCase()
    );
    if (FieldPost) {
      setPosts(FieldPost);
      setitemState(true);
    } else {
      setitemState(false);
    }
  }, [id, props]);
  const handleFav = (post) => {
    props.AddFav(post);
  };
  const removeFav = (post) => {
    props.RemoveFav(post);
  };
  return (
    <div className="sfield-container">
      {itemState ? (
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
                    userclass={
                      (index + 1) % 2 === 0 ? "avatar avatar-align" : "avatar"
                    }
                  />
                  <span className="sfield-desp">
                    {item.description.length > 50 ? (
                      <React.Fragment>
                        {item.description.substring(0, 100) + "... "}
                        <Link
                          to={`/post/?postId=${item.post_Id}&field=${item.fieldName}`}
                          className="readtag">
                          Read more
                        </Link>
                      </React.Fragment>
                    ) : (
                      item.description
                    )}
                  </span>
                </div>
                <div className="sfield-image">
                  <ImageFlip imageLink={item.image} imageClass="postimage" />
                </div>

                <div className="sfield-likes">
                  <UserLikes
                    props={props}
                    item={item}
                    iconClass={"sfield-like-icon"}
                    dislikeClass={"sfield-like-icon sfield-dislike-icon"}
                  />
                </div>
                <div className="sfield-fav-div">
                  <FavComp
                    addFav={handleFav}
                    removeFav={removeFav}
                    post={item}
                    itemClass="sfield-fav"
                    iconClass="sfield-fav-icon"
                    favClass="sfield-fav-icon-fill"
                    user={props.user}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="sfield-noitem">
          <SfieldAnimation w={250} h={250} />
          <p className="sfield-np">No {id} documents Found</p>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { userposts: state.posts, user: state.Auth };
};
export default connect(mapStateToProps, {
  DislikePost,
  LikePost,
  removedisLikes,
  removeLikes,
  AddFav,
  RemoveFav,
})(SingleField);
