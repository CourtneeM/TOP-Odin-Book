import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getUsers, getComment, editComment, deleteComment } from '../../api';
import LikeCard from '../Likes/LikeCard';

function CommentCard({ comment, currentUser, refreshContent }) {
  const [selectedComment, setSelectedComment] = useState(null);
  const [users, setUsers] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newCommentMessage, setNewCommentMessage] = useState('');

  const params = useParams();

  useEffect(() => {
    setSelectedComment(comment);
    setNewCommentMessage(comment.message);
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
  const handleEditComment = async () => {
    if (currentUser.id !== comment.author._id) return;

    const commentCopy = Object.assign(comment, {});
    commentCopy.message = newCommentMessage;

    await editComment(commentCopy);
    
    setEditMode(!editMode);
    refreshComment();
  }
  const handleCancelEditComment = () => {
    setNewCommentMessage(selectedComment.message);
    setEditMode(false);
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
    const displayWhoLikesContainer = document.querySelector(`#who-likes-${comment._id}-container`);
    
    displayWhoLikesContainer.classList.contains('hidden') ?
    displayWhoLikesContainer.classList.remove('hidden') :
    displayWhoLikesContainer.classList.add('hidden');
  }

  return (
    <div className={`comment-card comment-card-${comment._id}`}>
      {
        params.userId ?
        <p className="comment-author">{comment.author.first_name} {comment.author.last_name}</p> :
        <Link to={`/users/${comment.author._id}`}>
          <p className="comment-author">{comment.author.first_name} {comment.author.last_name}</p>
        </Link>
      }
      <p className="comment-timestamp">{comment.timestamp}</p>
      {
        selectedComment && !editMode ?
        <p className={`comment-message comment-${comment._id}-message`}>{selectedComment.message}</p> :
          currentUser && editMode ?
          <textarea className={`edit-comment-message edit-comment-${comment._id}-message`} value={newCommentMessage} onChange={(e) => setNewCommentMessage(e.target.value)}></textarea> :
        <p>Loading comment...</p>
      }

      <div className="comment-footer">

        {
          !editMode ?
            comment.likes.length === 0 || comment.likes.length > 1 ?
            <p className="likes-message" onClick={toggleDisplayWhoLikes}>{comment.likes.length} Likes</p> :
            <p className="likes-message" onClick={toggleDisplayWhoLikes}>{comment.likes.length} Like</p> :
          null
        }

        <LikeCard content={comment} users={users} />

        <div className="comment-actions">
          {
            currentUser ?
            <>
              {
                !editMode ?
                  comment.likes.includes(currentUser.id) ?
                  <button onClick={toggleLike}>Unlike</button> :
                  <button onClick={toggleLike}>Like</button> :
                null
              }

              {
                (currentUser.id === comment.author._id) && !editMode ?
                <button onClick={() => setEditMode(true)}>Edit Comment</button> :
                null
              }

              {
                (currentUser.id === comment.author._id) && editMode ?
                <>
                  <button onClick={handleEditComment}>Save</button>
                  <button onClick={handleCancelEditComment}>Cancel Edit</button>
                </> :
                null
              }

              {
                (currentUser.id === comment.author._id) && editMode ?
                <button onClick={handleDeleteComment}>Delete Comment</button> :
                null
              }
            </> :
            null
          }
        </div>
      </div>
    </div>
  );
}

export default CommentCard;