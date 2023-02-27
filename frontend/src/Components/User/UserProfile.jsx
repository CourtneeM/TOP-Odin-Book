import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, getUserContent } from '../../api';
import CommentCard from '../Comment/CommentCard';

import Navbar from "../Navbar";
import PostCard from '../Post/PostCard';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [userComments, setUserComments] = useState(null);

  const params = useParams();

  useEffect(() => {
    getUser(params.userId).then((res) => {
      setUser(res);
    });

    getUserContent(params.userId).then((res) => {
      setUserPosts(res.posts);
      setUserComments(res.comments);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="user-profile-container">
        {
          user ?
            <>
              <section className="profile-header-container">
                <h1>User Profile</h1>
                <img src={user.profilePicture} alt="" />
                <p>{user.firstName} {user.lastName}</p>
                <p>{user.about}</p>
              </section>
              <section className="user-posts-container">
                <h2>Posts</h2>
                {
                  userPosts && userPosts.length > 0 ?
                  userPosts.map((post) => <PostCard post={post} />) :
                  <p>No Posts</p>
                }
              </section>
              <section className="user-comments-container">
                <h2>Comments</h2>
                {
                  userComments && userComments.length > 0 ?
                  userComments.map((comment) => <CommentCard comment={comment} />) :
                  <p>No Comments</p>
                }
              </section>
            </> :
          <p>Loading...</p>
        }
      </div>

    </div>
  );
}

export default UserProfile;