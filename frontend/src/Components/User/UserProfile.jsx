import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUsers, getUserContent } from '../../api';

import Navbar from "../Navbar";
import UserCard from './UserCard';
import PostCard from '../Post/PostCard';
import CommentCard from '../Comment/CommentCard';

function UserProfile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [userComments, setUserComments] = useState(null);

  const params = useParams();

  useEffect(() => {
    refreshUsers();

    getUserContent(params.userId).then((res) => {
      console.log(res);
      setUserPosts(res.posts);
      setUserComments(res.comments);
    });
  }, [params.userId]);

  const refreshUsers = async () => {
    await getUsers().then(async (res) => {
      setCurrentUser(await res.filter((user) => user.firstName === 'Allison')[0]);
      setUser(await res.filter((user) => user.id === params.userId)[0]);
    });
  }

  return (
    <div>
      <Navbar />
      <div className="user-profile-container">
        {
          user ?
            <>
              <section className="profile-header-container">
                <h1>User Profile</h1>
                <UserCard user={user} currentUser={currentUser} refreshUsers={refreshUsers} />
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