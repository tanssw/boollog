import { useState, useEffect } from 'react'

function CommentInput() {

    const [row, setRow] = useState(1)
    const [content, setContent] = useState("")

    const inputHandler = event => {
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

    const postHandler = event => {
        console.log('click')
    }

    return (
        <div className="my-8">
            <div className="bg-gray-700 shadow-lg rounded-lg px-6 py-6">
                <textarea id="comment-input" onInput={inputHandler} rows={row} placeholder="What is your comment ?" className="w-full focus:outline-none bg-transparent resize-none pt-2 mb-0 font-light"></textarea>
            </div>
            <div className="text-right mt-4">
                <input type="text" placeholder="Your display name" className="mr-4 rounded-lg px-4 py-3 w-72 bg-gray-700 focus:outline-none shadow-lg font-light" />
                <button onClick={postHandler} disabled={!content} className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-slate-400 disabled:opacity-75 disabled:cursor-not-allowed duration-100 px-4 py-3 rounded-lg shadow-lg">
                    Comment
                </button>
            </div>
        </div>
    )
}

export default CommentInput