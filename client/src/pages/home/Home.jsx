/** @format */

import React from "react";
import { connect } from "react-redux";
import Fields from "../fields/Fields";
import "./Home.styles.scss";

const Home = (props) => {
  return (
    <>
      <div className="home-container">
        <div className="home-contents">
          <div className="home-left-details">
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
              possimus?
            </h1>
            <div className="avatar">
              <img src="" alt="" />
              <p>Authr name</p>
            </div>
            <span className="post-details">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero esse
              sed laboriosam dolores mollitia ad, animi exercitationem fugit,
              quidem autem inventore minima incidunt sunt officiis? Tenetur
              necessitatibus amet voluptatem distinctio?
            </span>
            <a className="a-tag" href="/">
              Learn More
            </a>
          </div>
          <div className="home-right-details">
            <img src="" alt="" />
          </div>
        </div>
      </div>
      <div>
        {props.posts.map((item, index) => (
          <Fields item={item} key={index} />
        ))}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps)(Home);
