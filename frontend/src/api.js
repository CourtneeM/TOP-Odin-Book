// USER

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

// export { }
export { getPosts }
export { getComments }