import { useState, useEffect } from 'react'

function CommentInput() {

    const [row, setRow] = useState(1)
    const [content, setContent] = useState("")

    const inputHandler = (event) => {
        let textarea = event.target
        let content = textarea.value
        setGrowing(textarea)
        setContent(content)
    }

    const setGrowing = (textarea) => {
        let rowNumber = textarea.value.substr(0, textarea.selectionStart).split('\n').length
        rowNumber = rowNumber > 8 ? 8 : rowNumber
        setRow(rowNumber)
    }

    return (
        <div className="my-8">
            <div className="bg-gray-700 shadow-lg rounded-lg px-6 py-6">
                <textarea id="comment-input" onInput={inputHandler} rows={row} placeholder="What is your comment ?" className="w-full focus:outline-none bg-transparent resize-none pt-2 mb-0"></textarea>
            </div>
            <div className="text-right mt-4">
                <button className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 duration-100 px-4 py-2 rounded-lg shadow-lg">Post Comment</button>
            </div>
        </div>
    )
}

export default CommentInput