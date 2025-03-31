import axios from "axios";
const api = axios.create({
  baseURL: "https://news-app-backend-project.onrender.com/api",
});

export const fetchArticles = () => {
  return api
    .get("/articles?sort_by=created_at&order=desc")
    .then(({ data }) => {
      return data.articles;
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
    });
};
