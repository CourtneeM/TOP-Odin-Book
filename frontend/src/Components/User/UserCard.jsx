import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { editUser } from "../../api";

function UserCard({ user, currentUser, refreshUsers }) {
  const [editMode, setEditMode] = useState(false);
  const [aboutUser, setAboutUser] = useState(null);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);

  const params = useParams();

  useEffect(() => {
    setAboutUser(user.about);
  }, [user]);
  
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

  const handleSaveProfile = async () => {
    if (currentUser.id !== params.userId) return;

    const currentUserCopy = Object.assign({}, currentUser);
    currentUserCopy.about = aboutUser;
    currentUserCopy.profilePicture.selected = selectedProfilePicture

    await editUser(currentUserCopy);
    setEditMode(false);
  }

  const handleCancelEdit = () => {
    setAboutUser(user.about);
    setEditMode(false);
  }

  const handleChangeProfilePicture = async (target) => {
    const alternateProfilePictures = [...document.querySelectorAll('.alternate-profile-picture')];
    alternateProfilePictures.forEach((image) => {
      if (image.id === 'new-profile-picture') {
        image.removeAttribute('id');
        image.style.border = '2px solid #000';
      }
    });
    
    target.id = 'new-profile-picture';
    target.style.border = '2px solid #000';

    setSelectedProfilePicture(target.src);
  }

  return (
    <div className={`user-info-card-${user.id}`}>
      <section className="user-info-header">
        {
          user ?
          <>
            {
              editMode ?
              user.profilePicture.images.map((image) => {
                return currentUser.profilePicture.selected === image ?
                <img src={user.profilePicture.selected} alt="" id="selected-profile-image" style={{'width': '32px'}} /> :
                <img src={image} alt="" className="alternate-profile-picture" style={{'width': '32px'}} onClick={(e) => handleChangeProfilePicture(e.target)} />
              }) :
              <img src={user.profilePicture.selected} alt="" id="selected-profile-image" style={{'width': '32px'}} />
            }
            {
              params.userId === user.id ?
              <p>{user.firstName} {user.lastName}</p> :
              <Link to={`${user.id}`}>
                <p>{user.firstName} {user.lastName}</p>
              </Link>
            }
            {
              editMode ?
              <>
                <textarea value={aboutUser} onChange={(e) => setAboutUser(e.target.value)}></textarea>
              </> :
              <p>{aboutUser}</p>
            }
          </> :
          <p>Loading...</p>
        }
        {
          currentUser.id === params.userId && !editMode ?
          <button onClick={() => setEditMode(true)}>Edit Profile</button> :
          null
        }
        {
          currentUser.id === params.userId && editMode ?
          <>
            <button onClick={handleSaveProfile}>Save Profile</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </> :
          null
        }

      </section>

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
  );
}

export default UserCard;