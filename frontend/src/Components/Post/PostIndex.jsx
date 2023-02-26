import { useState, useEffect } from 'react';
import { getPosts } from '../../api';

import Navbar from '../Navbar';
import PostCard from './PostCard';

function PostIndex() {
  const currentUser = {
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    friends: [''],
    friendRequests: {sent: [], received: []}
  }

  const [posts, setPosts] = useState(null);
  
  useEffect(() => {
    getPosts().then((res) => {
      // const ownPosts = res.filter((post) => post.author._id === currentUser.id);
      const filteredPosts = res.filter((post) => {
        if (post.author._id === currentUser.id) return true;

        return currentUser.friends.filter((friendId) => {
          return post.author._id.includes(friendId);
        })[0];
      });

      setPosts(filteredPosts);
    });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="post-index-container">
        <h1>Post Index</h1>

        {
          posts ?
            posts?.length > 0 ?
            posts.map((post) => <PostCard post={post} />) :
            null :
          <p>No Posts to Display</p>
        }
      </div>
    </div>
  );
}

export default PostIndex;