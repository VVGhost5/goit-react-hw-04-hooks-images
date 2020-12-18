import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import propTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ onClose, image }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  function handleKeyDown(e) {
    if (e.code === "Escape") {
      onClose();
    }
  }

  function handleBackDrop(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackDrop}>
      <div className={styles.Modal}>
        <img src={image} alt="modal image" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: propTypes.func.isRequired,
  image: propTypes.string.isRequired,
};
