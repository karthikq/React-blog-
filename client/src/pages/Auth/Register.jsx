/** @format */

/** @format */

import { connect } from "react-redux";
import React from "react";
import { registerUser } from "../../redux/actions";
import Authform from "./Authform";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";

const Register = (props) => {
  const handleRegister = async (data, url, setbtnStatus) => {
    const toastId = toast.loading("Registering " + data.username);
    try {
      await props.registerUser(data, url, toast, toastId);
      setbtnStatus(false);
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
      <Toaster />
    </div>
  );
};

export default connect(null, { registerUser })(Register);
