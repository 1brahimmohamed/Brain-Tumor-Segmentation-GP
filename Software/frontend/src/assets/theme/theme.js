import {createContext, useState, useMemo} from 'react';

// MUI
import {createTheme} from '@mui/material/styles';


export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
            },
            primary: {
                100: "#d5d5d6",
                200: "#acacad",
                300: "#3f3f43",
                400: "#383842",
                500: "#2f2f33",
                600: "#27272b",
                700: "#1c1c1f",
                800: "#131314",
                900: "#09090a"
            },
            green: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922",
            },
            red: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f",
            },
            blue: {
                100: "#cfeef9",
                200: "#9fddf3",
                300: "#70cbee",
                400: "#40bae8",
                500: "#10a9e2",
                600: "#0d87b5",
                700: "#0a6588",
                800: "#06445a",
                900: "#03222d"
            },
        }
        : {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },
            primary: {
                100: "#09090a",
                200: "#131314",
                300: "#1c1c1f",
                400: "#262629",
                500: "#2f2f33",
                600: "#383842",
                700: "#3f3f43",
                800: "#acacad",
                900: "#d5d5d6",
            },
            green: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
            },
            red: {
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#db4f4a",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#f8dcdb",
            },
            blue: {
                100: "#03222d",
                200: "#06445a",
                300: "#0a6588",
                400: "#0d87b5",
                500: "#10a9e2",
                600: "#40bae8",
                700: "#70cbee",
                800: "#9fddf3",
                900: "#cfeef9",
            },
        }),
});

export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(
                mode === 'dark'? {
                    primary: {
                        main: colors.primary[500],
                        dark: colors.primary[600],
                        light: colors.primary[400],
                    },
                    secondary: {
                        main: colors.blue[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.primary[500],
                    },
                } : {
                    primary: {
                        main: "#ffffff",
                        dark: colors.primary[300],
                        light: colors.primary[800],
                    },
                    secondary: {
                        main: colors.blue[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }),
        },
        typography: {
            fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
            fontSize: 12,
            h1 :{
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 40,
            },
            h2 :{
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 32,
            },
            h3 :{
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 24,
            },
            h4 :{
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 20,
            },
            h5 :{
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 16,
            },
            h6 :{
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 14,
            },

        },
    };
};

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export const useMode = () => {
    const [mode, setMode] = useState('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
}
