import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// import reactRefresh from '@vitejs/plugin-react-refresh';
// import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
            '@assets': path.resolve(__dirname, './src/assets/'),
            '@context': path.resolve(__dirname, './src/context/'),
            '@data': path.resolve(__dirname, './src/data/'),
            '@features': path.resolve(__dirname, './src/features/'),
            '@hooks': path.resolve(__dirname, './src/hooks/'),
            '@models': path.resolve(__dirname, './src/models/'),
            '@pages': path.resolve(__dirname, './src/pages/'),
            '@services': path.resolve(__dirname, './src/services/'),
            '@styles': path.resolve(__dirname, './src/styles/'),
            '@ui': path.resolve(__dirname, './src/ui/'),
            '@utilities': path.resolve(__dirname, './src/utilities/')
        }
    },
    server: {
        host: true,
        port: 5000,
        strictPort: false
    }
});
