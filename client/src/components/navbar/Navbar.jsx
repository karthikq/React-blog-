/** @format */

import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.styles.scss";
import { useHistory, useLocation } from "react-router-dom";
import Select from "react-select";
import { RiUserLine } from "react-icons/ri";
import { logoutUser } from "../../redux/actions";
import avatar from "./download.svg";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { FaBitcoin } from "react-icons/fa";
import {
  AiOutlineAntDesign,
  AiOutlineArrowUp,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { MdEngineering } from "react-icons/md";

const customStyles = {
  control: (base) => ({
    ...base,
    minHeight: 30,
    fontSize: "14px",
    border: "0",
    borderRadius: "0",
    outline: "0",
    borderBottom: "1px solid rgb(44, 44, 44)",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 6,
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 4,
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "white",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0px 6px",
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
};
const Navbar = (props) => {
  const [dropdownState, setDropdownState] = useState(false);
  const ref = useRef();
  const history = useHistory();
  // const location = useLocation();

  // const path = location.pathname.split("/")[2];

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

  // useEffect(() => {
  //   setTimeout(() => {
  //     const list = document.querySelectorAll("#ul li");
  //     if (path) {
  //       list.forEach((el, index) =>
  //         index <= 4 && el.children[0].innerHTML.trim().toLowerCase() === path
  //           ? el.classList.add("bottom-border")
  //           : el.classList.remove("bottom-border")
  //       );
  //     }

  //     location.pathname === "/" && list[0].classList.add("bottom-border");
  //   }, 1500);
  // }, [path, location]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    props.logoutUser(history);
    setDropdownState(false);
  };

  const handleDropdownChange = (item) => {
    history.push(`/field/${item.value.toLowerCase()}`);
  };
  const options = props.posts?.map((item) => {
    return {
      value: item.fieldName,
      label: item.fieldName,
    };
  });

  return (
    <React.Fragment>
      <div className="navbar-wrapper">
        <div className="nav-contents">
          <div className="brand-logo">
            <Link to="/">
              <img
                src="https://i.ibb.co/yPBrs0Z/ARTICLESg.png"
                alt="brand logo"
              />{" "}
            </Link>
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
                {props.isAuth && (
                  <Link
                    to={`/user/profile/${props.userDetails?.userId}?path=posts`}>
                    <span onClick={() => setDropdownState(false)}>
                      <RiUserLine /> Profile
                    </span>
                  </Link>
                )}
                {props.isAuth ? (
                  <span onClick={handleLogout}>
                    <IoIosLogOut /> Logout
                  </span>
                ) : (
                  <Link to="/user/login">
                    <span onClick={() => setDropdownState(false)}>
                      <IoIosLogIn /> Login
                    </span>
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
            <Link to="/">
              <AiOutlineArrowUp className="list-nav-icon" /> Popular
            </Link>
          </li>
          <li>
            <Link to="/field/cryto">
              <FaBitcoin className="list-nav-icon" /> Crypto
            </Link>
          </li>
          <li>
            <Link to="/field/engineering">
              <MdEngineering className="list-nav-icon" /> Engineering
            </Link>
          </li>
          <li>
            <Link to="/field/design">
              <AiOutlineAntDesign className="list-nav-icon" /> Design
            </Link>
          </li>
          {props.isAuth && (
            <li>
              <Link to="/create/post">
                <AiOutlinePlusSquare className="list-nav-icon" /> Create
              </Link>
            </li>
          )}
          <li>
            <Select
              placeholder="Search"
              options={options}
              search
              styles={customStyles}
              className="select-dropdown"
              onChange={handleDropdownChange}
              maxMenuHeight={200}
            />
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.Auth.Auth,
    userDetails: state.Auth.userData,
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
