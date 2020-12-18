import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./components/Searchbar/Searchbar";
import ImagesInfo from "./components/ImagesInfo/ImagesInfo";
import Modal from "./components/Modal/Modal";

export default function App() {
  const [request, setRequest] = useState("");
  const [picture, setPicture] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  function handleFormSubmit(request) {
    setRequest(request);
  }

  function choosePicture(e) {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    setPicture(e.target.currentSrc);
    toogleModal();
  }

  function toogleModal() {
    setShowModal((showModal) => !showModal);
  }

  function addPage() {
    setPage((prevState) => prevState + 1);
  }

  function resetPage() {
    setPage(1);
  }

  return (
    <div onClick={choosePicture} className="App">
      {showModal && <Modal image={picture} onClose={toogleModal}></Modal>}
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      <ImagesInfo
        request={request}
        page={page}
        addPage={addPage}
        resetPage={resetPage}
      />
      <ToastContainer autoClose={3000} />
    </div>
  );
}
