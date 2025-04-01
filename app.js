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

export const fetchSingleArticle = (article_id) => {
  return api
    .get(`/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch((error) => {
      console.error("Error fetching article:", error);
    });
};
