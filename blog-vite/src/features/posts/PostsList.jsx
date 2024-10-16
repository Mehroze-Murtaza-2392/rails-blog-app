import React, { useState, useEffect } from 'react'
import { API_URL } from "../../constants"
import { Link } from 'react-router-dom';

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

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id))
      } else {
        throw response
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className='post-container'>
          <h2>
            <Link to={`/posts/${post.id}`} className='post-title'>
              {post.title}
            </Link>
          </h2>
          <div className='post-links'>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {' | '}
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default PostsList;