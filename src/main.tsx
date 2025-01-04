import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Portfolio from './Portfolio.tsx'
import { createBrowserRouter, RouterProvider, Route } from 'react-router'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Portfolio />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>,
)
// npm run build
// npm run deploy