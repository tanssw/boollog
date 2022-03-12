import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PostHighlight(props) {

    const post = props.post

    const [media, setMedia] = useState({})

    useEffect(() => {
        const getMedia = async () => {
            if (!post.featured_media) return
            const result = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/media/${post.featured_media}`)
            setMedia(result.data)
        }
        getMedia()
    }, [])
    
    const PostImage = () => {
        return (
            <div className="relative h-56 bg-gray-800 rounded-t-lg overflow-hidden">
                <img src={media.source_url} className="absolute w-full inset-0 my-auto" />
            </div>
        )
    }

    return (
        <Link to={`/post/${post.id}`} className="bg-gray-700 shadow-xl rounded-lg flex flex-col hover:scale-105 duration-150">
            <PostImage />
            <div className="flex justify-between m-4">
                <div className="truncate">{post.title.rendered}</div>
            </div>
        </Link>
    )
}

export default PostHighlight