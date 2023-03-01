import { useState, useEffect } from "react";
import { getUsers } from "../../api";

import UserCard from '../User/UserCard';

function UserIndex() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = async () => {
    await getUsers().then((res) => {
      setCurrentUser(res.filter(async (user) => await user.firstName === 'Allison')[0]);
      setUsers(res);
    });
  }

  return (
    <div>
      <h1>User Index</h1>

      {
        users && users.length > 0 ?
        users.map((user) => {
          return <UserCard user={user} currentUser={currentUser} refreshUsers={refreshUsers} />
        }) :
        null
      }
    </div>
  );
}

export default UserIndex;