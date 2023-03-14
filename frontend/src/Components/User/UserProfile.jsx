import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUsers, getUserContent } from '../../api';

import Navbar from "../Navbar";
import UserCard from './UserCard';
import PostCard from '../Post/PostCard';
import CommentCard from '../Comment/CommentCard';

function UserProfile({ currentUser, setCurrentUser, setAuthenticated }) {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [userComments, setUserComments] = useState(null);

  const params = useParams();

  useEffect(() => {
    refreshUsers();
    refreshContent();
  }, [params.userId]);

  const refreshUsers = async () => {
    await getUsers().then(async (res) => {
      setUser(await res.filter((user) => user.id === params.userId)[0]);
    });
  }

  const refreshContent = () => {
    getUserContent(params.userId).then((res) => {
      setUserPosts(res.posts);
      setUserComments(res.comments);
    });
  }

  return (
    <div>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} setAuthenticated={setAuthenticated} />
      {
        currentUser ?
        <div className="user-profile-container">
          {
            user ?
              <>
                <section className="profile-header-container">
                  <UserCard user={user} currentUser={currentUser} refreshUsers={refreshUsers} />
                </section>
                <section className="user-posts-container">
                  <h2>Posts</h2>
                  {
                    userPosts && userPosts.length > 0 ?
                    userPosts.map((post) => <PostCard post={post} currentUser={currentUser} refreshContent={refreshContent} />) :
                    <p className="no-content-message">No Posts</p>
                  }
                </section>
                <section className="user-comments-container">
                  <h2>Comments</h2>
                  {
                    userComments && userComments.length > 0 ?
                    userComments.map((comment) => <CommentCard comment={comment} currentUser={currentUser} refreshContent={refreshContent} />) :
                    <p className="no-content-message">No Comments</p>
                  }
                </section>
              </> :
            <p>Loading...</p>
          }
        </div> :
        <p>Not authorized to view this page.</p>
      }
    </div>
  );
}

export default UserProfile;