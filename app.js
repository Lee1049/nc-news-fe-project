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

export const fetchComments = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
    });
};

export const updateArticleVotes = (article_id, inc_votes) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes })
    .then(({ data }) => {
      return data.article;
    })
    .catch((error) => {
      console.error("Error updating article votes:", error);
    });
};

export const postComment = (article_id, author, body) => {
  return api
    .post(`/articles/${article_id}/comments`, { author, body })
    .then(({ data }) => {
      return data.comment;
    })
    .catch((error) => {
      console.error("Error posting comment:", error);
    });
};

export const deleteComment = (comment_id) => {
  return api
    .delete(`/comments/${comment_id}`)
    .then(() => {})
    .catch((error) => {
      console.error("Error deleting comment:", error.message);
      if (error.response) {
        console.error("Error response:", error.response);
      }
      if (error.config) {
        console.error("Error config:", error.config);
      }
    });
};
