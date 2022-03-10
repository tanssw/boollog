import axios from 'axios'
import { useState, useEffect } from 'react'
import AuthorCard from './components/AuthorCard'

function Authors() {

    const [authors, setAuthors] = useState([])

    useEffect(() => {
        const getAuthors = async () => {
            const result = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/users`)
            setAuthors(result.data)
        }
        getAuthors()
    }, [])

    if (!authors.length) return <></>

    return (
        <div className="container mx-auto px-56 py-12">
            <div className="grid grid-cols-3 gap-8">
                {authors.map(author => <AuthorCard author={author} />)}
            </div>
        </div>
    )
}

export default Authors