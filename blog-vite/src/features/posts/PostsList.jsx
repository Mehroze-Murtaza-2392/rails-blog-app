import React, { useState, useEffect } from 'react'
import { API_URL } from "../../constants"

function PostsList () {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  // fetch posts from API
  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const json = await response.json();
          setPosts(json);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (e) {
        setError("An error occurred while fetching posts!");
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className='post-container'>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
  
}

export default PostsList;