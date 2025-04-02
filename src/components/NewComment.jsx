import { useState } from "react";
import { postComment } from "../../app";

const NewComment = ({ article_id, addComment, author }) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() === "") {
      setError("Comment cannot be empty");
      return;
    }

    setIsSubmitting(true);

    postComment(article_id, author, newComment)
      .then((comment) => {
        addComment(comment);
        setNewComment("");
        setIsSubmitting(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
        setError("Failed to post comment. Please try again.");
      });
  };

  return (
    <div className="new-comment">
      <form onSubmit={handleSubmit}>
        <h2>Comments</h2>
        <textarea
          className="comment-textarea"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder="Give us your thoughts..."
        ></textarea>
        {error && <p className="error">{error}</p>}
        <button
          type="submit"
          className="comment-submit-button"
          disabled={isSubmitting}
        >
          Submit Your Thoughts
        </button>
      </form>
    </div>
  );
};
export default NewComment;
