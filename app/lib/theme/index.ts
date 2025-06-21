import { createTheme } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette';
import { typography } from './typography';
import { components } from './components';

// 🎯 Add this type declaration
declare module '@mui/material/styles' {
    interface Palette {
        border: {
            light: string;
            dark: string;
        };
    }

    interface PaletteOptions {
        border?: {
            light?: string;
            dark?: string;
        };
    }

    // Also extend the Theme interface for direct theme access
    interface Theme {
        palette: Palette;
    }
}

export const lightTheme = createTheme({
    palette: lightPalette,
    typography,
    components,
    shape: {
        borderRadius: 12,
    },
    spacing: 8,
});

export const darkTheme = createTheme({
    palette: darkPalette,
    typography,
    components,
    shape: {
        borderRadius: 12,
    },
    spacing: 8,
});

export * from './tokens';
export { lightPalette, darkPalette, typography, components };