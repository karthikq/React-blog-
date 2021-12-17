/** @format */

import React from "react";
import { BsFillHeartFill } from "react-icons/bs";

const FavComp = (props) => {
  return (
    <div>
      {props.user.userData.fav?.find(
        (el) => el.fav_postId === props.post.post_Id
      ) ? (
        <div
          className={props.itemClass}
          onClick={() => props.removeFav(props.post)}>
          <BsFillHeartFill
            title="Remove from favourite"
            className={props.iconClass + " " + props.favClass}
          />
        </div>
      ) : (
        <div
          className={props.itemClass}
          onClick={() => props.addFav(props.post)}>
          <BsFillHeartFill
            title="Add to favourites"
            className={props.iconClass}
          />
        </div>
      )}
    </div>
  );
};

export default FavComp;
