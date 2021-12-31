/** @format */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import UserLikes from "../../components/UserLikes";
import "./item.styles.scss";
import {
  AddFav,
  DeletePost,
  DislikePost,
  LikePost,
  removedisLikes,
  RemoveFav,
  removeLikes,
} from "../../redux/actions/post";
import { FiDownloadCloud } from "react-icons/fi";
import UserPostdetails from "../../components/UserPostDetails/UserPostdetails";
import FavComp from "../../components/FavComp";
import { RiDeleteBinLine, RiEditBoxLine } from "react-icons/ri";
import Alert from "../../components/alert/Alert";
import history from "../../history";

import { Link } from "react-router-dom";

const Item = (props) => {
  const [data, setData] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [alertsucessState, setAlertsucessState] = useState(false);
  const [selPost, setselPost] = useState("");

  const { postId, field } = window.Qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  useEffect(() => {
    const fieldItem = props.posts.find((item) => {
      return item.fieldName === field;
    });
    if (fieldItem) {
      const userPost = fieldItem.usersPost.find((e) => e.post_Id === postId);

      setData(userPost);
    }
  }, [postId, field, props]);

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
    setAlertsucessState(true);
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  return (
    <div className="item-container">
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
        <div className="item-contents">
          <div className="item-body">
            <div className="itempostimg-div">
              <img src={data.image} alt="itemimage" className="itempostimg" />{" "}
              <p className="item-date">
                Created at : {new Date(data.sortDate).toLocaleDateString()}
              </p>{" "}
              <div className="item-download" title="Download Image">
                <a
                  download={data.image}
                  href={data.image}
                  target="_blank"
                  rel="noreferrer">
                  <FiDownloadCloud className="item-download-icon" />
                </a>
              </div>
            </div>
            <div className="item-post-details">
              <div className="itempostlikes">
                <div className="item-actions">
                  <div className="item-fav">
                    <FavComp
                      addFav={handleFav}
                      removeFav={removeFav}
                      post={data}
                      user={props.user}
                      itemClass="field-fav"
                      iconClass="fav-icon"
                      favClass="fav-fill"
                    />
                  </div>
                  {props.user.userData.userId === data.userId && (
                    <div className="item-delete" title="Delete Post">
                      <RiDeleteBinLine
                        className="item-delete-icon"
                        onClick={() => handleDelete(data)}
                      />
                    </div>
                  )}
                  {props.user.userData.userId === data.userId && (
                    <div className="edit-icon-div">
                      <Link
                        title="Edit Post"
                        to={`/user/post/edit/${data.post_Id}?field=${data.fieldName}`}>
                        <RiEditBoxLine
                          className="item-edit-icon"
                          style={{ marginRight: "0.2rem" }}
                        />
                      </Link>
                    </div>
                  )}
                </div>
                <UserLikes
                  props={props}
                  item={data}
                  itemclass={"likes"}
                  iconClass={"itempostlikeicon"}
                  likeActive={"itempostlikeiconactive"}
                  dislikeClass={"itempostlikeicon itempostdislikeicon"}
                />{" "}
              </div>
              <div className="item-details">
                <Link to={"/field/" + field}>
                  <span className="t-span-feild">Field : {field} </span>
                </Link>

                <h1>
                  <span className="home-t-span">Title</span> : {data.title}{" "}
                  <sub>{field}</sub>{" "}
                </h1>
                <div className="item-user">
                  <UserPostdetails post={data} userclass="avatar" />
                </div>
                <p className="item-ptag">
                  <span className="home-t-span">Description : </span>
                  {data.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStatetoProps = (state) => {
  return { posts: state.posts, user: state.Auth };
};

export default connect(mapStatetoProps, {
  LikePost,
  removeLikes,
  removedisLikes,
  DeletePost,
  DislikePost,
  AddFav,
  RemoveFav,
})(Item);
