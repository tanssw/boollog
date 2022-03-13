import { FaExclamationTriangle } from 'react-icons/fa'

function ErrorMessage() {
    return (
        <div className="container mx-auto px-8 2xl:px-56 py-12">
            <div className="flex flex-col items-center opacity-75">
                <FaExclamationTriangle className="text-6xl mb-4" />
                <div className="font-light text-xl">Error occured, please try again later.</div>
            </div>
        </div>
    )
}

export default ErrorMessage