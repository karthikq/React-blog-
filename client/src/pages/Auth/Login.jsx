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
  const handleLogin = async (data, setbtnStatus) => {
    try {
      // const resp = await Api.post("/user/login", data);
      await props.loginUser(data, history);
      setbtnStatus(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Authform header="Sign In" loginState={true} handleLogin={handleLogin} />
    </div>
  );
};

export default connect(null, { loginUser })(Login);
