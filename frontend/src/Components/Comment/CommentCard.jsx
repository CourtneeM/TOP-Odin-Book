import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getComment, editComment } from '../../api';

function CommentCard({ comment, currentUser }) {
  const [selectedComment, setSelectedComment] = useState(null);
  const params = useParams();

  useEffect(() => {
    setSelectedComment(comment);
  }, [comment]);

  const toggleLike = async () => {
    const commentCopy = Object.assign({}, comment);

    commentCopy.likes.includes(currentUser.id) ?
    commentCopy.likes.splice(commentCopy.likes.indexOf(currentUser.id), 1) :
    commentCopy.likes.push(currentUser.id)

    await editComment(commentCopy);
    refreshComment();
  }

  const refreshComment = () => {
    getComment(comment).then((res) => {
      setSelectedComment(res);
    });
  }

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

      {
        comment.likes.includes(currentUser.id) ?
        <button onClick={toggleLike}>Unlike</button> :
        <button onClick={toggleLike}>Like</button>
      }
    </div>
  );
}

export default CommentCard;