import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticlesByTopic } from "../../app";
import { Link } from "react-router-dom";

function SingleTopic() {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticlesByTopic(topic_slug).then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, [topic_slug]);

  return (
    <div>
      <div className="single-topic">
        <h2>
          Articles for{" "}
          {topic_slug.charAt(0).toUpperCase() + topic_slug.slice(1)}
        </h2>
      </div>
      {loading && <p>Loading articles...</p>}
      {articles.length === 0 && !loading && (
        <p>No articles found for this topic.</p>
      )}

      {!loading && articles.length > 0 && (
        <ul className="image-container">
          {articles.map((article) => (
            <li key={article.article_id} className="single-topic-card">
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
              <Link to={`/articles/${article.article_id}`}>
                <p>Click to View</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SingleTopic;
