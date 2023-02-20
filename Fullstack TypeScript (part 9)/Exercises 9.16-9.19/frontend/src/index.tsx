import ReactDOM from 'react-dom/client'
import App from './App';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)