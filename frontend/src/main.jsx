import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { SocketContextProvider } from './Context/SocketContext.jsx'
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <AuthContextProvider>
  <StrictMode>
    <SocketContextProvider>
    <App />
    </SocketContextProvider>
  </StrictMode>
  </AuthContextProvider>
  </BrowserRouter>
)
