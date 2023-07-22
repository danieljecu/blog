import React from "react";

function CommentsList({ comments }: {comments: {id:string, content:string}[]}) {

  const renderComments = comments.map((comment) => {
    return <li key={String(comment.id)}> {comment.content}</li>
  });

  return (
    <div>
      <ul>{renderComments}</ul>
    </div>
  );
}
export default CommentsList;
