/** @format */

import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import CreatePost from "./pages/Create/CreatePost";

import Home from "./pages/home/Home";
import { Route, Switch } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProtectedRoute from "./components/navbar/ProtectedRoute";
import { connect } from "react-redux";
import { fetchUser } from "./redux/actions";
import { fetchUsersPosts } from "./redux/actions/post";
import SingleField from "./pages/singleField/SingleField";

function App(props) {
  const { user } = window.Qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  if (user) {
    localStorage.setItem("authToken", user);
    props.fetchUser();
    setTimeout(() => {
      window.history.pushState({}, document.title, "/");
    }, 500);
  }

  useEffect(() => {
    props.fetchUser();
    props.fetchUsersPosts();
  }, [props]);
  return (
    <>
      <Navbar />
      <Switch>
        <ProtectedRoute
          path="/create/post"
          exact
          component={CreatePost}
          isAuth={props.isAuth}
        />
        <Route path="/" exact component={Home} />
        <Route path="/field/:id" exact component={SingleField} />
        <Route path="/user/login" exact component={Login} />
        <Route path="/user/register" exact component={Register} />
      </Switch>
    </>
  );
}
const mapStateToProps = (state) => {
  return { isAuth: state.Auth.Auth };
};
export default connect(mapStateToProps, { fetchUser, fetchUsersPosts })(App);
