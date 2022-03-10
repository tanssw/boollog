import { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from './components/PostCard'

function Posts() {
    
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // Get the posts
        const getPosts = async () => {
            const result = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
            setPosts(result.data)
        }
        getPosts()
    }, [])

    const PostList = () => {
        if (!posts.length) return <></>
        return (
            <div className="grid grid-cols-3 gap-12">
                {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
        )
    }
    
    return (
        <div className="container mx-auto px-56 py-12">
            <PostList />
        </div>
    )
}

export default Posts