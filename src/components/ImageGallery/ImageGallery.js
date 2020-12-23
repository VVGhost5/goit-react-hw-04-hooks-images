import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "./ImageGalleryItem";
import ButtonLoadMore from "../ButtonLoadMore/ButtonLoadMore";
import propTypes from "prop-types";

const ImageGallery = ({ images, setNextPage }) => {
  return (
    <div>
      <ul className={styles.ImageGallery}>
        {images.map((img) => (
          <ImageGalleryItem key={img.id} imageData={img}></ImageGalleryItem>
        ))}
      </ul>
      <ButtonLoadMore setNextPage={setNextPage}></ButtonLoadMore>
    </div>
  );
};

ImageGallery.propTypes = {
  setNextPage: propTypes.func.isRequired,
  images: propTypes.arrayOf(propTypes.object.isRequired),
};

export default ImageGallery;
