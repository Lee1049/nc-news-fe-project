import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchComments, fetchSingleArticle } from "../../app";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchSingleArticle(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setComments(articleData.comments);
        return fetchComments(article_id);
      })
      .then((commentsData) => {
        console.log(commentsData, "comments");
        setComments(commentsData);
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
          Topic:{" "}
          {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
        </h2>
        <h3>
          Author:{" "}
          {article.author.charAt(0).toUpperCase() + article.author.slice(1)}
        </h3>
        <img src={article.article_img_url} alt={article.title}></img>
        <p>{article.body}</p>
        <p> Article Votes: {article.votes}</p>
        <p>Posted: {new Date(article.created_at).toLocaleDateString()}</p>
        <ul>
          {comments.length > 0 ? (
            comments.map((comments) => (
              <li key={comments.comment_id} className="comments-card">
                <p>Author: {comments.author}</p>
                <p>{comments.body}</p>
                <p> Comment Votes: {comments.votes}</p>
                <p>
                  Posted: {new Date(comments.created_at).toLocaleDateString()}
                </p>
              </li>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SingleArticle;
