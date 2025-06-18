import type { Components, Theme } from '@mui/material/styles';

export const components: Components<Theme> = {
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0px 4px 12px rgba(44, 95, 93, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                border: '1px solid rgba(229, 229, 228, 0.5)',
                background: 'linear-gradient(145deg, #ffffff 0%, #fafaf9 100%)',

                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0px 20px 40px rgba(44, 95, 93, 0.15)',
                    borderColor: 'rgba(44, 95, 93, 0.2)',
                },
            },
        },
    },
    // ... rest of components
};