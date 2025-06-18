'use client';

import { useMediaQuery, useTheme as useMuiTheme } from "@mui/material";
import { hotelTokens } from "../theme";

export const useResponsiveTheme = () => {
    const theme = useMuiTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    return {
        theme,
        tokens: hotelTokens,
        isMobile,
        isTablet,
        isDesktop,
        spacing: (multiplier: number) => theme.spacing(multiplier),
        shadow: (elevation: number) => theme.shadows[elevation],
    };

}