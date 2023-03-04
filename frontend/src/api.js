const logIn = async (email, password) => {
  await fetch('http://localhost:8080/api/log-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      username: email,
      password: password
    })
  }).then((res) => {
    return res.json();
  }).then((data) => {
    console.log('Success: ', data);
  }).catch((err) => {
    console.log('Error: ', err);
  })
}

const logOut = async () => {
  await fetch('http://localhost:8080/api/log-out', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
  }).then((res) => {
    return res.json;
  }).then((data) => {
    console.log('Success: ', data);
  }).catch((err) => {
    console.log('Error: ', err);
  });
}

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

  return data;
}

const createUser = async (user) => {
  await fetch('http://localhost:8080/api/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
      confirm_password: user.confirmPassword
    })
  }).then((res) => {
    return res.json();
  }).then((data) => {
    console.log('Success: ', data);
  }).catch((err) => {
    console.log('Error: ', err);
  });
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
      about: user.about,
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

const getPost = async (postId) => {
  const response = await fetch(`http://localhost:8080/api/posts/${postId}`);
  const data = await response.json();

  return data;
}

const createPost = async (post) => {
  await fetch('http://localhost:8080/api/posts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      message: post.message,
      author: post.author
    })
  }).then((res) => {
    return res.json();
  }).then((data) => {
    console.log('Success: ', data);
  }).catch((err) => {
    console.log('Error: ', err);
  });
}

const editPost = async (post) => {
  await fetch(`http://localhost:8080/api/posts/${post._id}/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      message: post.message,
      author: post.author._id,
      timestamp: post.timestamp,
      likes: post.likes,
      _id: post._id      
    })
  }).then((res) => {
    return res.json();
  }).then((data) => {
     console.log('Success: ', data);
  }).catch((err) => {
    console.log('Error: ', err);
  });
}

const deletePost = async (postId) => {
  await fetch(`http://localhost:8080/api/posts/${postId}/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      postId: postId
    })
  }).then((res) => {
    return res.json();
  }).then((data) => {
    console.log('Success: ', data);
  }).catch((err) => {
    console.log('Error: ', err);
  });
}

// COMMENT
const getComments = async (postId) => {
  const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments`);
  const data = response.json();

  return data;
}

const getComment = async (comment) => {
  const response = await fetch(`http://localhost:8080/api/posts/${comment.post_id}/comments/${comment._id}`);
  const data = await response.json();

  return data;
}

const createComment = async (comment) => {
  await fetch(`http://localhost:8080/api/posts/${comment.post_id}/comments/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      message: comment.message,
      author: comment.author,
      post_id: comment.post_id
    })
  }).then((res) => {
    return res.json();
  }).then((data) => {
    console.log('Success: ', data);
  }).catch((err) => {
    console.log('Error: ', err);
  });
}

const editComment = async (comment) => {
  await fetch(`http://localhost:8080/api/posts/${comment.post_id}/comments/${comment._id}/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      message: comment.message,
      author: comment.author._id,
      timestamp: comment.timestamp,
      likes: comment.likes,
      _id: comment._id,
      post_id: comment.post_id  
    })
  }).then((res) => {
    return res.json();
  }).then((data) => {
     console.log('Success: ', data);
  }).catch((err) => {
    console.log('Error: ', err);
  });
}

const deleteComment = async (postId, commentId) => {
  await fetch(`http://localhost:8080/api/posts/${postId}/comments/${commentId}/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      commentId: commentId
    })
  }).then((res) => {
    return res.json();
  }).then((data) => {
    console.log('Success:' , data);
  }).catch((err) => {
    console.log('Error: ', err);
  });
}

export { logIn, logOut }
export { getUsers, getUser, getUserContent, createUser, editUser }
export { getPosts, getPost, createPost, editPost, deletePost }
export { getComments, getComment, createComment, editComment, deleteComment }