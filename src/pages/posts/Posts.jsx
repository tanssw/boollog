import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'

import PostHighlight from './components/PostHighlight'
import PostCard from './components/PostCard'
import CategoryButton from './components/CategoryButton'

import LoadSpinner from '../../components/LoadSpinner'
import ErrorMessage from '../../components/ErrorMessage'

function Posts() {

    const location = useLocation()
    const [params] = useSearchParams()
    
    const [highlights, setHighlights] = useState([])
    const [posts, setPosts] = useState([])

    const [categories, setCategories] = useState([])
    const [activeCategory, setActiveCategory] = useState(null)

    const [isError, setIsError] = useState(false)

    useEffect(() => {

        let tempCategories = []

        const getCategories = async () => {
            try {
                const result = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/categories`)
                tempCategories = result.data.map(category => {
                    category.active = false
                    return category
                })
                setCategories(tempCategories)
            } catch (error) {
                throw error
            }
        }

        const getPosts = async () => {
            try {
                const result = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
                let postResult = result.data
    
                // Mapping from category id to its object
                postResult = postResult.map(post => {
                    post.categories = post.categories.map(cid => tempCategories.find(category => category.id === cid))
                    return post
                })
    
                setHighlights(postResult.slice(0, 4))
                setPosts(postResult.slice(5))
            } catch (error) {
                throw error
            }
        }

        // Set active category from query params
        const setActiveCategoryByQuery = () => {
            try {
                let queryCategory = params.get('category')
                if (!queryCategory) return setActiveCategory(null)
                let queryCategoryObject = tempCategories.find(category => category.slug === queryCategory)
                queryCategoryObject.active = true
                setActiveCategory(queryCategoryObject)
            } catch (error) {
                throw error
            }
        }

        const initPosts = async () => {
            try {
                await getCategories()
                await getPosts()
                setActiveCategoryByQuery()
            } catch (error) {
                setIsError(true)
            }
        }

        initPosts()

    }, [location])

    const selectHandler = (selectedCategory) => {
        categories.forEach(category => {
            category.active = false
            if (!selectedCategory) return
            if (category.id === selectedCategory.id) category.active = true
        })
        setActiveCategory(selectedCategory)
        setCategories([...categories])
    }

    const renderFilteredPosts = posts.map(post => {
        let matchedCategory = activeCategory ? !!post.categories.find(category => category.id === activeCategory.id) : true
        if (matchedCategory) return <PostCard key={post.id} post={post} />
    })

    // On erorr occured, show error message
    if (isError) return <ErrorMessage />

    // On loading, show load spinner
    if (!categories.length && !posts.length) return <LoadSpinner />
    
    return (
        <div className="container mx-auto px-8 2xl:px-56 py-12">
            <div className="text-3xl text-center uppercase font-bold mb-12">Latest Posts</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {highlights.map(highlight => <PostHighlight key={highlight.id} post={highlight} />)}
            </div>
            <hr className="my-12 border-gray-600" />
            <div className="flex flex-nowrap overflow-x-scroll no-scrollbar -mx-2">
                <Link onClick={() => {selectHandler(null)}} to="/posts" className={`${activeCategory ? 'bg-gray-800' : 'bg-gray-600'} text-sm font-light px-6 py-2 rounded-full mx-2`}>All</Link>
                <div className="bg-gray-700 w-0.5 lg:mx-4"></div>
                {categories.map(category => <CategoryButton key={category.id} category={category} onSelect={selectHandler} />)}
            </div>
            <div>
                {renderFilteredPosts}
            </div>
        </div>
    )
}

export default Posts