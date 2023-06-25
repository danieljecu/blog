import React, { useEffect, useState } from "react";
import axios from "axios";

function CommentsListByPost({ postId }: { postId: String }) {
  const [comments, setComments] = useState<{ id: Number; content: String }[]>(
    []
  );

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  },[]);


  const renderComments = comments.map((comment) => {
    return comment ? (
        <li key={String(comment.id)}> {comment.content}</li>
    ) : (
        "loading comment..."
    );
  })

  return (
    <div>
      <ul>
        {renderComments}
      </ul>
    </div>
  );
}
export default CommentsListByPost;
