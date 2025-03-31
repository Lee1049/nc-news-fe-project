import axios from "axios";
const api = axios.create({
  baseURL: "https://news-app-backend-project.onrender.com/api",
});

export const fetchArticles = () => {
  return api
    .get("/articles")
    .then(({ data }) => {
      return data.articles;
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
    });
};
