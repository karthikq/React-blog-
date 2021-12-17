/** @format */

import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Toaster } from "react-hot-toast";

const Alert = ({
  setAlertState,
  alertsucessState,
  setAlertsucessState,
  selPost,
  confirmDelete,
}) => {
  return (
    <div className="alert-container">
      {alertsucessState ? (
        <SweetAlert
          success
          title="Post Deleted"
          confirmBtnCssClass="con-btn"
          onConfirm={() => {
            setAlertsucessState(false);
            setAlertState(false);
          }}>
          <span style={{ fontSize: "1rem" }}> You Deleted the post</span>
          <p
            style={{
              fontWeight: 500,
              margin: "0.5rem 0",
              color: "green",
              fontSize: "1.02rem",
            }}>
            {selPost.title.substring(0, 30) + "..."}
          </p>
        </SweetAlert>
      ) : (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          cancelBtnCssClass="can-btn"
          confirmBtnCssClass="con-btn"
          title="Are you sure?"
          onConfirm={() => {
            confirmDelete();
          }}
          onCancel={() => setAlertState(false)}
          focusCancelBtn>
          You will not be able to recover this Post!{" "}
        </SweetAlert>
      )}
      <Toaster />
    </div>
  );
};

export default Alert;
