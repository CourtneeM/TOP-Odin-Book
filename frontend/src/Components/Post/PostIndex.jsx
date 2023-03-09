import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, createPost } from '../../api';

import Navbar from '../Navbar';
import PostCard from './PostCard';

function PostIndex({ currentUser, setCurrentUser }) {
  const [posts, setPosts] = useState(null);
  const [newPostMessage, setNewPostMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/');
  }, [currentUser])

  useEffect(() => {
    refreshPosts();
  }, []);

  const handleSubmitPost = async () => {
    if (newPostMessage === '') return;

    const newPost = {
      message: newPostMessage,
      author: currentUser.id,
    }

    await createPost(newPost);

    setNewPostMessage('');
    toggleDisplayNewPostForm();
    refreshPosts();
  }

  const refreshPosts = () => {
    getPosts().then((res) => {
      const filteredPosts = res.filter((post) => {
        if (post.author._id === currentUser.id) return true;

        return currentUser.friends.filter((friendId) => {
          return post.author._id.includes(friendId);
        })[0];
      });

      console.log('refresh posts')
      setPosts(filteredPosts);
    });
  }

  const toggleDisplayNewPostForm = () => {
    const displayNewCommentContainer = document.querySelector(`#new-post-container`);
    const addCommentBtn = document.querySelector(`#add-post-btn`);
    
    if (displayNewCommentContainer.style.display === 'none') {
      displayNewCommentContainer.style.display = 'block'
      addCommentBtn.style.display = 'none';
    } else {
      displayNewCommentContainer.style.display = 'none'
      addCommentBtn.style.display = 'inline-block';
    }
  }

  return (
    <div>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <div className="post-index-container">
        <h1>Post Index</h1>

        <button id={`add-post-btn`} onClick={toggleDisplayNewPostForm}>Add Post</button>
        <div id="new-post-container" style={{'display': 'none'}}>
          <textarea placeholder="Share your thoughts..." value={newPostMessage} onChange={(e) => setNewPostMessage(e.target.value)}></textarea>
          <button onClick={handleSubmitPost}>Submit</button>
          <button onClick={toggleDisplayNewPostForm}>Cancel</button>
        </div>

        {
          posts ?
            posts?.length > 0 ?
            posts.map((post) => <PostCard post={post} currentUser={currentUser} refreshContent={refreshPosts} />) :
            null :
          <p>No Posts to Display</p>
        }
      </div>
    </div>
  );
}

export default PostIndex;