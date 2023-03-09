import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getUsers, getComment, editComment, deleteComment } from '../../api';

function CommentCard({ comment, currentUser, refreshContent }) {
  const [selectedComment, setSelectedComment] = useState(null);
  const [users, setUsers] = useState(null);

  const params = useParams();

  useEffect(() => {
    setSelectedComment(comment);
  }, [comment]);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  const refreshComment = () => {
    getComment(comment).then((res) => {
      setSelectedComment(res);
    });
  }

  const handleDeleteComment = async () => {
    if (currentUser.id !== comment.author._id) return;

    await deleteComment(comment.post_id, comment._id);
    refreshContent();
  }

  const toggleLike = async () => {
    const commentCopy = Object.assign({}, comment);

    commentCopy.likes.includes(currentUser.id) ?
    commentCopy.likes.splice(commentCopy.likes.indexOf(currentUser.id), 1) :
    commentCopy.likes.push(currentUser.id)

    await editComment(commentCopy);
    refreshComment();
  }

  const toggleDisplayWhoLikes = () => {
    const displayWhoLikesContainer = document.querySelector(`#display-who-likes-${comment._id}-container`);
    
    displayWhoLikesContainer.style.display = displayWhoLikesContainer.style.display === 'none' ? 'block' : 'none';
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
        <p onClick={toggleDisplayWhoLikes}>{comment.likes.length} Likes</p> :
        <p onClick={toggleDisplayWhoLikes}>{comment.likes.length} Like</p>
      }

      {
        currentUser ?
          comment.likes.includes(currentUser.id) ?
          <button onClick={toggleLike}>Unlike</button> :
          <button onClick={toggleLike}>Like</button> :
        null
      }

      {
        currentUser && (currentUser.id === comment.author._id) ?
        <button onClick={handleDeleteComment}>Delete Comment</button> :
        null
      }

      <div id={`display-who-likes-${comment._id}-container`} style={{'display': 'none'}}>
        <p>Users who liked this comment:</p>
        {
          users && comment.likes.map((userId) => {
            const userList = users.filter((user) => user.id === userId)
            return userList.map((user) => <p>{user.firstName} {user.lastName}</p>)
          })
        }
      </div>
    </div>
  );
}

export default CommentCard;