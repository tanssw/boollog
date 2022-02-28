import { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from './components/PostCard'

// Get the posts
const getPosts = async () => {
    const result = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
    return result.data
}

function Posts() {
    
    const [posts, setPosts] = useState([])

    useEffect(async () => {
        setPosts(await getPosts())
    })

    const PostList = () => {
        if (!posts.length) return <></>
        return (
            <div className="grid grid-cols-3 gap-12">
                {posts.map(post => <PostCard post={post} />)}
            </div>
        )
    }
    
    return (
        <div className="container mx-auto px-8 py-12">
            <PostList />
        </div>
    )
}

export default Posts