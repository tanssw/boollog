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
            <div className="container mx-auto px-56 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl">
                    boollog
                </Link>
                <div>
                    <Navigators />
                </div>
            </div>
        </div>
    )
}

export default NavigationBar