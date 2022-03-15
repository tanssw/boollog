import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import PostHighlight from '../posts/components/PostHighlight'

import ErrorMessage from '../../components/ErrorMessage'
import LoadSpinner from '../../components/LoadSpinner'

function Author() {

    let { id } = useParams()

    let [author, setAuthor] = useState({})
    let [posts, setPosts] = useState([])

    useEffect(() => {
        const getAuthor = async () => {
            const result = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/users?include=${id}`)
            setAuthor(result.data[0])
        }
        const getPosts = async () => {
            const result = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts?author=${id}`)
            setPosts(result.data)
        }
        getAuthor()
        getPosts()
    }, [])

    if (!Object.keys(author).length) return <LoadSpinner />

    return (
        <div className="container mx-auto px-8 2xl:px-56 py-12">
            <div>
                <div className="flex items-center">
                    <img src={author.avatar_urls['96']} alt="Author's Profile Image" className="rounded-full w-16 h-16 mr-6" />
                    <div>
                        <div className="font-bold text-xl dark:text-blue-300">
                            {author.name}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-12 border-gray-700" />
            <div>
                <div className="text-2xl font-bold mb-6">Created Posts</div>
                <div className="grid grid-cols-3 gap-8">
                    {posts.map(post => <PostHighlight key={post.id} post={post} />)}
                </div>
            </div>
        </div>
    )
}

export default Author