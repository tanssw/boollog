import axios from 'axios'
import { useState, useEffect } from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import LoadSpinner from '../../components/LoadSpinner'
import AuthorCard from './components/AuthorCard'

function Authors() {

    const [authors, setAuthors] = useState([])

    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getAuthors = async () => {
            try {
                const result = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/users`)
                setAuthors(result.data)
            } catch (error) {
                setIsError(true)
            }
        }
        getAuthors()
    }, [])

    // On erorr occured, show error message
    if (isError) return <ErrorMessage />

    // On loading, show load spinner
    if (!authors.length) return <LoadSpinner />

    return (
        <div className="container mx-auto px-8 2xl:px-56 py-12">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {authors.map(author => <AuthorCard key={author.id} author={author} />)}
            </div>
        </div>
    )
}

export default Authors