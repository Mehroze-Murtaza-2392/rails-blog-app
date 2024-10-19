import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deletePost as deletePostService, fetchPost } from "../../services/postService";

function PostDetails() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [, setError] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const data = await fetchPost(id)
                setPost(data)
                setLoading(false)
            } catch (e) {
                console.log("something went wrong", e)
            }
        }
        fetchCurrentPost()
    }, [id])

    const deletePost = async () => {
        try {
            await deletePostService(id)
            navigate('/')
        } catch (e) {
            console.error('Failed to delete post: ', e)
        }
    }

    if (loading) return <h2>Loading ...</h2> // if (!post) return <h2>Loading...</h2>

    return (
        <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {' | '}
            <Link to='/'>Back to Posts</Link>
            {' | '}
            <button onClick={deletePost}>Delete</button>
        </>
    )
}


export default PostDetails
