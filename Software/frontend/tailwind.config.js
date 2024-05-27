/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px'
        },

        extend: {
            colors: {
                AAPrimaryLight: '#58c3eb',
                AAPrimary: '#10a9e2',
                AAPrimaryDark: '#0b769e',

                AASecondary: '#fff',
                AAError: '#ff6489',
                AASuccess: '#00c853',
                AAFirstShade: '#2f2f33',
                AASecondShade: '#383842'
            }
        }
    },
    plugins: []
};
