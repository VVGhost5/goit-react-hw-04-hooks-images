import styles from "./ButtonLoadMore.module.css";
import classNames from "classnames";
import propTypes from "prop-types";

const ButtonLoadMore = ({ setNextPage }) => {
  return (
    <button
      type="button"
      className={classNames(styles.Button, styles.ButtonPosition)}
      onClick={setNextPage}
    >
      Load more
    </button>
  );
};

ButtonLoadMore.propTypes = {
  setNextPage: propTypes.func.isRequired,
};

export default ButtonLoadMore;
