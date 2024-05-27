import { useMode } from '../assets/theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '@models/store.ts';

const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
    const { themeMode } = useSelector((state: IStore) => state.ui);
    const theme = useMode(themeMode);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ColorModeProvider;
