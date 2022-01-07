/** @format */

import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.styles.scss";
import { useHistory } from "react-router-dom";
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
import { motion } from "framer-motion";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

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

  const { theme, updateTheme } = useContext(ThemeContext);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: theme === "light" ? "white" : "black",
      color:
        theme === "light"
          ? state.isSelected
            ? "black"
            : "#4dbc92"
          : state.isSelected
          ? "white"
          : "#4dbc92",
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: theme === "light" ? "black" : "white",
      };
    },
    control: (base) => ({
      ...base,
      minHeight: 30,
      fontSize: "14px",
      border: "0",
      borderRadius: "0",
      outline: "0",
      backgroundColor: theme === "light" ? "white" : "black",
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
    singleValue: (provided) => ({
      ...provided,
      color: theme === "light" ? "black" : "white",
    }),
  };
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
            <div className="toogle-mode">
              {/* <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="checkbox-label" >

              </label> */}
              {/* <motion.svg
                className="sun-svg"
                initial="start"
                animate={theme === "light" ? "start" : "end"}
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ outline: 0 }}>
                <motion.path
                  transition={{ duration: 1 }}
                  variants={ellipseVariants}
                  fill={theme === "light" ? "#F0CA00" : "white"}
                />
              </motion.svg> */}

              {/* <motion.svg
                initial="start"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                whileHover="end">
                <motion.path
                  variants={ellipseVariants}
                  transition={{
                    duration: 2,
                    yoyo: Infinity,
                    repeat: Infinity,
                  }}
                  fill="#5C63FE"
                />
              </motion.svg> */}
            </div>
            <div className="nav-profile">
              <img
                onClick={() => setDropdownState(!dropdownState)}
                src={props.isAuth ? props.userDetails.profileUrl : avatar}
                alt="profileimage"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
                {theme !== "light" ? (
                  <span
                    style={{ marginBottom: "0.4rem" }}
                    onClick={() => {
                      updateTheme();
                      setDropdownState(false);
                    }}>
                    <BsSun />
                    Light Mode
                  </span>
                ) : (
                  <span
                    style={{ marginBottom: "0.4rem" }}
                    onClick={() => {
                      updateTheme();
                      setDropdownState(false);
                    }}>
                    <BsMoon style={{ fontSize: "0.8rem" }} /> Dark Mode
                  </span>
                )}
              </motion.div>
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
            <Link to="/field/crypto">
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
