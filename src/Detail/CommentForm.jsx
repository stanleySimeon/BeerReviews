import { useState } from "react";

export default function CommentForm(props) {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = { email, comment };
    // call API endpoint to add comment
    // for example:
    fetch(`http://127.0.0.1:8000/webservice/php/biere/${props.beerId}/commentaire`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add comment");
        }
        // refresh comments after successful comment submission
        props.onCommentAdded();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <br />
      <label>
        Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
      </label>
      <br />
      <button type="submit">Add Comment</button>
    </form>
  );
}
