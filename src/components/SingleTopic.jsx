import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticlesByTopic } from "../../app";

function SingleTopic() {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchArticlesByTopic(topic_slug)
      .then((articles) => {
        if (!articles ?? articles.length === 0) {
          setError(
            "This topic does not exist. Click the logo to go back home."
          );
          setLoading(false);
          return;
        }
        setArticles(articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setError("Failed to load articles for this topic.");
        setLoading(false);
      });
  }, [topic_slug]);

  if (loading) return <p>Loading topic...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <div className="single-topic">
        <h2>
          Articles for{" "}
          {topic_slug.charAt(0).toUpperCase() + topic_slug.slice(1)}
        </h2>
      </div>

      <ul className="image-container">
        {articles.map((article) => (
          <li key={article.article_id} className="single-topic-card">
            <h3>{article.title}</h3>
            <img
              className="image"
              src={article.article_img_url}
              alt={article.title}
            />
            <p>Author: {article.author}</p>
            <p>Posted: {new Date(article.created_at).toLocaleDateString()}</p>
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
            <Link to={`/articles/${article.article_id}`}>
              <p>Click to View</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SingleTopic;
