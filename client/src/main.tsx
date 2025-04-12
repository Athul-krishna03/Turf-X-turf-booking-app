import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProviders } from './hooks/providers/AppProviders.tsx'

createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App/>
  </AppProviders>
)
