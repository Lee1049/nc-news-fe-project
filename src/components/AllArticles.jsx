import { useEffect, useState } from "react";
import { fetchArticles } from "../../app";
import SortBy from "./SortBy";

function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");

  useEffect(() => {
    fetchArticles().then((articles) => {
      setArticles(articles);
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
        <ul className="image-container">
          {articles.map((article) => (
            <li key={article._id} className="single-article-card">
              <h3>{article.title}</h3>
              <p>{article.body}</p>
              <p>Author: {article.author}</p>
              <p>
                Posted:
                {new Date(article.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
          {loading && <p>Loading articles...</p>}
          {articles.length === 0 && !loading && <p>No articles found.</p>}
        </ul>
      </div>
    </div>
  );
}

export default AllArticles;
