import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CommentPanel from './components/CommentPanel'
import PostAuthor from './components/PostAuthor'

function Post() {

    const [post, setPost] = useState({})

    let { id } = useParams()

    useEffect(() => {
        const getContent = async () => {
            const result = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts/?include=${id}`)
            setPost(result.data[0])
        }
        getContent()
    }, [])

    // If post is not loaded correctly
    if (!Object.keys(post).length) return (
        <div></div>
    )

    return (
        <>
            <div className="container mx-auto px-56 py-12">
                <div>
                    <div className="mb-12">
                        <div className="text-5xl font-bold mb-12">{post.title.rendered}</div>
                        <PostAuthor aid={post.author} date={post.date} />
                    </div>
                    <div dangerouslySetInnerHTML={{__html: post.content.rendered}} className="prose dark:prose-invert prose-img:rounded-lg max-w-none"></div>
                </div>
            </div>
            <div className="dark:bg-gray-800">
                <div className="container mx-auto px-56 py-12">
                    <CommentPanel />
                </div>
            </div>
        </>
    )
}

export default Post