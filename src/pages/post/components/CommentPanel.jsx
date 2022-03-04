import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Comment from './Comment'
import CommentInput from './CommentInput'

function CommentPanel() {

    const [comments, setComments] = useState([])

    let { id } = useParams()

    useEffect(() => {
        const getComments = async () => {
            const result = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/comments/?post=${id}`)
            setComments(result.data)
        }
        getComments()
    }, [])

    return (
        <>
            <div className="text-2xl mb-4">Comments</div>
            <CommentInput />
            {comments.map(comment => <Comment comment={comment} />)}
        </>
    )
}

export default CommentPanel