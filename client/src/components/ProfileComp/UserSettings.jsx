/** @format */

import React, { useState, useEffect } from "react";
import "./upcomp.styles.scss";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";
import toast, { Toaster } from "react-hot-toast";
import ImageUpload from "../../customhook/ImageUpload";

import { Updateuser } from "../../redux/actions";
import { connect } from "react-redux";

const UserSettings = ({ userData, Updateuser }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const [imageState, setImageState] = useState(false);
  const [imgUrl, setimgUrl] = useState("");
  const [tId, settoastId] = useState("");
  const [UpData, setUpData] = useState("");
  const [user, setUser] = useState("");

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
  const handleImage = async (url) => {
    if (!UpData) {
      toast.dismiss();
      toast.error("Please press submit button again");
    } else {
      if (url) {
        toast.dismiss();
        toast.success("Image uploaded", {
          id: tId,
        });

        await Updateuser(UpData, url, toast);
        setImageState(false);
      }
    }
  };
  const onSubmit = async (data) => {
    data.userId = userData.userId;
    setUpData(data);
    if (imageState) {
      const toastId = toast.loading("Saving Data please wait ...");
      settoastId(toastId);

      setTimeout(async () => {
        const progressbar = document.querySelector(".up-progress-bar");
        await ImageUpload(imgUrl, progressbar, handleImage);
      }, 1200);
    } else {
      const toastid = toast.loading("Updating Data");
      await Updateuser(data, userData.profileUrl, toast);
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
    setTimeout(() => {
      document.querySelector(".user-selected-img").setAttribute("src", src);
    }, 1200);
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
            <button className="up-form-btn"> Update</button>
          </div>
          {imageState && (
            <div className="up-form-right">
              <div className="up-form-img-sel">
                <img className="user-selected-img" src="" alt="err" />
              </div>
              <span className="up-progress-bar"></span>
            </div>
          )}
        </form>
      </div>{" "}
      <Toaster />
    </div>
  );
};

export default connect(null, { Updateuser })(UserSettings);
