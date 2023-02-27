import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsers, editUser } from "../../api";

function UserIndex() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    refreshUsers();
  }, [currentUser, users]);

  const refreshUsers = async () => {
    await getUsers().then((res) => {
      setCurrentUser(res.filter(async (user) => await user.firstName === 'Allison')[0]);
      setUsers(res);
    });
  }

  const sendFriendRequest = async (user) => {
    console.log('Send Friend Request');

    const currentUserCopy = Object.assign({}, currentUser);
    const selectedUserCopy = Object.assign({}, user);
    
    currentUserCopy.friendRequests.sent.push(selectedUserCopy.id);
    selectedUserCopy.friendRequests.received.push(currentUserCopy.id);

    await editUser(currentUserCopy);
    await editUser(selectedUserCopy);
    await refreshUsers();
  }
  const acceptFriendRequest = async (user) => {
    console.log('Accept Friend Request');
    
    const currentUserCopy = Object.assign({}, currentUser);
    const selectedUserCopy = Object.assign({}, user);

    currentUserCopy.friends.push(user.id);
    selectedUserCopy.friends.push(currentUserCopy.id);
    
    currentUserCopy.friendRequests.received.splice(currentUserCopy.friendRequests.received.indexOf(selectedUserCopy.id), 1);
    selectedUserCopy.friendRequests.sent.splice(selectedUserCopy.friendRequests.sent.indexOf(currentUserCopy.id), 1);

    await editUser(currentUserCopy);
    await editUser(selectedUserCopy);
    await refreshUsers();
  }
  const cancelFriendRequest = async (user) => {
    console.log('Cancel Friend Request');

    const currentUserCopy = Object.assign({}, currentUser);
    const selectedUserCopy = Object.assign({}, user);
    
    currentUserCopy.friendRequests.sent.splice(currentUserCopy.friendRequests.sent.indexOf(selectedUserCopy.id), 1);
    selectedUserCopy.friendRequests.received.splice(selectedUserCopy.friendRequests.received.indexOf(currentUserCopy.id), 1);

    await editUser(currentUserCopy);
    await editUser(selectedUserCopy);
    await refreshUsers();
  }
  const declineFriendRequest = async (user) => {
    console.log('Decline Friend Request');

    const currentUserCopy = Object.assign({}, currentUser);
    const selectedUserCopy = Object.assign({}, user);
    
    currentUserCopy.friendRequests.received.splice(currentUserCopy.friendRequests.received.indexOf(selectedUserCopy.id), 1);
    selectedUserCopy.friendRequests.sent.splice(selectedUserCopy.friendRequests.sent.indexOf(currentUserCopy.id), 1);

    await editUser(currentUserCopy);
    await editUser(selectedUserCopy);
    await refreshUsers();
  }

  const removeFriend = async (user) => {
    console.log('Remove Friend');

    const currentUserCopy = Object.assign({}, currentUser);
    const selectedUserCopy = Object.assign({}, user);

    currentUserCopy.friends.splice(currentUserCopy.friends.indexOf(selectedUserCopy.id), 1);
    selectedUserCopy.friends.splice(selectedUserCopy.friends.indexOf(currentUserCopy.id), 1);

    await editUser(currentUserCopy);
    await editUser(selectedUserCopy);
    await refreshUsers();
  }

  return (
    <div>
      <h1>User Index</h1>

      {
        users && users.length > 0 ?
        users.map((user) => {
          return (
            <div>
              <Link to={`${user.id}`}>
                <img src={user.profilePicture} alt="" />
                <p>{user.firstName} {user.lastName}</p>
              </Link>

              {
                currentUser.id !== user.id ?
                  !currentUser.friends.includes(user.id) ?
                    currentUser.friendRequests.sent.includes(user.id) ?
                    <button onClick={() => cancelFriendRequest(user)}>Cancel Friend Request</button> :

                    currentUser.friendRequests.received.includes(user.id) ?
                    <>
                      <button onClick={() => acceptFriendRequest(user)}>Accept Friend Request</button>
                      <button onClick={() => declineFriendRequest(user)}>Decline Friend Request</button>
                    </> :

                    <button onClick={() => sendFriendRequest(user)}>Send Friend Request</button> :
                  <button onClick={() => removeFriend(user)}>Remove Friend</button> :
                null
              }
            </div>
          )
        }) :
        null
      }
    </div>
  );
}

export default UserIndex;