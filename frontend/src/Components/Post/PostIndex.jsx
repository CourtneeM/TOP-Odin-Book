import { useState, useEffect } from 'react';
import { getPosts, createPost } from '../../api';

import Navbar from '../Navbar';
import PostCard from './PostCard';

function PostIndex({ currentUser, setCurrentUser, setAuthenticated }) {
  const [posts, setPosts] = useState(null);
  const [newPostMode, setNewPostMode] = useState(false);
  const [newPostMessage, setNewPostMessage] = useState('');

  useEffect(() => {
    refreshPosts();
  }, [currentUser]);


  const handleSubmitPost = async () => {
    if (newPostMessage === '') return;

    const newPost = {
      message: newPostMessage,
      author: currentUser.id,
    }

    await createPost(newPost);

    setNewPostMessage('');
    setNewPostMode(false);
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

  return (
    <div>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} setAuthenticated={setAuthenticated} />

      <div className="post-index-container">
        <header>
          <h1>Your Feed</h1>
          <button id={`add-post-btn`} onClick={() => setNewPostMode(true)}>Add Post</button>
        </header>

        {
          newPostMode ?
          <div className="new-post-container">
            <textarea placeholder="Share your thoughts..." value={newPostMessage} onChange={(e) => setNewPostMessage(e.target.value)}></textarea>
            <div className="new-post-actions">
              <button onClick={handleSubmitPost}>Submit</button>
              <button onClick={() => setNewPostMode(false)}>Cancel</button>
            </div>
          </div> :
          null
        }

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