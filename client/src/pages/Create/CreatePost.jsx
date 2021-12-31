/** @format */

import React, { Component, createRef } from "react";
import "./create.styles.scss";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import "../../constant.styles.scss";
import Animation from "../../lottie/Animation";
import imageCompression from "browser-image-compression";
import { connect } from "react-redux";
import { CreateUserPost } from "../../redux/actions/post";
import history from "../../history";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ImageUpload from "../../customhook/ImageUpload";
import errImage from "./warning.png";

import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { MdPublic } from "react-icons/md";

export class CreatePost extends Component {
  state = {
    selectState: true,
    submitState: false,
    noStatus: false,
    fields: [],
    uploadStatus: "Uploading Image...",
    files: {
      imageURL: "",
    },

    imageFile: "",
    largeSize: false,
    details: "",
    pval: 0,
    userPosts: {
      title: "",
      description: "",
      fieldName: "Design",
      image: "",
      status: "",
    },
  };

  componentDidMount() {
    this.ref = createRef();
    this.ref2 = createRef();
    this.setState({ userPosts: { ...this.state.userPosts, title: "2" } });
    this.options = [
      { value: "Public", label: "Public", icon: <MdPublic /> },
      {
        value: "Private",
        label: "Private",
        icon: <RiGitRepositoryPrivateLine />,
      },
    ];
  }
  getFiles = async (e) => {
    if (!e.target.files[0]) {
      document.querySelector(".createimg").classList.add("error-img");
      this.setState({
        details: "Error",
      });
      return document.querySelector(".createimg").setAttribute("src", errImage);
    }

    this.setState({
      details: e.target.files[0] ? e.target.files[0].name : "Error",
    });
    setTimeout(() => {
      document.querySelector(".createimg")?.classList?.remove("error-img");
      document.querySelector("#imgbtn").style.width = "11rem";
      document.querySelector("#imgbtn").innerHTML = "Click here to change";
    }, 1200);

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(e.target.files[0], options);
      this.setState({ imageFile: compressedFile });
      const Imagesrc = URL.createObjectURL(compressedFile);
      document.querySelector(".createimg").setAttribute("src", Imagesrc);
    } catch (err) {
      console.log(err);
    }
  };
  handleImage = async (data) => {
    if (data) {
      this.setState({ userPosts: { ...this.state.userPosts, image: data } });

      toast.success("Post Created", {
        id: this.toastId,
      });
      const resp = await this.props.CreateUserPost(this.state.userPosts);

      this.setState({ uploadStatus: "Image uploaded sucessfully" });

      setTimeout(() => {
        this.setState({ submitState: false });
        history.push(
          "/post/?postId=" +
            resp.post_Id +
            "&field=" +
            this.state.userPosts.fieldName
        );
      }, 2000);
    }
  };
  handleProgress = (progress) => {
    this.setState({ pval: progress });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.userPosts.status) {
      return this.setState({ noStatus: true });
    } else {
      this.setState({ noStatus: false });
      if (!this.state.imageFile) {
        return this.setState({ details: "This field is required" });
      }
      const containes = document
        .querySelector(".createimg")
        .classList.contains("error-img");
      if (containes) {
        return this.setState({ details: "This field is required" });
      }
      this.setState({ submitState: true });
      this.toastId = toast.loading("Creating post please wait ");
      setTimeout(async () => {
        this.progressbar = this.ref2.current.children[1];
        await ImageUpload(
          this.state.imageFile,
          this.progressbar,
          this.handleImage,
          toast,
          this.state.userPosts,
          this.handleProgress
        );
      }, 1200);
    }
  };

  render() {
    return (
      <div className="create-conatiner">
        {this.state.submitState && (
          <div className="image-progress-upload">
            <div ref={this.ref2} className="progress">
              <p style={{ fontWeight: 500 }}> {this.state.uploadStatus}</p>
              <span className="progress-span"> </span>
              <div style={{ width: 100, height: 100, margin: "1.5rem auto" }}>
                <CircularProgressbar
                  value={this.state.pval}
                  maxValue={100}
                  strokeWidth={5}
                  styles={buildStyles({
                    pathColor: "#4dbc92",
                  })}
                  text={`${this.state.pval}%`}
                />
              </div>
            </div>
            <Toaster />
          </div>
        )}
        <div className="create-contents">
          <form className="create-form" onSubmit={this.handleSubmit}>
            <div
              className={
                this.state.submitState
                  ? "create-items-left form-opacity"
                  : "create-items-left"
              }>
              <div className="input-container">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title of the article"
                  required
                  minLength="3"
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
                  minLength="10"
                  onChange={(e) => {
                    this.setState({
                      userPosts: {
                        ...this.state.userPosts,
                        description: e.target.value,
                      },
                    });
                  }}
                  placeholder="Description of the article"></textarea>
                <span className="desp-length">
                  {this.state.userPosts.description &&
                    this.state.userPosts.description.length}
                </span>
              </div>
              <div className="input-container">
                <label style={{ marginBottom: "0.8rem" }}>Status</label>
                <Select
                  options={this.options}
                  onChange={({ value }) =>
                    this.setState({
                      userPosts: {
                        ...this.state.userPosts,
                        status: value,
                      },
                    })
                  }
                  getOptionLabel={(e) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {e.icon}
                      <span style={{ marginLeft: 5, fontSize: 15 }}>
                        {e.value}
                      </span>
                    </div>
                  )}
                />

                {this.state.noStatus && (
                  <span
                    style={{
                      marginTop: "0.7rem",
                      display: "block",
                      fontSize: "0.8rem",
                      color: "red",
                    }}>
                    This field is required !{" "}
                  </span>
                )}
              </div>
              <div className="input-container">
                <label>Field</label>
                {!this.state.selectState ? (
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
                    {/* 
                    <option value="Engineering">Engineering</option>
                    <option value="Fashion">Fashion</option>
                    <optin value="Sports">Sports</optin>
                    <option value="News">News</option>
                    <option value="Festival">Festival</option>
                    <option value="Religion">Religion</option> */}
                    {this.props.fields.map(
                      (field, index) =>
                        field.fieldName !== "Design" && (
                          <option value={field.fieldName} key={index}>
                            {field.fieldName}
                          </option>
                        )
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="fieldName"
                    required
                    maxLength={20}
                    placeholder="eg:clothing"
                    onChange={(e) =>
                      this.setState({
                        userPosts: {
                          ...this.state.userPosts,
                          fieldName: e.target.value.replace(/\s/g, ""),
                        },
                      })
                    }
                  />
                )}
                <p className="usercreate-field">
                  {!this.state.selectState
                    ? "Or To create new field   "
                    : "Or to choose from dropdown  "}
                  <span
                    onClick={() =>
                      this.setState({ selectState: !this.state.selectState })
                    }>
                    click here
                  </span>
                </p>
              </div>
            </div>
            <div
              className={
                this.state.submitState
                  ? "create-right-container form-opacity"
                  : "create-right-container"
              }>
              <div className="input-conatiner">
                <label htmlFor="postimg" id="imgbtn">
                  Choose Img
                </label>
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

                <span className="filename">
                  {this.state.details.substring(0, 40)}
                </span>

                {/* {this.state.largeSize && (
                  <span className="errors">{this.state.details}</span>
                )} */}
              </div>
              <div className="uploaded-img">
                {this.state.imageFile ? (
                  <img
                    className="createimg"
                    src={this.state.files.base64}
                    alt="error"
                  />
                ) : (
                  <Animation w={200} h={200} name="createAn" />
                )}
              </div>
            </div>
            <div className="submit-btn">
              <button ref={this.ref}>Submit</button>
            </div>
          </form>
        </div>{" "}
        <Toaster />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { fields: state.posts };
};

export default connect(mapStateToProps, { CreateUserPost })(CreatePost);
