import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// 注册 Service Worker（生产环境）
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register('/paofu-diary/sw.js')
}
