import { useEffect, useState } from "react";
import { fetchArticles } from "../../app";
import SortBy from "./SortBy";
import { Link } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";

function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");

  useEffect(() => {
    setLoading(true);

    fetchArticles(sortBy).then((articles) => {
      let sortedArticles = [...articles];

      if (sortBy === "oldest") {
        sortedArticles.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
      } else if (sortBy === "newest") {
        sortedArticles.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      } else if (sortBy === "most_votes") {
        sortedArticles.sort((a, b) => b.votes - a.votes);
      } else if (sortBy === "least_votes") {
        sortedArticles.sort((a, b) => a.votes - b.votes);
      } else if (sortBy === "most_comments") {
        sortedArticles.sort((a, b) => b.comment_count - a.comment_count);
      } else if (sortBy === "least_comments") {
        sortedArticles.sort((a, b) => a.comment_count - b.comment_count);
      }

      setArticles(sortedArticles);
      setLoading(false);
    });
  }, [sortBy]);

  if (loading)
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  if (articles.length === 0) return <p>No articles found.</p>;

  return (
    <div>
      <div className="all-articles-header">
        <h2>All Articles</h2>
      </div>
      <SortBy setSortBy={setSortBy} />

      <div className="all-articles-info">
        <ul className="image-container">
          {articles.map((article) => (
            <li key={article.article_id} className="single-article-card">
              <h3>{article.title}</h3>
              <img
                className="image"
                src={article.article_img_url}
                alt={article.title}
              ></img>
              <p>Author: {article.author}</p>
              <p>Posted: {new Date(article.created_at).toLocaleDateString()}</p>
              <p>Votes: {article.votes}</p>
              <p>Comments: {article.comment_count}</p>
              <Link className="link" to={`/articles/${article.article_id}`}>
                <p>Click to View</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllArticles;
