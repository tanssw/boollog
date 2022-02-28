import { Routes, Route } from 'react-router-dom'

import Homepage from './pages/home/Homepage'
import Posts from './pages/posts/Posts'

import NavigationBar from './templates/NavigationBar'

function App() {
    return (
        <div className="dark:bg-gray-900 dark:text-gray-50 min-h-screen">
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/posts" element={<Posts />} />
            </Routes>
        </div>
    )
}

export default App