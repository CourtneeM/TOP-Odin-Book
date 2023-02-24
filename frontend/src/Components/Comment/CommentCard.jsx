function CommentCard({ comment }) {
  return (
    <div>
      <p>{comment.author.first_name} {comment.author.last_name}</p>
      <p>{comment.timestamp}</p>
      <p>{comment.message}</p>
      {
        comment.likes.length === 0 || comment.likes.length > 1 ?
        <p>{comment.likes.length} Likes</p> :
        <p>{comment.likes.length} Like</p>
      }
    </div>
  );
}

export default CommentCard;