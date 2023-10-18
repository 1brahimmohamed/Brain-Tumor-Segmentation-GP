import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import ColorModeProvider from "./hooks/ColorModeProvider.jsx";

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
      <HelmetProvider>
          <ColorModeProvider>
                <App />
          </ColorModeProvider>
      </HelmetProvider>
  </React.StrictMode>,
)
