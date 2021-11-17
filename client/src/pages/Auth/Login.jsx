/** @format */

import { connect } from "react-redux";
import React from "react";
import Api from "../../api/Api";
import Authform from "./Authform";
import { loginUser } from "../../redux/actions";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  console.log(props);
  const history = useHistory();
  const handleLogin = async (data) => {
    try {
      // const resp = await Api.post("/user/login", data);
      props.loginUser(data, history);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Authform header="Login" loginState={true} handleLogin={handleLogin} />
    </div>
  );
};

export default connect(null, { loginUser })(Login);
