/** @format */

import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.styles.scss";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../redux/actions";
import avatar from "./download.svg";

const Navbar = (props) => {
  const [dropdownState, setDropdownState] = useState(false);

  const ref = useRef();
  const history = useHistory();
  //adding border bottom to selected item
  setTimeout(() => {
    const list = document.querySelectorAll("#ul li");
    list.forEach((item) =>
      item.addEventListener("click", (e) => {
        list.forEach((li) => {
          li === item
            ? li.classList.add("bottom-border")
            : li.classList.remove("bottom-border");
        });
      })
    );
  }, 1200);

  useEffect(() => {
    setTimeout(() => {
      const list = document.querySelectorAll("#ul li");
      list.forEach((el) =>
        el.innerHTML === window.location.pathname.split("/")[1]
          ? el.classList.add("bottom-border")
          : el.classList.remove("bottom-border")
      );
      window.location.pathname === "/" &&
        list[0].classList.add("bottom-border");
    }, 1500);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    props.logoutUser(history);
    setDropdownState(false);
  };
  return (
    <React.Fragment>
      <div className="navbar-wrapper">
        <div className="nav-contents">
          <div className="brand-logo">
            <img
              src="https://www.pngitem.com/pimgs/m/19-196348_logo-logotipo-de-la-plantilla-grey-free-logo.png"
              alt="brand logo"
            />
          </div>
          <div className="nav-details">
            <div className="nav-profile">
              <img
                onClick={() => setDropdownState(!dropdownState)}
                src={props.isAuth ? props.userDetails.profileUrl : avatar}
                alt="profileimage"
              />
              <div
                className={
                  dropdownState ? "dropdown dropdown-active" : "dropdown"
                }>
                {props.isAuth && <span>Profile</span>}
                {props.isAuth ? (
                  <span onClick={handleLogout}>Logout</span>
                ) : (
                  <Link to="/user/login">
                    <span onClick={() => setDropdownState(false)}>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="list-nav">
        <ul id="ul" ref={ref}>
          <li>
            <Link to="/">Popular</Link>
          </li>
          <li>
            <Link to="/field/sports">Sports</Link>
          </li>
          <li>
            <Link to="/field/engineering">Engineering</Link>
          </li>
          <li>
            <Link to="/field/latest"> Latest</Link>
          </li>
          {props.isAuth && (
            <li>
              <Link to="/create/post">Create</Link>
            </li>
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return { isAuth: state.Auth.Auth, userDetails: state.Auth.userData };
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
