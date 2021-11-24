/** @format */

import React from "react";
import { connect } from "react-redux";

const UserPostdetails = (props) => {
  const userData = props.userDetails.find(
    (user) => user.userId === props.post.userId
  );

  return (
    <div className={props.userclass}>
      <img src={userData?.profileUrl} alt="err" />
      <p> {userData ? userData.username : "Refresh page"}</p>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { userDetails: state.user };
};
export default connect(mapStateToProps)(UserPostdetails);
