import axios from 'axios'
import { useState, useEffect } from 'react'

function AuthorCard(props) {

    let author = props.author

    const [postCount, setPostCount] = useState(0)

    useEffect(() => {
        const countPosts = async () => {
            const result = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts?author=${author.id}`)
            setPostCount(result.data.length)
        }
        countPosts()
    }, [])

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <img src={author.avatar_urls[96]} alt="Author Profile Image" className="rounded-full mx-auto" />
                <div className="mt-6 text-lg font-bold">{author.name}</div>
                <div className="text-gray-400 font-light text-sm">Posts: {postCount}</div>
            </div>
        </>
    )
}

export default AuthorCard