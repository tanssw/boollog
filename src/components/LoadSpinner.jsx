import { FaCircleNotch } from 'react-icons/fa'

function LoadSpinner() {
    return (
        <div className="container mx-auto px-8 2xl:px-56 py-12">
            <div className="flex items-center justify-center opacity-75">
                <FaCircleNotch className="animate-spin text-4xl" />
                <span className="ml-4">Loading ...</span>
            </div>
        </div>
    )
}

export default LoadSpinner