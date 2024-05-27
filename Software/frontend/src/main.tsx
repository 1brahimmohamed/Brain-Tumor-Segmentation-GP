import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { ColorModeProvider } from '@context/index';
import { Provider } from 'react-redux';

import store from './redux/store.ts';
import '@/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
        <Provider store={store}>
            <ColorModeProvider>
                <App />
            </ColorModeProvider>
        </Provider>
    </HelmetProvider>
);
