import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchComments,
  fetchSingleArticle,
  updateArticleVotes,
} from "../../app";
import NewComment from "./NewComment";
import RemoveComment from "./RemoveComment";
import LoadingAnimation from "./LoadingAnimation";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [voteChange, setVoteChange] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchSingleArticle(article_id)
      .then((articleData) => {
        if (!articleData) {
          setError(
            "This article does not exist. Click the logo to go back home."
          );
          setLoading(false);
          return;
        }
        setArticle(articleData);
        return fetchComments(article_id);
      })
      .then((commentsData) => {
        if (!commentsData) {
          setError("No comments found for this article.");
          setLoading(false);
          return;
        }
        setComments(commentsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the article:", error);
        setError("This article does not exist.");
        setLoading(false);
      });
  }, [article_id]);

  const handleVoteChange = (vote) => {
    setVoteChange((prevVoteChange) => prevVoteChange + vote);

    updateArticleVotes(article_id, vote).catch((error) => {
      console.error("Error updating votes:", error);
      setVoteChange((prevVoteChange) => prevVoteChange - vote);
    });
  };

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleDeleteComment = (comment_id) => {
    setComments((prevComments) => {
      const newComments = prevComments.filter(
        (comment) => comment.comment_id !== comment_id
      );
      return newComments;
    });
  };

  if (loading)
    return (
      <div>
        <LoadingAnimation />
        <p>Loading articles...</p>
      </div>
    );
  if (error) return <p className="error-message">{error}</p>;

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
        <img
          src={article.article_img_url}
          alt={article.title}
          className="image"
        ></img>
        <p className="single-article-body">{article.body}</p>
        <p> Article Votes: {article.votes + voteChange}</p>
        <button onClick={() => handleVoteChange(1)} className="voting-button">
          👍
        </button>
        <button onClick={() => handleVoteChange(-1)} className="voting-button">
          👎
        </button>
        <p>Posted: {new Date(article.created_at).toLocaleDateString()}</p>
        <NewComment
          article_id={article_id}
          addComment={handleNewComment}
          author="cooljmessy"
        />
        <ul>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment.comment_id} className="comments-card">
                <p>Author: {comment.author}</p>
                <p>{comment.body}</p>
                <p> Comment Votes: {comment.votes}</p>
                <div>
                  Posted: {new Date(comment.created_at).toLocaleDateString()}
                  <RemoveComment
                    comment_id={comment.comment_id}
                    setComments={handleDeleteComment}
                  />
                </div>
              </li>
            ))
          ) : (
            <p>Be the first to comment!</p>
          )}
        </ul>
      </div>
    </div>
  );
}
export default SingleArticle;
