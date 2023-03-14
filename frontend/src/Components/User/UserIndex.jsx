import { useState, useEffect } from "react";
import { getUsers } from "../../api";

import Navbar from "../Navbar";
import UserCard from '../User/UserCard';

function UserIndex({ currentUser, setCurrentUser, setAuthenticated }) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = async () => {
    await getUsers().then((res) => {
      setUsers(res);
    });
  }

  return (
    <div>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} setAuthenticated={setAuthenticated} />

      <div className="user-index-container">
        {
          currentUser ?
          <>
            <h1>User Index</h1>

            {
              users && users.length > 0 ?
              users.map((user) => {
                return <UserCard user={user} currentUser={currentUser} refreshUsers={refreshUsers} />
              }) :
              null
            }
          </> :
          <p>Not authorized to view this page.</p>
        }
      </div>
    </div>
  );
}

export default UserIndex;