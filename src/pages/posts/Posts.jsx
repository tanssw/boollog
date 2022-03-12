import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import PostHighlight from './components/PostHighlight'
import PostCard from './components/PostCard'
import CategoryButton from './components/CategoryButton'

function Posts() {

    const [params] = useSearchParams()
    
    const [highlights, setHighlights] = useState([])
    const [posts, setPosts] = useState([])

    const [categories, setCategories] = useState([])
    const [activeCategory, setActiveCategory] = useState(null)

    useEffect(() => {

        let tempCategories = []

        const getCategories = async () => {
            const result = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/categories`)
            tempCategories = result.data.map(category => {
                category.active = false
                return category
            })
            setCategories(tempCategories)
        }

        const getPosts = async () => {
            const result = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
            let postResult = result.data

            // Mapping from category id to its object
            postResult = postResult.map(post => {
                post.categories = post.categories.map(cid => tempCategories.find(category => category.id === cid))
                return post
            })

            setHighlights(postResult.slice(0, 4))
            setPosts(postResult.slice(5))
        }

        const initPosts = async () => {
            
            await getCategories()
            await getPosts()
            
            // Set active category from query params
            let queryCategory = params.get('category')
            let queryCategoryObject = tempCategories.find(category => category.slug === queryCategory)
            queryCategoryObject.active = true
            setActiveCategory(queryCategoryObject)

        }

        initPosts()

    }, [])

    const selectHandler = (selectedCategory) => {
        categories.forEach(category => {
            category.active = false
            if (!selectedCategory) return
            if (category.id === selectedCategory.id) category.active = true
        })
        setActiveCategory(selectedCategory)
        setCategories([...categories])
    }

    if (!categories.length && !posts.length) return <></>
    
    return (
        <div className="container mx-auto px-56 py-12">
            <div className="grid grid-cols-2 gap-12">
                {highlights.map(highlight => <PostHighlight key={highlight.id} post={highlight} />)}
            </div>
            <hr className="my-12 border-gray-600" />
            <div className="flex flex-nowrap overflow-x-scroll -mx-2">
                <Link onClick={() => {selectHandler(null)}} to="/posts" className={`${activeCategory ? 'bg-gray-800' : 'bg-gray-600'} text-sm font-light px-6 py-2 rounded-full mx-2`}>All</Link>
                <div className="bg-gray-700 w-0.5 mx-4"></div>
                {categories.map(category => <CategoryButton key={category.id} category={category} onSelect={selectHandler} />)}
            </div>
            <div>
                {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
        </div>
    )
}

export default Posts