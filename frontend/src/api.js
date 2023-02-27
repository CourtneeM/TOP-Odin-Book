// USER
const getUsers = async () => {
  const response = await fetch('http://localhost:8080/api/users');
  const data = await response.json();

  const users = data.map((user) => {
    return {
      id: user._id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      friends: user.friends,
      friendRequests: user.friend_requests,
      profilePicture: user.profile_picture,
      about: user.about,
    }
  });
  
  return users;
}

const getUser = async (userId) => {
  const response = await fetch(`http://localhost:8080/api/users/${userId}`);
  const data = await response.json();

  const userInfo = {
    id: data._id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    friends: data.friends,
    friendRequests: data.friend_requests,
    profilePicture: data.profile_picture,
    about: data.about,
  }

  return userInfo;
}

const getUserContent = async (userId) => {
  const response = await fetch(`http://localhost:8080/api/users/${userId}/content`);
  const data = await response.json();

  console.log(data);
  return data;
}

const editUser = async (user) => {
  await fetch(`http://localhost:8080/api/users/${user.id}/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      friends: user.friends,
      friend_requests: user.friendRequests,
      profile_picture: user.profilePicture,
    })
  }).then((res) => {
    return res.json();
  }).then((data) => {
    console.log('Success: ', data);
  }).catch((err) => {
    console.log('Error: ', err);
  });
}

// POST
const getPosts = async () => {
  const response = await fetch('http://localhost:8080/api/posts');
  const data = response.json();
  
  return data;
}

// COMMENT
const getComments = async (postId) => {
  const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments`);
  const data = response.json();

  return data;
}

export { getUsers, getUser, getUserContent, editUser }
export { getPosts }
export { getComments }