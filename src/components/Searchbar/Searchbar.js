import React, { useState } from "react";
import styles from "./Searchbar.module.css";
import { toast } from "react-toastify";
import propTypes from "prop-types";

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  function handleQueryChange(event) {
    setQuery(event.currentTarget.value.toLowerCase());
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!query.trim()) {
      toast.error("Enter your request");
      return;
    }
    onSubmit(query);
    setQuery("");
  }
  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <span className={styles.buttonLabel}>Search</span>
        </button>

        <input
          className={styles.input}
          name="request"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
