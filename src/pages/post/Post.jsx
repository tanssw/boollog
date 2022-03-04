import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './post.css'

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
        <div className="container mx-auto px-8 py-12">
            <div className="text-5xl font-bold">
                {post.title.rendered}
            </div>
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-3">
                    <div id="post-content" dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                </div>
                <div className="col-span-2"></div>
            </div>
        </div>
    )
}

export default Post