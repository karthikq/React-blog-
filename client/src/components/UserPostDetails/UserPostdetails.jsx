/** @format */

import React, { useEffect } from "react";
import { connect } from "react-redux";

const UserPostdetails = (props) => {
  //   useEffect(() => fetchUserDetails(post.userId), [post.userId]);

  //   const fetchUserDetails = async (userId) => {
  //     const { data } = await Api.get(`/post/user:${userId}`);
  //   };
  //   console.log(post.userId);

  //   useEffect(() => {
  //     props.fetchUserDetails(props.post.userId);
  //   }, [props.post.userId]);

  const userData = props.userDetails.find(
    (user) => user.userId === props.post.userId
  );

  return (
    <div className={props.class}>
      <img src={userData?.profileUrl} alt="" />
      <p> {userData ? userData.username : "Refresh page"}</p>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { userDetails: state.user };
};
export default connect(mapStateToProps)(UserPostdetails);
