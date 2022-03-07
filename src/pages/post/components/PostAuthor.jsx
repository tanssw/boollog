import axios from 'axios'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

function PostAuthor(props) {

    let aid = props.aid
    let date = props.date

    const [author, setAuthor] = useState({})

    useEffect(() => {
        const getAuthor = async () => {
            if (!aid) return
            const result = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/users/${aid}`)
            setAuthor(result.data)
        }
        getAuthor()
    }, [])

    const AuthorName = () => {
        if (author.name) return <a href={author.link} target="_blank" className="hover:underline">{author.name}</a>
        return 'Anonymous'
    }

    console.log(author)

    // If post is not loaded correctly
    if (!Object.keys(author).length) return (
        <div></div>
    )

    return (
        <div className="flex items-center">
            <img src={author.avatar_urls['96']} alt="Author's Profile Image" className="rounded-full w-16 h-16 mr-6" />
            <div>
                <div className="font-bold text-xl dark:text-blue-300 mb-1">
                    <AuthorName />
                </div>
                <div className="dark:text-gray-400 font-light">
                    {dayjs(date).format('DD MMMM YYYY — hh:mm')}
                </div>
            </div>
        </div>
    )
}

export default PostAuthor