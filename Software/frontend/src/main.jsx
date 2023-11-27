import React from 'react'
import ReactDOM from 'react-dom/client'
import ColorModeProvider from "./hooks/ColorModeProvider.jsx";
import { LoadingProvider } from "./hooks/LoadingProvider.jsx";
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
      <HelmetProvider>
          <ColorModeProvider>
              <LoadingProvider>
                  <App />
              </LoadingProvider>
          </ColorModeProvider>
      </HelmetProvider>
  // </React.StrictMode>,
)
