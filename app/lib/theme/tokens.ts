export const hotelTokens = {
    roomStatus: {
        available: '#4CAF50',
        limited: '#FF9800',
        unavailable: '#F44336',
        booked: '#9E9E9E',
    },

    gradients: {
        primary: 'linear-gradient(135deg, #2C5F5D 0%, #4A8785 100%)',
        secondary: 'linear-gradient(135deg, #D4A574 0%, #E2C49C 100%)',
        hero: 'linear-gradient(135deg, #2C5F5D 0%, #D4A574 50%, #6B5B73 100%)',
    },

    input: {
        active: '#00a63e',
        selected: '#00a63e'
    },
    layout: {
        containerMaxWidth: '1400px',
        sectionSpacing: '80px',
        cardSpacing: '24px',
    },

    carousel: {
        active: '#1e293b',
        inactive: '#cbd5e1'
    },

    inputField: {
        container: {
            display: 'flex',
            flexDirection: "row",
            gap: 2,
            justifyItems: 'center',
            alignItems: 'center',
            border: 'solid 1px',
            borderColor: 'border.dark',
            borderRadius: '8px',
            height: 42,
            px: 2
        },

        textFieldBorderLess: {
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    border: 'none',
                },
                '&:hover fieldset': {
                    border: 'none',
                },
                '&.Mui-focused fieldset': {
                    border: 'none',
                },
            },
            // Add these lines to remove the bottom line
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
            '& .MuiInput-underline:hover:before': {
                borderBottom: 'none',
            },
            '& .MuiInput-underline:after': {
                borderBottom: 'none',
            },
            // Also target any other underline variants
            '& .MuiInputBase-root:before': {
                borderBottom: 'none',
            },
            '& .MuiInputBase-root:hover:before': {
                borderBottom: 'none',
            },
            '& .MuiInputBase-root:after': {
                borderBottom: 'none',
            },
        }

    },


};