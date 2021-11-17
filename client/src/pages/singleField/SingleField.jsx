/** @format */

import React from "react";

const SingleField = () => {
  return (
    <div className="singlefield-container">
      <div className="sfield-contents">
        <div className="sfield-header">
          <div className="box"></div>
          <h2>FieldName</h2>
        </div>
        <div className="sfiled-posts">
          <div className="sfield-post-box">
            <div className="sfield-post-text">
              <h3>title</h3>
              <span>desp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleField;
