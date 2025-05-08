import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import NavbarContextProvider from './components/contexts/NavbarContextProvider.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NavbarContextProvider>
            <App />
        </NavbarContextProvider>
    </StrictMode>,
)
