import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./components/Searchbar/Searchbar";
import ImagesInfo from "./components/ImagesInfo/ImagesInfo";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";

export default function App() {
  const [request, setRequest] = useState("");
  const [picture, setPicture] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);

  const handleFormSubmit = (request) => {
    setImages([]);
    setPage(1);
    setRequest(request);
  };

  const choosePicture = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    setPicture(e.target.currentSrc);
    toogleModal();
  };

  const toogleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const setNextPage = () => {
    console.log("setNExtPage worked");
    setPage((prevState) => prevState + 1);
  };

  const resetPage = () => {
    setPage(1);
  };

  return (
    <div onClick={choosePicture} className="App">
      {showModal && <Modal image={picture} onClose={toogleModal}></Modal>}
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      <ImagesInfo
        request={request}
        page={page}
        setNextPage={setNextPage}
        resetPage={resetPage}
        images={images}
        setImages={setImages}
      />
      {images.length > 0 && (
        <ImageGallery images={images} setNextPage={setNextPage} />
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
