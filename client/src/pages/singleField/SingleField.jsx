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
  DeletePost,
  DislikePost,
  LikePost,
  removedisLikes,
  RemoveFav,
  removeLikes,
} from "../../redux/actions/post";
import ImageFlip from "../../ImageFlip/ImageFlip";
import { Link, useLocation } from "react-router-dom";
import FavComp from "../../components/FavComp";

import Alert from "../../components/alert/Alert";
import Dropdown from "../../components/Dropdown/Dropdown";

const SingleField = (props) => {
  const location = useLocation();
  const [posts, setPosts] = useState("");
  const [itemState, setitemState] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [alertsucessState, setAlertsucessState] = useState(false);
  const [selPost, setselPost] = useState("");
  const [sortPost, setSortPost] = useState([]);

  const { id } = useParams();
  const { scroll } = window.Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  if (scroll) {
    setTimeout(() => {
      const el = document.getElementById(scroll);
      el.scrollIntoView({
        behavior: "smooth",
      });
      window.history.pushState({}, "field", "/field/" + id);
    }, 1200);
  }

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
  const handleDelete = (post) => {
    setselPost(post);
    setAlertState(true);
  };
  const confirmDelete = () => {
    props.DeletePost(selPost);
    // // setAlertState(true);
    setAlertsucessState(true);
  };
  useEffect(() => {
    if (itemState) {
      const resp = posts?.usersPost.sort((a, b) => {
        if (a.sortDate || b.sortDate) {
          return new Date(b.sortDate) - new Date(a.sortDate);
        }
      });
      setSortPost(resp);
    }
  }, [itemState, posts]);

  const renderComp = () => {
    return itemState ? (
      <div className="sfield-contents">
        <div className="sfield-header">
          <div className="box"></div>
          <h2>{posts?.fieldName}</h2>
        </div>
        <div className="sfield-posts">
          {sortPost.map(
            (item, index) =>
              item.status === "Public" && (
                <div
                  id={item.post_Id}
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
                    <h3>
                      {" "}
                      <Link
                        to={`/post/?postId=${item.post_Id}&field=${item.fieldName}`}>
                        {" "}
                        {item.title}
                      </Link>{" "}
                    </h3>
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

                  <div
                    className={
                      (index + 1) % 2 === 0
                        ? "sfield-likes sfield-likes-left"
                        : "sfield-likes"
                    }>
                    <UserLikes
                      props={props}
                      item={item}
                      iconClass={"sfield-like-icon"}
                      dislikeClass={"sfield-like-icon sfield-dislike-icon"}
                    />
                  </div>
                  <div
                    className={
                      (index + 1) % 2 === 0
                        ? "sfield-fav-div sfield-fav-div-left"
                        : "sfield-fav-div"
                    }>
                    <FavComp
                      addFav={handleFav}
                      removeFav={removeFav}
                      post={item}
                      itemClass="sfield-fav"
                      iconClass="sfield-fav-icon"
                      favClass="sfield-fav-icon-fill"
                      user={props.user}
                    />
                    <Dropdown
                      handleDelete={handleDelete}
                      user={props.user}
                      post={item}
                      fieldState={(index + 1) % 2 === 0 ? false : true}
                    />
                    {/* {props.user.userData.userId === item.userId && (
                  <div className="sfield-delete">
                    <RiDeleteBinLine
                      onClick={() => handleDelete(item)}
                      className="sfield-delete-icon"
                    />
                  </div>
                )} */}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    ) : (
      <div className="sfield-noitem">
        <SfieldAnimation w={250} h={250} />
        <p className="sfield-np">No {id} documents Found</p>
      </div>
    );
  };
  return (
    <div className="sfield-container">
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
        renderComp()
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
  DeletePost,
  RemoveFav,
})(SingleField);
