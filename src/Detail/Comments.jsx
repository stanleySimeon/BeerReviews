import { useState, useEffect } from "react";

function Comments(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/webservice/php/biere/${props.beerId}/commentaire`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error(error));
  }, [props.beerId]);

  return (
    <div>
      <h2>Comments</h2>
      {/* comments.map is not a function */}
       {comments.map((comment) => (
        <div key={comment.id}>
            <p>{comment.comment}</p>
            <p>{comment.rating}</p>
        </div>
        ))}
    </div>
  );
}

export default Comments;
