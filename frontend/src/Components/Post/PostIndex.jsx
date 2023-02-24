import { useState, useEffect } from 'react';
import { getPosts } from '../../api';

import Navbar from '../Navbar';
import PostCard from './PostCard';

function PostIndex() {
  const [posts, setPosts] = useState(null);
  
  useEffect(() => {
    getPosts().then((res) => {
      setPosts(res);
    });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="post-index-container">
        <h1>Post Index</h1>

        {
          posts?.length > 0 ?
          posts.map((post) => <PostCard post={post} />) :
          null
        }
      </div>
    </div>
  );
}

export default PostIndex;