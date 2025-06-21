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
    border: {
        light: "#DFE0E4",
        dark: "#1e293b",
    }
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
    background: {
        default: '#0F1419',
        paper: '#1A1F2E',
        secondary: '#242B3D',
    },
    text: {
        primary: '#E2E8F0',
        secondary: '#A0AEC0',
        disabled: '#4A5568',
    },
    border: {
        light: '#334155', // Dark mode light border
        dark: '#1e293b',  // Dark mode dark border
    },
    // ... rest of your dark palette
};