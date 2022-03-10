import axios from 'axios'
import { useState, useEffect } from 'react'

function CommentInput(props) {

    let pid = props.pid
    let onComment = props.onComment

    const [row, setRow] = useState(1)
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState()
    const [warning, setWarning] = useState("")

    const commentHandler = event => {
        let textarea = event.target
        let content = textarea.value
        setGrowing(textarea)
        setContent(content)
    }

    const setGrowing = textarea => {
        let rowNumber = textarea.value.substr(0, textarea.selectionStart).split('\n').length
        rowNumber = rowNumber > 8 ? 8 : rowNumber
        setRow(rowNumber)
    }

    const authorHandler = event => {
        let authorName = event.target.value
        setAuthor(authorName)
    }

    const submitHandler = async () => {

        const config = {
            headers: {
                Authorization: 'Basic ZnN3ZDpmc3dkLWNtcw=='
            }
        }

        let body = {
            author_name: author,
            content: content,
            post: pid
        }

        try {
            const result = await axios.post(`https://fswd-wp.devnss.com/wp-json/wp/v2/comments`, body, config)
            const comment = result.data
            setContent("")
            onComment(comment)
        } catch (error) {
            setWarning(error.response.data.message)
        }
    }

    return (
        <div className="my-8">
            <div className="bg-gray-700 shadow-lg rounded-lg px-6 py-6">
                <textarea id="comment-input" onInput={commentHandler} value={content} rows={row} placeholder="What is your comment ?" className="w-full focus:outline-none bg-transparent resize-none pt-2 mb-0 font-light"></textarea>
            </div>
            <div className="grid grid-cols-2 mt-4">
                <div className="text-red-500 font-light">
                    {warning}
                </div>
                <div className="text-right">
                    <input type="text" onInput={authorHandler} placeholder="Your display name" className="mr-4 rounded-lg px-4 py-3 w-72 bg-gray-700 focus:outline-none shadow-lg font-light" />
                    <button onClick={submitHandler} disabled={!content} className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-slate-400 disabled:opacity-75 disabled:cursor-not-allowed duration-100 px-4 py-3 rounded-lg shadow-lg">
                        Comment
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CommentInput