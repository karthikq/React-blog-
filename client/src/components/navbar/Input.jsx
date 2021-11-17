/** @format */

import React from "react";

const Input = ({ type, label, children }) => {
  return (
    <div className="input-wrapper">
      <div className="input-data">{children}</div>
    </div>
  );
};

export default Input;
