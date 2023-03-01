import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUsers, getPost, editPost, getComments } from '../../api';

import CommentCard from '../Comment/CommentCard';

function PostCard({ post, currentUser }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentsPreview, setCommentsPreview] = useState(true);
  const [numCommentsToLoad, setNumCommentsToLoad] = useState(2);
  const [users, setUsers] = useState(null);

  const params = useParams();

  useEffect(() => {
    setSelectedPost(post);
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

  const loadMoreComments = () => setNumCommentsToLoad(numCommentsToLoad + 4);
  const hideComments = () => setNumCommentsToLoad(2);

  const toggleLike = async () => {
    const postCopy = Object.assign({}, post);

    postCopy.likes.includes(currentUser.id) ?
    postCopy.likes.splice(postCopy.likes.indexOf(currentUser.id), 1) :
    postCopy.likes.push(currentUser.id)

    await editPost(postCopy);
    refreshPost();
  }

  const refreshPost = () => {
    getPost(post._id).then((res) => {
      setSelectedPost(res);
    });
  }

  const toggleDisplayWhoLikes = () => {
    const displayWhoLikesContainer = document.querySelector(`#display-who-likes-${post._id}-container`);
    
    displayWhoLikesContainer.style.display = displayWhoLikesContainer.style.display === 'none' ? 'block' : 'none';
  }

  return (
    <div className={`post-card-${post._id}`}>
      {
        params.userId ?
        <p>{post.author.first_name} {post.author.last_name}</p> :
        <Link to={`/users/${post.author._id}`}>
          <p>{post.author.first_name} {post.author.last_name}</p>
        </Link>
      }
      <p>{post.timestamp}</p>
      <p>{post.message}</p>
      {
        post.likes.length === 0 || post.likes.length > 1 ?
        <p onClick={toggleDisplayWhoLikes}>{post.likes.length} Likes</p> :
        <p onClick={toggleDisplayWhoLikes}>{post.likes.length} Like</p>
      }
      {
        comments ?
          comments.length === 0 || comments.length > 1 ?
          <p>{comments.length} Comments</p> :
          <p>{comments.length} Comment</p> :
        null
      }
      {
        post.likes.includes(currentUser.id) ? 
        <button onClick={toggleLike}>Unlike</button> :
        <button onClick={toggleLike}>Like</button>
      }

      <div id={`display-who-likes-${post._id}-container`} style={{'display': 'none'}}>
        <p>Users who liked this post:</p>
        {
          users && post.likes.map((userId) => {
            const userList = users.filter((user) => user.id === userId)
            return userList.map((user) => <p>{user.firstName} {user.lastName}</p>)
          })
        }
      </div>

      {
        commentsPreview ?
        <>
          <h3>Comments</h3>
          {
            comments?.slice(0, numCommentsToLoad).map((comment) => <CommentCard comment={comment} currentUser={currentUser} />)
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