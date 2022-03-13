import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import navigators from './json/navigators.json'

function NavigationBar() {

    const location = useLocation()

    const [currentLocation, setCurrentLocation] = useState("")

    useEffect(() => {
        setCurrentLocation(location.pathname)
    }, [location])

    const Navigators = () => {
        return navigators.map((navigator, index) => {
            let isActive = navigator.path === currentLocation
            let active = isActive ? 'font-bold ' : 'font-light text-slate-200 '
            let marginLeft = index ? 'ml-8 ' : ''
            return (
                <Link key={index} to={navigator.path} className={`${active}${marginLeft}hover:text-slate-600 duration-100`}>{navigator.title}</Link>
            )
        })
    }

    return (
        <div className="">
            <div className="container mx-auto px-8 2xl:px-56 py-4 flex justify-between items-center">
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