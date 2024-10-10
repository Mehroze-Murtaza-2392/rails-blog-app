import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants";

function PostDetails() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [, setError] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`)
                if (response.ok) {
                    const json = await response.json()
                    setPost(json)
                    setLoading(false)
                } else {
                    throw response
                }
            } catch (e) {
                console.log("something went wrong", e)
            }
        }
        fetchCurrentPost()
    }, [id])

    if (load) return <h2>Loading ...</h2>

    return (
        <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to='/'>Back to Posts</Link>
        </>
    )
}


export default PostDetails
