import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from "axios";
import App from './App'

axios.defaults.baseURL = 'http://localhost:3001'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)