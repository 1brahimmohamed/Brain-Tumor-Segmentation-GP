import { PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface PaletteColor {
        lighter: string;
    }
    interface Palette {
        neutral: PaletteColor;
    }
}
