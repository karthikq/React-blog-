/** @format */

import React, { Component, createRef } from "react";
import "./create.styles.scss";

import Resizer from "react-image-file-resizer";
import "../../constant.styles.scss";
import Animation from "../../lottie/Animation";
import Api from "../../api/Api";
import { connect } from "react-redux";
import { CreateUserPost } from "../../redux/actions/post";
import history from "../../history";

export class CreatePost extends Component {
  state = {
    files: {
      base64: "",
    },
    largeSize: false,
    details: "",
    userPosts: {
      title: "",
      description: "",
      fieldName: "Design",
      image: "",
    },
  };
  componentDidMount() {
    this.ref = createRef();
  }
  getFiles = (e) => {
    // console.log(files);
    // const ImageSize = files.size.split(" ")[0];
    // if (ImageSize > 200) {
    //   this.setState({ largeSize: true });
    //   this.setState({
    //     files: {
    //       base64:
    //         "https://images.pexels.com/photos/7789192/pexels-photo-7789192.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    //     },
    //   });
    // } else {
    //   this.setState({ files: files });
    // }

    try {
      Resizer.imageFileResizer(
        e.target.files[0],
        460,
        250,
        "JPEG",
        80,
        0,
        (uri) => {
          console.log(uri);
          this.setState({ details: e.target.files[0].name });
          this.setState({ files: { base64: uri } });
          this.setState({ userPosts: { ...this.state.userPosts, image: uri } });
        },
        "base64",
        200,
        200
      );
    } catch (err) {
      console.log(err);
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.state.userPosts.image) {
      return this.setState({ details: "This field is required" });
    }
    this.ref.current.classList.add("btn-opacity");
    this.ref.current.innerHTML = `<div class="btn-submit" ><div class="loading"></div>Creating Post</div>`;
    await this.props.CreateUserPost(this.state.userPosts);
    this.ref.current.classList.remove("btn-opacity");
    this.ref.current.innerHTML = `Post Created`;
    history.push("/");
  };
  render() {
    return (
      <div className="create-conatiner">
        <div className="create-contents">
          <form onSubmit={this.handleSubmit}>
            <div className="create-items-left">
              <div className="input-container">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title of the article"
                  required
                  onChange={(e) => {
                    this.setState({
                      userPosts: {
                        ...this.state.userPosts,
                        title: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="input-container">
                <label>Description</label>
                <textarea
                  name="description"
                  cols="30"
                  required
                  rows="5"
                  onChange={(e) => {
                    this.setState({
                      userPosts: {
                        ...this.state.userPosts,
                        description: e.target.value,
                      },
                    });
                  }}
                  placeholder="Description of the article"></textarea>
              </div>
              <div className="input-container">
                <label>Field</label>
                <select
                  name="fieldName"
                  required
                  value={this.state.userPosts.field}
                  onChange={(e) => {
                    this.setState({
                      userPosts: {
                        ...this.state.userPosts,
                        fieldName: e.target.value,
                      },
                    });
                  }}>
                  <option value="Design">Design</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Sports">Sports</option>
                  <option value="News">News</option>
                  <option value="Festival">Festival</option>
                  <option value="Religion">Religion</option>
                </select>
              </div>
            </div>
            <div className="create-right-container">
              <div className="input-conatiner">
                <label htmlFor="postimg">Choose Img</label>
                <input
                  type="file"
                  id="postimg"
                  name="image"
                  accept=".jpeg,.png,.jpg"
                  onChange={(e) => this.getFiles(e)}
                />

                {/* <FileBase64
                //   type="file"
                //   id="postimg"
                //   multiple={false}
                //   onDone={(file) => this.getFiles(file)}
                // /> */}

                <span className="filename">{this.state.details}</span>

                {/* {this.state.largeSize && (
                  <span className="errors">{this.state.details}</span>
                )} */}
              </div>
              <div className="uploaded-img">
                {this.state.files.base64 ? (
                  <img src={this.state.files.base64} alt="error" />
                ) : (
                  <Animation w={200} h={200} name="createAn" />
                )}
              </div>
            </div>
            <div className="submit-btn">
              <button ref={this.ref}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { CreateUserPost })(CreatePost);
