import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API_URL } from "../../constants"

function PostEditForm() {
    const [ post, setPost ] = useState(null)
    const { id } = useParams()
    const [, setLoading] = useState(true)
    const [, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`)
                if (response.ok) {
                    const json = await response.json()
                    setPost(json)
                } else {
                    throw response
                }
            } catch (e) {
                console.log('An error occurred ...', e)
                setError(e)
            } finally {
                setLoading(false)
            }
        }
        fetchCurrentPost()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch (`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    title: post.title,
                    body: post.body,
                })
            });
            if (response.ok) {
                const json = await response.json()
                console.log('success:', json)
                navigate(`/posts/${id}`)
            } else {
                throw response
            }
        }  catch (e) {
            console.log('an error occurred', e)
        }
    }

    if (!post) return <h2>Loading ...</h2>

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="post-title">Title</label>
                    <br />
                    <input
                        type="text"
                        id="post-title"
                        value={post.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="post-body">Body</label>
                    <br />
                    <textarea
                        id="post-body"
                        value={post.body}
                        onChange={(e) => setPost({ ...post, body: e.target.value })}
                    />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default PostEditForm
