import { useEffect, useState } from 'react'
import axios from 'axios'
import PostHighlight from './components/PostHighlight'
import PostCard from './components/PostCard'

const getCategories = async () => {
    await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/categories`)
}

function Posts() {
    
    const [highlights, setHighlights] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {

        let categories = []

        const getCategories = async () => {
            const result = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/categories`)
            categories = result.data
        }

        const getPosts = async () => {
            const result = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
            let postResult = result.data

            // Mapping from category id to its object
            postResult = postResult.map(post => {
                post.categories = post.categories.map(cid => categories.find(category => category.id === cid))
                return post
            })

            setHighlights(postResult.slice(0, 4))
            setPosts(postResult.slice(5))
        }

        const initPosts = async () => {
            await getCategories()
            await getPosts()
        }

        initPosts()

    }, [])

    if (!posts.length) return <></>
    
    return (
        <div className="container mx-auto px-56 py-12">
            <div className="grid grid-cols-2 gap-12">
                {highlights.map(highlight => <PostHighlight key={highlight.id} post={highlight} />)}
            </div>
            <hr className="my-16 border-gray-600" />
            <div>
                {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
        </div>
    )
}

export default Posts