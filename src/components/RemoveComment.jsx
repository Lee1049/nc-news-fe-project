import { useState } from "react";
import { deleteComment } from "../../app";

const RemoveComment = ({ comment_id, setComments }) => {
  const [removeComment, setRemoveComment] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your thoughts, friend?"
    );

    if (confirmDelete) {
      setRemoveComment(true);

      deleteComment(comment_id)
        .then(() => {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.comment_id !== comment_id)
          );
          setRemoveComment(false);
          window.alert("Your thoughts have been removed. Refresh the page.");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting comment:", error);
          setError("Failed to delete your thoughts. Please try again.");
          setRemoveComment(false);
        });
    } else {
      setError("Thoughts deletion has been cancelled.");
    }
  };

  return (
    <div>
      {removeComment && <div>Deleting your thoughts...</div>}
      <button
        onClick={handleDelete}
        className="delete-comment-button"
        disabled={removeComment}
      >
        Delete Thoughts
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RemoveComment;
