export const lightPalette = {
    primary: {
        main: '#2C5F5D',
        light: '#4A8785',
        dark: '#1A3E3C',
        contrastText: '#FFFFFF',
    },
    secondary: {
        main: '#D4A574',
        light: '#E2C49C',
        dark: '#B8935F',
        contrastText: '#FFFFFF',
    },
    background: {
        default: '#FAFAF9',
        paper: '#FFFFFF',
        secondary: '#F5F5F4',
    },
    text: {
        primary: '#2D3748',
        secondary: '#718096',
        disabled: '#A0AEC0',
    },
    // ... rest of palette
};

export const darkPalette = {
    mode: 'dark' as const,
    primary: {
        main: '#4A8785',
        light: '#6BA8A6',
        dark: '#2C5F5D',
        contrastText: '#FFFFFF',
    },
    // ... rest of dark palette
};