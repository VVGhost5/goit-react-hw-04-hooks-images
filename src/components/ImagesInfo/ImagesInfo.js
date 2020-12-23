import React, { useState, useEffect } from "react";
import APIservice from "../../services/API";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import propTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function ImageInfo({
  request,
  page,
  setNextPage,
  images,
  setImages,
}) {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const scrollPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!request) {
      return;
    }

    setStatus(Status.PENDING);
    APIservice.getImages(request, page)
      .then((images) => {
        setImages((prevState) => [...prevState, ...images]);

        if (images) {
          setStatus(Status.RESOLVED);
          if (page > 1) {
            scrollPage();
          }
          return;
        }
        setStatus(Status.REJECTED);
      })
      .catch((error) => setError(error));
  }, [request, page, setImages]);

  if (status === "idle") {
    return null;
  }

  if (status === "pending") {
    return (
      <div className="Loader">
        <Loader
          margin="0 auto"
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      </div>
    );
  }

  if (status === "rejected") {
    toast.error(error);
    return;
  }

  if (status === "resolved") {
    return null;
  }
}

ImageInfo.propTypes = {
  setNextPage: propTypes.func.isRequired,
  page: propTypes.number.isRequired,
  request: propTypes.string.isRequired,
};
