import { Link, useParams } from 'react-router-dom';

function CommentCard({ comment }) {
  const params = useParams();

  return (
    <div>
      {
        params.userId ?
        <p>{comment.author.first_name} {comment.author.last_name}</p> :
        <Link to={`/users/${comment.author._id}`}>
          <p>{comment.author.first_name} {comment.author.last_name}</p>
        </Link>
      }
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