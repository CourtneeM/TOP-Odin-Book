import { useState, useEffect } from 'react';
import { getUser, getPosts } from '../../api';

import Navbar from '../Navbar';
import PostCard from './PostCard';

function PostIndex() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState(null);
  
  useEffect(() => {
    getUser('63f68657c466418bff0c2d9d').then((res) => {
      setCurrentUser(res);
    });
  }, [])

  useEffect(() => {
    refreshPosts();
  }, [currentUser]);

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
      <Navbar />

      <div className="post-index-container">
        <h1>Post Index</h1>

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