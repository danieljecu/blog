import React from "react";

function CommentsList({ comments }: {comments: {id:string, content:string, status:string}[]}) {

  const renderComments = comments.map((comment) => {
    let content;
    if (comment.status === 'approved'){
      content= comment.content
    }

    if (comment.status === 'rejected'){
      content= "this comment is rejected"
    }

    if (comment.status === 'pending'){
      content= "this comment is awating moderation"
    }
    return <li key={String(comment.id)}>{content}</li>
  });

  return (
    <div>
      <ul>{renderComments}</ul>
    </div>
  );
}
export default CommentsList;
