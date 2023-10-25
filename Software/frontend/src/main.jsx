import React from 'react'
import ReactDOM from 'react-dom/client'
import ColorModeProvider from "./hooks/ColorModeProvider.jsx";
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

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
