import { useEffect, useState } from "react";
import { fetchArticles } from "../../app";
import SortBy from "./SortBy";
import { Link } from "react-router-dom";

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
      } else {
        sortedArticles.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      }

      setArticles(sortedArticles);
      setLoading(false);
    });
  }, [sortBy]);

  return (
    <div>
      <div className="all-articles-header">
        <h2>All Articles</h2>
      </div>
      <SortBy setSortBy={setSortBy} />

      <div className="all-articles-info">
        {loading && <p>Loading articles...</p>}
        {articles.length === 0 && !loading && <p>No articles found.</p>}

        {!loading && articles.length > 0 && (
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
                <p>
                  Posted: {new Date(article.created_at).toLocaleDateString()}
                </p>
                <Link to={`/articles/${article.article_id}`}>
                  <p>Click to View</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AllArticles;
