import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleArticle } from "../../app";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSingleArticle(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the article:", error);
        setLoading(false);
      });
  }, [article_id]);

  if (loading) return <p>Loading article...</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      <div className="single-article">
        <h2>
          Topic:
          {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
        </h2>
        <h3>
          Author:
          {article.author.charAt(0).toUpperCase() + article.author.slice(1)}
        </h3>
        <img src={article.article_img_url} alt={article.title}></img>
        <p>{article.body}</p>
        <p>Votes: {article.votes}</p>
        <p>Posted: {new Date(article.created_at).toLocaleDateString()}</p>
        <p>Comments: {article.comment_count}</p>
      </div>
    </div>
  );
}

export default SingleArticle;
