/** @format */

import Api from "../../../api/Api";
import _ from "lodash";

export const CreateUserPost = (postDetails) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem("authToken");

    const { data } = await Api.post("/data/post", postDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // dispatch({
    //   type: "CREATE_USER_POST",
    //   payload: data,
    // });
    if (getState().posts.length > 0) {
      const resp = getState().posts.find((item, index) => {
        return item.fieldName === data.fieldName;
      });

      if (resp) {
        dispatch({
          type: "UPDATE_POST",
          payload: data,
        });
      } else {
        dispatch({
          type: "CREATE_USER_POST",
          payload: data,
        });
      }
    } else {
      dispatch({
        type: "CREATE_USER_POST",
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsersPosts = () => async (dispatch, getState) => {
  await dispatch(FetchPosts());

  const usersPost = _.map(getState().posts, "usersPost");

  // usersPost.map((item) => {

  // });
  _.map(usersPost, (item) => {
    const userIds = _.uniq(_.map(item, "userId"));
    userIds.forEach((id) => dispatch(fetchUserDetails(id)));
  });
};

export const FetchPosts = () => async (dispatch) => {
  const { data } = await Api.get("/user/posts");

  dispatch({
    type: "FETCH_POST",
    payload: data,
  });
};

export const fetchUserDetails = (userId) => async (dispatch) => {
  try {
    const { data } = await Api.get(`/post/user/${userId}`);
    dispatch({
      type: "FETCH_USER",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const LikePost = (post) => async (dispatch, getState) => {
  try {
    const loggedInuserId = getState().Auth.userData.userId;
    if (loggedInuserId) {
      post.loggedInuserId = loggedInuserId;
      const { data } = await Api.patch("/post/like", post);

      if (data) {
        dispatch({
          type: "LIKE_POST",
          payload: data.elem2,
        });
        dispatch({
          type: "UPDATE_USER",
          payload: data.updateLikes,
        });
        dispatch({
          type: "UPDATE_AUTH_USER",
          payload: data.updateLikes,
        });
      }
    } else {
      dispatch({
        type: "NO_USER",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeLikes = (post) => async (dispatch, getState) => {
  try {
    const loggedInuserId = getState().Auth.userData.userId;
    post.loggedInuserId = loggedInuserId;

    const { data } = await Api.patch("/post/unlike/" + post.post_Id, post);
    if (data) {
      dispatch({
        type: "REMOVE_LIKE",
        payload: data.elem2,
      });
      dispatch({
        type: "UPDATE_USER",
        payload: data.removeuserLikes,
      });
      dispatch({
        type: "UPDATE_AUTH_USER",
        payload: data.removeuserLikes,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const DislikePost = (post) => async (dispatch, getState) => {
  try {
    const loggedInuserId = getState().Auth.userData.userId;
    post.loggedInuserId = loggedInuserId;

    const { data } = await Api.patch("/post/dislike/" + post.post_Id, post);
    console.log(data);
    if (data) {
      dispatch({
        type: "DISLIKE_POST",
        payload: data.elem2,
      });
      dispatch({
        type: "DISLIKE_POST_USER",
        payload: data.userData,
      });
      dispatch({
        type: "DISLIKE_POST_USER_AUTH",
        payload: data.userData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const removedisLikes = (post) => async (dispatch, getState) => {
  try {
    const loggedInuserId = getState().Auth.userData.userId;
    post.loggedInuserId = loggedInuserId;

    const { data } = await Api.patch("/post/undislike/" + post.post_Id, post);
    if (data) {
      dispatch({
        type: "REMOVE_DISLIKE",
        payload: data.elem2,
      });
      dispatch({
        type: "DISLIKE_POST_USER",
        payload: data.removeuserdisLikes,
      });
      dispatch({
        type: "DISLIKE_POST_USER_AUTH",
        payload: data.removeuserdisLikes,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const DeletePost = (post) => async (dispatch) => {
  const { data } = await Api.delete(`/post/delete/${post.post_Id}`, {
    data: post,
  });
  console.log(data);
  if (data.deletePost.usersPost.length > 0) {
    dispatch({
      type: "DELETE_POST",
      payload: post,
    });
  } else {
    dispatch({
      type: "DELETE_POST",
      payload: post,
    });
    dispatch({
      type: "FETCH_POST",
      payload: data.posts,
    });
  }
};
