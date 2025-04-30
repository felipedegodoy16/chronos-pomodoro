import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render( // procura por um elemento que tem o id 'root' e renderiza o app dentro desse elemento
  <StrictMode>
    <App />
  </StrictMode>,
)
