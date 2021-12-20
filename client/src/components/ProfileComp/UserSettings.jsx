/** @format */

import React, { useState, useEffect, useRef } from "react";
import "./upcomp.styles.scss";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";
import toast, { Toaster } from "react-hot-toast";
import ImageUpload from "../../customhook/ImageUpload";

import { Updateuser } from "../../redux/actions";
import { connect } from "react-redux";

import { useCallback } from "react";
import CropImage from "../CropImage/CropImage";

const UserSettings = ({ userData, Updateuser, userDetail }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const formBtn = useRef(null);

  const [imageState, setImageState] = useState(false);
  const [imgUrl, setimgUrl] = useState("");
  const [tId, settoastId] = useState("");
  const [UpData, setUpData] = useState("");
  const [Upimg, setUpImg] = useState("");

  const [user, setUser] = useState("");

  const [completedCrop, setCompletedCrop] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUser({ username: userData.username, email: userData.email });
    }, 1000);
    setimgUrl(userData.profileUrl);
  }, [userData]);

  useEffect(() => {
    // reset form with user data
    reset(user);
  }, [user]);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const handleImage = async (url, userDetails) => {
    if (!userDetails) {
      toast.dismiss();
      toast.error("Please press submit button again");
      formBtn.current.setAttribute("disabled", false);
    } else {
      if (url) {
        toast.dismiss();
        toast.success("Image uploaded", {
          id: tId,
        });

        await Updateuser(userDetails, url, toast);
        formBtn.current.removeAttribute("disabled");
        setimgUrl(url);
        setImageState(false);
      }
    }
  };
  const onSubmit = async (data) => {
    data.userId = userData.userId;
    setUpData(data);
    formBtn.current.setAttribute("disabled", true);

    if (imageState) {
      if (!completedCrop || !previewCanvasRef.current) {
        formBtn.current.removeAttribute("disabled");
        toast.error("please crop the image");
        return;
      } else {
        const toastId = toast.loading("Saving Data please wait ...");
        settoastId(toastId);

        setTimeout(() => {
          const progressbar = document.querySelector(".up-progress-bar");
          previewCanvasRef.current.toBlob(
            async (blob) => {
              if (!blob) {
                toast.dismiss();
                formBtn.current.removeAttribute("disabled");
                return toast.error("please crop the image to continue");
              } else {
                blob.name = imgUrl.name;
                await ImageUpload(blob, progressbar, handleImage, toast, data);
              }
            },
            "image/png",
            1
          );
        }, 1200);
      }
    } else {
      const toastid = toast.loading("Updating Data");
      await Updateuser(data, userData.profileUrl, toast);
      formBtn.current.removeAttribute("disabled");
      toast.success("Data saved...", {
        id: toastid,
      });
    }
  };

  const handleProfileChange = async (e) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    const compressedImg = await imageCompression(e.target.files[0], options);
    const src = URL.createObjectURL(compressedImg);
    setimgUrl(compressedImg);
    setUpImg(src);
    // setTimeout(() => {
    //   document.querySelector(".user-selected-img").setAttribute("src", src);
    // }, 1200);
  };
  return (
    <div className="up-us-container">
      <div className="up-us-contents">
        <form onSubmit={handleSubmit(onSubmit)} className="up-form">
          <div className="up-form-left">
            <div className="up-form-item">
              <label>Name</label>
              <input type="text" {...register("username")} />
            </div>
            <div className="up-form-item">
              <label>Email</label>
              <input type="email" {...register("email")} />
            </div>
            <div className="up-form-item">
              <label>Profile img</label>

              {imageState ? (
                <>
                  <input
                    type="file"
                    required
                    accept=".jpg, .png, .jpeg"
                    placeholder="profile-img"
                    onChange={handleProfileChange}
                  />
                  <div className="up-form-img-details">
                    <span onClick={() => setImageState(false)}>Go back</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="up-form-img">
                    <img src={imgUrl} alt="profile" />
                    <div className="up-form-img-details">
                      <span onClick={() => setImageState(true)}>
                        Change image
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>{" "}
            <button ref={formBtn} className="up-form-btn up-form-btn-desk">
              Update
            </button>
          </div>
          {imageState && (
            <div className="up-form-right">
              <div className="up-form-img-sel">
                {/* <img className="user-selected-img" src="" alt="err" /> */}
                <CropImage
                  Upimg={Upimg}
                  imgRef={imgRef}
                  onLoad={onLoad}
                  setCompletedCrop={setCompletedCrop}
                  previewCanvasRef={previewCanvasRef}
                  completedCrop={completedCrop}
                />
              </div>
              <span className="up-progress-bar"></span>
            </div>
          )}{" "}
          <button
            ref={formBtn}
            style={imageState ? { margin: "0" } : { marginTop: "1rem" }}
            className="up-form-btn up-form-btn-mobile">
            Update
          </button>
        </form>
      </div>{" "}
      <Toaster />
    </div>
  );
};
const mapStatetoProps = (state) => {
  return { userDetail: state.Auth.userData };
};

export default connect(mapStatetoProps, { Updateuser })(UserSettings);
