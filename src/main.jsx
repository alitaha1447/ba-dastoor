import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// )

const Root = () => {
  useEffect(() => {
    const loader = document.getElementById("app-loader")
    if (loader) {
      loader.style.opacity = "0"
      loader.style.transition = "opacity 0.8s ease"

      setTimeout(() => {
        loader.remove()
      }, 800)
    }
  }, [])

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)

