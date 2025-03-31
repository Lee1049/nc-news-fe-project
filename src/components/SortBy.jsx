import { useEffect, useState } from "react";
import { fetchArticles } from "../../app";

function SortBy() {
  const [articles, setArticles] = useState([]);
  const [sortedArticles, setSortedArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((articles) => {
      setArticles(articles);
      setSortedArticles(articles);
    });
  }, []);

  const handleSortChange = (event) => {
    const sortBy = event.target.value;
    const sorted = [...articles];

    if (sortBy === "Newest") {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === "Oldest") {
      sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    setSortedArticles(sorted);
  };

  return (
    <div>
      <label>Sort by: </label>
      <select id="sort-by" onChange={handleSortChange}>
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
      </select>
      <div className="all-articles-info">
        <ul className="image-container">
          {sortedArticles.map((article) => (
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
        </ul>
      </div>
    </div>
  );
}

export default SortBy;
