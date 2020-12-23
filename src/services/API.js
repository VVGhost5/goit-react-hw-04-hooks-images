import axios from "axios";

const API_KEY = "18616543-61f088c3928fc4bac834774e6";
const BASE_URL = `https://pixabay.com/api/`;

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: "Photo",
  orientation: "horizontal",
  per_page: 12,
};

const getImages = async (query, page) => {
  console.log(query);
  console.log(page);
  try {
    const res = await axios.get(`?page=${page}&q=${query}`);
    return res.data.hits;
  } catch (error) {
    console.log("error", { error });
    return [];
  }
};

const api = {
  getImages,
};

export default api;
