import React from 'react'
import ReactDOM from 'react-dom/client'
import ColorModeProvider from "./hooks/ColorModeProvider.jsx";
import { LoadingProvider } from "./hooks/LoadingProvider.jsx";
import { HelmetProvider } from 'react-helmet-async'
import store from "./redux/store.js"
import { Provider } from "react-redux"
import App from './App.jsx'

import './styles/index.css'

const disableRightClick = (event) => {
    event.preventDefault();
};
document.addEventListener('contextmenu', disableRightClick)

ReactDOM.createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
      <HelmetProvider>
          <ColorModeProvider>
              <LoadingProvider>
                  <Provider store={store}>
                    <App />
                  </Provider>
              </LoadingProvider>
          </ColorModeProvider>
      </HelmetProvider>
  // </React.StrictMode>,
)
