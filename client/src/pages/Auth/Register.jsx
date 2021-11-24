/** @format */

/** @format */

import { connect } from "react-redux";
import React from "react";
import { registerUser } from "../../redux/actions";
import Authform from "./Authform";

import { useHistory } from "react-router-dom";

const Register = (props) => {
  const history = useHistory();
  const handleRegister = async (data) => {
    try {
      await props.registerUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Authform
        header="Sign up"
        loginState={false}
        handleLogin={handleRegister}
      />
    </div>
  );
};

export default connect(null, { registerUser })(Register);
