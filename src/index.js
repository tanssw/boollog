import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'

ReactDOM.render(
    <StrictMode>
        <BrowserRouter basename="/boollog">
            <App />
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
)