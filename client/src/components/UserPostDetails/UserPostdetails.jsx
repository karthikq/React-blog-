/** @format */

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const UserPostdetails = (props) => {
  const userData = props.userDetails.find(
    (user) => user.userId === props.post.userId
  );

  return (
    <div className={props.userclass}>
      <img src={userData?.profileUrl} alt="err" />{" "}
      <Link to={`/user/profile/${userData?.userId}?path=posts`}>
        <p> {userData ? userData.username : "Refresh page"}</p>
      </Link>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { userDetails: state.user };
};
export default connect(mapStateToProps)(UserPostdetails);
