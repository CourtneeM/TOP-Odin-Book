import { useEffect } from 'react';
import { useState } from 'react';
import { getComments } from '../../api';

import CommentCard from '../Comment/CommentCard';

function PostCard({ post }) {
  const [comments, setComments] = useState(null);
  const [commentsPreview, setCommentsPreview] = useState(true);
  const [numCommentsToLoad, setNumCommentsToLoad] = useState(2);

  useEffect(() => {
    getComments(post._id).then((res) => {
      setComments(res.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    });
  }, [post]);

  const loadMoreComments = () => {
    setNumCommentsToLoad(numCommentsToLoad + 4);
  }

  const hideComments = () => {
    setNumCommentsToLoad(2);
  }

  return (
    <div>
      <p>{post.author.first_name} {post.author.last_name}</p>
      <p>{post.timestamp}</p>
      <p>{post.message}</p>
      {
        post.likes.length === 0 || post.likes.length > 1 ?
        <p>{post.likes.length} Likes</p> :
        <p>{post.likes.length} Like</p>
      }
      {
        comments ?
          comments.length === 0 || comments.length > 1 ?
          <p>{comments.length} Comments</p> :
          <p>{comments.length} Comment</p> :
        null
      }

      <h3>Comments</h3>
      {
        commentsPreview ?
        comments?.slice(0, numCommentsToLoad).map((comment) => <CommentCard comment={comment} />) :
        null
      }
      {
        comments?.length > 2 && comments.length <= numCommentsToLoad ?
        <button onClick={hideComments}>Hide Comments</button> :
        null
      }
      {
        comments?.length > 2 && comments.length > numCommentsToLoad ?
        <button onClick={loadMoreComments}>Load More Comments</button> :
        null
      }
    </div>
  );
}

export default PostCard;