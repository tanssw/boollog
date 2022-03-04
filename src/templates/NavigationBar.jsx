import { Link } from 'react-router-dom'

import navigators from './json/navigators.json'

function NavigationBar() {

    const Navigators = () => {
        return navigators.map((navigator, index) => {
            let marginLeft = index ? 'ml-8 ' : ''
            return (
                <Link key={index} to={navigator.path} className={`${marginLeft}hover:text-slate-600 duration-100`}>{navigator.title}</Link>
            )
        })
    }

    return (
        <div className="">
            <div className="container mx-auto px-8 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl">
                    boollog
                </Link>
                <div>
                    <Navigators />
                    <Link to="/create" className="ml-8 dark:bg-sky-300 dark:hover:bg-sky-400 duration-100 dark:text-gray-900 px-4 py-2 rounded-lg">
                        Create
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar