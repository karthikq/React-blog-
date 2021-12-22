/** @format */

import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  RiDeleteBinLine,
  RiEditBoxLine,
  RiShareBoxFill,
  RiUserLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const Dropdown = ({ post, handleDelete, user, fieldState }) => {
  const [dropdownState, setdropdownState] = useState(false);
  const [dropdownPost, setdropdownPost] = useState("");

  const handlePost = (post) => {
    setdropdownPost(post);
    setdropdownState(true);
  };
  return (
    <div
      className={
        fieldState
          ? "dropdown-item-container"
          : "dropdown-item-container dropdown-item-container-left "
      }>
      {dropdownPost.post_Id === post.post_Id ? (
        <IoIosCloseCircleOutline
          className="dropdown-item-icon"
          onClick={() => {
            setdropdownPost("");
            setdropdownState(false);
          }}
        />
      ) : (
        <BsThreeDots
          className="dropdown-item-icon"
          onClick={() => handlePost(post)}
        />
      )}
      {dropdownPost.post_Id === post.post_Id && dropdownState && (
        <div className="dropdown-items-list">
          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to={`/post/?postId=${post.post_Id}&field=${post.fieldName}`}>
            {" "}
            <span>
              <RiShareBoxFill style={{ marginRight: "0.3rem" }} />
              Read Post
            </span>{" "}
          </Link>

          {user.Auth && user.userData.userId === post.userId && (
            <React.Fragment>
              <Link
                to={`/user/post/edit/${post.post_Id}?field=${post.fieldName}`}
                style={{ textDecoration: "none", color: "black" }}>
                <span>
                  <RiEditBoxLine style={{ marginRight: "0.3rem" }} />
                  Edit Post
                </span>
              </Link>
              <span onClick={() => handleDelete(post)}>
                <RiDeleteBinLine style={{ marginRight: "0.3rem" }} />
                Delete Post
              </span>
            </React.Fragment>
          )}
          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to={`/user/profile/${post.userId}?path=posts`}>
            <span>
              <RiUserLine style={{ marginRight: "0.3rem" }} />
              User
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
