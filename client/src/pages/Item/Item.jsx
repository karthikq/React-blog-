/** @format */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import UserLikes from "../../components/UserLikes";
import "./item.styles.scss";
import {
  DislikePost,
  LikePost,
  removedisLikes,
  removeLikes,
} from "../../redux/actions/post";
import { FiDownloadCloud } from "react-icons/fi";

const Item = (props) => {
  const [data, setData] = useState("");

  const { postId, field } = window.Qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  useEffect(() => {
    console.log(postId);
    const fieldItem = props.posts.find((item) => {
      return item.fieldName === field;
    });
    if (fieldItem) {
      const userPost = fieldItem.usersPost.find((e) => e.post_Id === postId);
      console.log(userPost);
      setData(userPost);
    }
  }, [postId, field, props]);
  return (
    <div className="item-container">
      <div className="item-contents">
        <div className="item-body">
          <div className="itempostimg-div">
            <img src={data.image} alt="itemimage" className="itempostimg" />{" "}
            <div className="itempostlikes">
              {" "}
              <div className="item-download">
                <a
                  download={data.image}
                  href={data.image}
                  target="_blank"
                  rel="noreferrer">
                  <FiDownloadCloud className="item-download-icon" />
                </a>
              </div>
              <UserLikes
                props={props}
                item={data}
                itemclass={"likes"}
                iconClass={"itempostlikeicon"}
                likeActive={"itempostlikeiconactive"}
                dislikeClass={"itempostlikeicon itempostdislikeicon"}
              />
            </div>
          </div>
          <div className="item-post-details">
            <div className="item-details">
              <h1>
                {data.title} <sub>{field}</sub>{" "}
              </h1>
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      </div>
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
  DislikePost,
})(Item);
