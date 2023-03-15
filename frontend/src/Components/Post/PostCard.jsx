import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUsers, getPost, editPost, deletePost, getComments, createComment } from '../../api';

import CommentCard from '../Comment/CommentCard';
import LikeCard from '../Likes/LikeCard';

function PostCard({ post, currentUser, refreshContent }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPostMessage, setNewPostMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newCommentMode, setNewCommentMode] = useState(false);
  const [users, setUsers] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentsPreview, setCommentsPreview] = useState(true);
  const [numCommentsToLoad, setNumCommentsToLoad] = useState(2);
  const [newCommentMessage, setNewCommentMessage] = useState('');

  const params = useParams();

  useEffect(() => {
    setSelectedPost(post);
    setNewPostMessage(post.message);
  }, [post]);

  useEffect(() => {
    getComments(post._id).then((res) => {
      setComments(res.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    });
  }, [post, selectedPost]);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  useEffect(() => {
    params.userId ? setCommentsPreview(false) : setCommentsPreview(true);
  }, [params.userId]);

  const handleSubmitComment = async () => {
    if (newCommentMessage === '') return;

    const newComment = {
      message: newCommentMessage,
      author: currentUser.id,
      post_id: post._id
    }

    await createComment(newComment);

    setNewCommentMessage('');
    setNewCommentMode(false);
    refreshPost();
  }

  const loadMoreComments = () => setNumCommentsToLoad(numCommentsToLoad + 4);
  const hideComments = () => setNumCommentsToLoad(2);

  const refreshPost = () => {
    getPost(post._id).then((res) => {
      setSelectedPost(res);
    });
  }

  const handleEditPost = async () => {
    if (currentUser.id !== post.author._id) return;

    const postCopy = Object.assign(post, {});
    postCopy.message = newPostMessage;

    await editPost(postCopy);

    setEditMode(false);
    refreshPost();
  }
  const handleCancelEditPost = () => {
    setNewPostMessage(selectedPost.message);
    setEditMode(false);
  }
  const handleDeletePost = async () => {
    if (currentUser.id !== post.author._id) return;

    await deletePost(post._id);
    refreshContent();
  }

  const toggleLike = async () => {
    const postCopy = Object.assign({}, post);

    postCopy.likes.includes(currentUser.id) ?
    postCopy.likes.splice(postCopy.likes.indexOf(currentUser.id), 1) :
    postCopy.likes.push(currentUser.id)

    await editPost(postCopy);
    refreshPost();
  }
  const toggleDisplayWhoLikes = () => {
    const displayWhoLikesContainer = document.querySelector(`#who-likes-${post._id}-container`);
    
    displayWhoLikesContainer.classList.contains('hidden') ?
    displayWhoLikesContainer.classList.remove('hidden') :
    displayWhoLikesContainer.classList.add('hidden');
  }

  return (
    <div className={`post-card post-card-${post._id}`}>
      <div className="post-section">

        {
          params.userId ?
          <p className="post-author">{post.author.first_name} {post.author.last_name}</p> :
          <Link to={`/users/${post.author._id}`}>
            <p className="post-author">{post.author.first_name} {post.author.last_name}</p>
          </Link>
        }
        <p className="post-timestamp">{post.timestamp}</p>

        {
          selectedPost && !editMode ?
          <p className={`post-message post-${post._id}-message`}>{selectedPost.message}</p> :
            currentUser && editMode ?
            <textarea className={`edit-post-message edit-post-${post._id}-message`} value={newPostMessage} onChange={(e) => setNewPostMessage(e.target.value)}></textarea> :
          <p>Loading message...</p>
        }

        <div className="post-footer">
          {
            !editMode ?
            <> 
              {
                post.likes.length === 0 || post.likes.length > 1 ?
                <p className="likes-message" onClick={toggleDisplayWhoLikes}>{post.likes.length} Likes</p> :
                <p className="likes-message" onClick={toggleDisplayWhoLikes}>{post.likes.length} Like</p>
              }
              {
                comments ?
                  comments.length === 0 || comments.length > 1 ?
                  <p>{comments.length} Comments</p> :
                  <p>{comments.length} Comment</p> :
                null
              }
            </> :
            null
          }

          <LikeCard content={post} users={users} />

          <div className="post-actions">
            {
              currentUser && !editMode ?
                post.likes.includes(currentUser.id) ? 
                <button onClick={toggleLike}>Unlike</button> :
                <button onClick={toggleLike}>Like</button> :
              null
            }

            {
              currentUser && !editMode && !newCommentMode   ?
              <button id={`add-comment-btn-${post._id}`} onClick={() => setNewCommentMode(true)}>Comment</button> :
              null
            }

            {
              currentUser ?
              <>
                {
                  (currentUser.id === post.author._id) && !editMode ?
                  <button onClick={() => setEditMode(true)}>Edit Post</button> :
                  null
                }

                {
                  editMode ?
                  <>
                    <button onClick={handleEditPost}>Save</button>
                    <button onClick={handleCancelEditPost}>Cancel Edit</button>
                  </> :
                  null
                }

                {
                  (currentUser.id === post.author._id) && editMode ?
                  <button onClick={handleDeletePost}>Delete Post</button> :
                  null
                }
              </> :
              null
            }
          </div>
        </div>
      </div>

      {
        currentUser && newCommentMode ?
        <div className={`new-comment-container new-comment-container-${post._id}`}>
          <textarea className="new-comment-message" placeholder="Share your thoughts..." value={newCommentMessage} onChange={(e) => setNewCommentMessage(e.target.value)}></textarea>
          <div className="new-comment-actions">
            <button onClick={handleSubmitComment}>Submit</button>
            <button onClick={() => setNewCommentMode(false)}>Cancel</button>
          </div>
        </div> :
        null
      }

      {
        commentsPreview ?
        <>
          {
            comments?.slice(0, numCommentsToLoad).map((comment) => <CommentCard comment={comment} currentUser={currentUser} refreshContent={refreshPost} />)
          }
          {
            comments?.length > 2 && comments?.length <= numCommentsToLoad ?
            <button onClick={hideComments}>Hide Comments</button> :
            null
          }
          {
            comments?.length > 2 && comments?.length > numCommentsToLoad ?
            <button onClick={loadMoreComments}>Load More Comments</button> :
            null
          }
        </> :
        null
      }
    </div>
  );
}

export default PostCard;