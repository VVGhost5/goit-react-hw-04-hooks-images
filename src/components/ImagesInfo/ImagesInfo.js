import React, { useState, useEffect } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import axios from "axios";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import propTypes from "prop-types";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function ImageInfo({ resetPage, request, page, addPage }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(
    (prevState) => {
      if (!request) {
        return;
      }
      setStatus(Status.PENDING);
      fetchFromAPI();
      resetPage();
    },
    [request, page]
  );

  useEffect(() => {
    scrollPage();
  }, [images]);

  function scrollPage() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  function fetchFromAPI() {
    const key = "18616543-61f088c3928fc4bac834774e6";
    const url = `https://pixabay.com/api/?q=${request}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;
    axios
      .get(url)
      .then((images) => {
        if (page > 1) {
          setImages((prevState) => [...prevState, ...images.data.hits]);
        }

        if (page === 1) {
          setImages(images.data.hits);
        }
        setStatus(Status.RESOLVED);
      })
      .catch((error) => setError(Status.REJECTED));
  }

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
    return <div>{error}</div>;
  }

  if (status === "resolved") {
    return <ImageGallery images={images} addPage={addPage} />;
  }
}

ImageInfo.propTypes = {
  addPage: propTypes.func.isRequired,
  resetPage: propTypes.func.isRequired,
  page: propTypes.number.isRequired,
  request: propTypes.string.isRequired,
};
