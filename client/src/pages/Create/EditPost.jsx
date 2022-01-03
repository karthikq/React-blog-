/** @format */

import React from "react";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { connect } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";

import imageCompression from "browser-image-compression";
import errImage from "./warning.png";
import "./create.styles.scss";
import ImageUpload from "../../customhook/ImageUpload";
import { useRef } from "react";
import { UpdateUserpost } from "../../redux/actions/post";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Select from "react-select";
import { MdPublic } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";

const EditPost = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const location = useLocation();
  const [selPostItem, setSelPostItem] = useState("");
  const [fieldState, setFieldState] = useState(true);
  const [imgFile, setImgFile] = useState("");
  const [uploadStatus, setUploadStatus] = useState("Uploading");
  const [submitState, setSubmitState] = useState(false);
  const [pval, setpval] = useState(0);

  const [noStatus, setnoStatus] = useState(false);
  const [postStatus, setPostStatus] = useState("");

  const { field } = window.Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const [user, setUser] = useState("");
  const { id } = useParams();
  const ref = useRef();
  const history = useHistory();

  useEffect(() => {
    const selField = props.posts.find((item) => item.fieldName === field);

    setTimeout(() => {
      if (selField) {
        const selPost = selField.usersPost.find((post) => post.post_Id === id);

        setSelPostItem(selPost);
        setUser({
          title: selPost.title,
          description: selPost.description,
          image: selPost.image,
        });
        setImgFile(selPost.image);
        setPostStatus(selPost.status);
      }
    }, 1200);
  }, [id, field, props]);

  useEffect(() => {
    reset(user);
  }, [user]);

  const getImage = async (e) => {
    if (!e.target.files[0]) {
      document.querySelector(".createimg").classList.add("error-img");
      toast.error("No Image found please try again");

      return document.querySelector(".createimg").setAttribute("src", errImage);
    }
    document.querySelector(".createimg").classList.remove("error-img");
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(e.target.files[0], options);

    setImgFile(compressedFile);
    const Imagesrc = URL.createObjectURL(compressedFile);
    document.querySelector(".createimg").setAttribute("src", Imagesrc);
  };
  const handleImage = async (url, userDetails) => {
    if (url) {
      userDetails.image = url;
      userDetails.post_Id = id;
      userDetails.userId = selPostItem.userId;
      userDetails.fieldName = field;
      userDetails.status = postStatus;
      console.log(userDetails);
      await props.UpdateUserpost(userDetails);
      toast.dismiss();
      toast.success("Data updated", {
        id: "updated",
      });
      setTimeout(() => {
        ref.current.children[0].innerHtml = "Image Uploaded";
        setSubmitState(false);
        const data = props.posts.find((item) => item.fieldName === field);
        const resp = data.usersPost.find((post) => post.status === "Public");
        if (resp) {
          history.push("/field/" + field + "?scroll=" + id);
        } else {
          history.push("/");
        }
      }, 2000);
    }
  };
  const handlePorgress = (progressval) => {
    setpval(progressval);
  };
  const onsubmit = async (data) => {
    if (!postStatus) {
      return setnoStatus(true);
    } else {
      setnoStatus(false);
      setSubmitState(true);

      if (data.image === imgFile) {
        setUploadStatus("Updating Data");
        const toastId = toast.loading("Saving Data");
        data.post_Id = id;
        data.userId = selPostItem.userId;
        data.fieldName = field;
        data.status = postStatus;

        await props.UpdateUserpost(data);
        toast.success("Data saved", {
          id: toastId,
        });
        setUploadStatus("Data saved");
        setTimeout(() => {
          ref.current.children[0].innerHtml = "Image Uploaded";
          setSubmitState(false);

          const data = props.posts.find((item) => item.fieldName === field);
          const resp = data.usersPost.find((post) => post.status === "Public");

          if (resp) {
            history.push("/field/" + field + "?scroll=" + id);
          } else {
            history.push("/");
          }
        }, 2000);
      } else {
        setUploadStatus("Updating Image please wait");
        if (!imgFile) {
          return setImgFile({ name: "error" });
        }
        data.image = "";
        toast.loading("Updating data Please wait", {
          id: "loading",
        });
        setTimeout(async () => {
          const progressbar = ref.current.children[1];

          await ImageUpload(
            imgFile,
            progressbar,
            handleImage,
            toast,
            data,
            handlePorgress
          );
        }, 1200);
      }
    }
  };
  const options = [
    { value: "Public", label: "Public", icon: <MdPublic /> },
    {
      value: "Private",
      label: "Private",
      icon: <RiGitRepositoryPrivateLine />,
    },
  ];
  return (
    <div className="create-conatiner">
      {submitState && (
        <div className="image-progress-upload">
          <div ref={ref} className="progress">
            <p>{uploadStatus}</p>
            <span className="progress-span"> </span>

            <div style={{ width: 120, height: 120, margin: "1.5rem auto" }}>
              <CircularProgressbar
                value={pval}
                maxValue={100}
                strokeWidth={5}
                styles={buildStyles({
                  pathColor: "#4dbc92",
                })}
                text={`${pval}%`}
              />
            </div>
          </div>
        </div>
      )}
      <div className="create-contents">
        <form className="create-form" onSubmit={handleSubmit(onsubmit)}>
          <div className="create-items-left">
            <div className="input-container">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title of the article"
                required
                minLength="7"
                {...register("title")}
              />
            </div>
            <div className="input-container">
              <label>Description</label>
              <textarea
                name="description"
                cols="30"
                required
                rows="5"
                minLength="20"
                placeholder="Description of the article"
                {...register("description")}></textarea>
              <span className="desp-length"></span>
            </div>
            <div className="input-container">
              <label style={{ marginBottom: "0.8rem" }}>Status</label>
              <Select
                options={options}
                value={options.filter((opt) => opt.value === postStatus)}
                onChange={({ value }) => setPostStatus(value)}
                getOptionLabel={(e) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {e.icon}
                    <span style={{ marginLeft: 5, fontSize: 15 }}>
                      {e.value}
                    </span>
                  </div>
                )}
              />

              {noStatus && (
                <span
                  style={{
                    marginTop: "0.7rem",
                    display: "block",
                    fontSize: "0.8rem",
                    color: "red",
                  }}>
                  This field is required !
                </span>
              )}
            </div>
            <div className="input-container" style={{ cursor: "not-allowed" }}>
              <label>Field</label>

              {fieldState ? (
                <select name="fieldName" disabled>
                  <option value={field}>{field}</option>
                  {props.posts.map(
                    (opt) =>
                      field !== opt.fieldName && (
                        <option value={opt.fieldName} key={opt.fieldName}>
                          {opt.fieldName}
                        </option>
                      )
                  )}
                </select>
              ) : (
                <input
                  disabled
                  type="text"
                  name="fieldName"
                  required
                  maxLength={20}
                  placeholder="eg:clothing"
                  {...register("fieldName")}
                />
              )}

              <p className="usercreate-field" style={{ opacity: 0.7 }}>
                You can't change the field
              </p>
            </div>
          </div>
          <div className="create-right-container ">
            <div className="input-conatiner">
              <label htmlFor="postimg" style={{ width: "11rem" }} id="imgbtn">
                Click here to change
              </label>
              <input
                type="file"
                id="postimg"
                name="image"
                accept=".jpeg,.png,.jpg"
                onChange={(e) => getImage(e)}
              />

              <span className="filename">{imgFile.name}</span>

              {/* {this.state.largeSize && (
                  <span className="errors">{this.state.details}</span>
                )} */}
            </div>

            <div className="uploaded-img">
              <img className="createimg" alt="error" src={imgFile} />
            </div>
          </div>
          <div className="submit-btn">
            <button>Submit</button>
          </div>
        </form>
      </div>{" "}
      <Toaster />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { posts: state.posts };
};
export default connect(mapStateToProps, { UpdateUserpost })(EditPost);
