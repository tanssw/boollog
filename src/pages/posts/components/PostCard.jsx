import axios from 'axios'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PostCard(props) {

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
            <div className="relative h-64 lg:h-48 bg-gray-800 rounded-lg overflow-hidden">
                <img src={media.source_url} className="absolute w-full inset-0 my-auto" />
            </div>
        )
    }

    const categories = post.categories.map(category => category.name).join(', ')

    return (
        <Link to={`/post/${post.id}`} className="group grid lg:grid-cols-9 gap-6 lg:gap-12 my-12">
            <div className="lg:col-span-3">
                <PostImage />
            </div>
            <div className="lg:col-span-6">
                <div className="group-hover:underline underline-offset-2 text-2xl font-light mb-3">{post.title.rendered}</div>
                <div className="text-gray-400 font-light">
                    <div className="mb-1">Category: {categories}</div>
                    <div>{dayjs(post.date).format('DD MMM YYYY — hh:mm')}</div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard