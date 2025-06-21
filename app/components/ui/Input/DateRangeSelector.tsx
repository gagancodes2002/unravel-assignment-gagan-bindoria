import React, { useState, useCallback, useMemo } from 'react';
import { Box, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { CheckCircleRounded, Close, CalendarToday } from '@mui/icons-material';
import { format, addDays, isAfter, isBefore } from 'date-fns';
import { useResponsiveTheme } from '@/lib/utils/hooks/useTheme';
import { hotelTokens } from "@/lib/theme";

// Types
interface DateSelection {
    startDate: string | null;
    endDate: string | null;
}

interface DateRangeSelectorProps {
    onDateChange?: (dates: DateSelection) => void;
    placeholder?: {
        checkIn?: string;
        checkOut?: string;
    };
    minDate?: Date;
    maxDate?: Date;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    variant?: 'horizontal' | 'vertical' | 'auto'; // Layout options
    compact?: boolean; // For smaller spaces
}

// Utility functions
const formatDateForInput = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
};

const parseInputDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    try {
        return new Date(dateString);
    } catch {
        return null;
    }
};

const validateDateRange = (startDate: string | null, endDate: string | null): boolean => {
    if (!startDate || !endDate) return true;

    const start = parseInputDate(startDate);
    const end = parseInputDate(endDate);

    if (!start || !end) return false;

    return isAfter(end, start) || format(start, 'yyyy-MM-dd') === format(end, 'yyyy-MM-dd');
};

const formatDisplayDate = (dateString: string | null, isShort: boolean = false): string => {
    if (!dateString) return '';

    const date = parseInputDate(dateString);
    if (!date) return '';

    return format(date, isShort ? 'MMM dd' : 'MMM dd, yyyy');
};

// Main Component
function DateRangeSelector({
    onDateChange,
    placeholder = {
        checkIn: 'Check In',
        checkOut: 'Check Out'
    },
    minDate = new Date(),
    maxDate,
    className,
    disabled = false,
    required = false,
    variant = 'auto',
    compact = false
}: DateRangeSelectorProps) {

    const theme = useTheme();
    const { tokens } = useResponsiveTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const [dateSelection, setDateSelection] = useState<DateSelection>({
        startDate: null,
        endDate: null
    });

    const [errors, setErrors] = useState({
        startDate: '',
        endDate: ''
    });

    // Computed values
    const isEmpty = useMemo(() => {
        return !dateSelection.startDate && !dateSelection.endDate;
    }, [dateSelection]);

    const hasValidRange = useMemo(() => {
        return validateDateRange(dateSelection.startDate, dateSelection.endDate);
    }, [dateSelection]);

    const formattedMinDate = useMemo(() => {
        return formatDateForInput(minDate);
    }, [minDate]);

    const formattedMaxDate = useMemo(() => {
        return maxDate ? formatDateForInput(maxDate) : undefined;
    }, [maxDate]);

    // Determine layout based on variant and screen size
    const isVerticalLayout = useMemo(() => {
        if (variant === 'vertical') return true;
        if (variant === 'horizontal') return false;
        // Auto mode: vertical on mobile, horizontal on desktop
        return isMobile;
    }, [variant, isMobile]);

    // Event handlers
    const handleStartDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = event.target.value || null;
        let newEndDate = dateSelection.endDate;

        if (newStartDate && dateSelection.endDate) {
            const startDate = parseInputDate(newStartDate);
            const endDate = parseInputDate(dateSelection.endDate);

            if (startDate && endDate && isBefore(endDate, startDate)) {
                newEndDate = formatDateForInput(addDays(startDate, 1));
            }
        }

        const newSelection = {
            startDate: newStartDate,
            endDate: newEndDate
        };

        setDateSelection(newSelection);
        setErrors({ startDate: '', endDate: '' });
        onDateChange?.(newSelection);
    }, [dateSelection.endDate, onDateChange]);

    const handleEndDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newEndDate = event.target.value || null;

        const newSelection = {
            ...dateSelection,
            endDate: newEndDate
        };

        if (newEndDate && dateSelection.startDate) {
            const startDate = parseInputDate(dateSelection.startDate);
            const endDate = parseInputDate(newEndDate);

            if (startDate && endDate && isBefore(endDate, startDate)) {
                setErrors(prev => ({
                    ...prev,
                    endDate: 'End date must be after start date'
                }));
                return;
            }
        }

        setDateSelection(newSelection);
        setErrors({ startDate: '', endDate: '' });
        onDateChange?.(newSelection);
    }, [dateSelection, onDateChange]);

    const handleClear = useCallback(() => {
        const clearedSelection = {
            startDate: null,
            endDate: null
        };

        setDateSelection(clearedSelection);
        setErrors({ startDate: '', endDate: '' });
        onDateChange?.(clearedSelection);
    }, [onDateChange]);

    const minEndDate = useMemo(() => {
        if (!dateSelection.startDate) return formattedMinDate;

        const startDate = parseInputDate(dateSelection.startDate);
        if (!startDate) return formattedMinDate;

        return formatDateForInput(startDate);
    }, [dateSelection.startDate, formattedMinDate]);

    // Shared input styles
    const inputStyles = {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: compact ? '13px' : isMobile ? '16px' : '14px', // 16px on mobile prevents zoom
        color: disabled ? '#666' : '#000',
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: '100%',
        minWidth: isMobile ? 'auto' : compact ? '100px' : '130px',
        padding: isMobile ? '4px' : '2px'
    };

    // Responsive container styles
    const containerStyles = {
        p: compact ? 0.75 : isMobile ? 1.5 : 1,
        backgroundColor: disabled ? 'action.disabled' : 'background.paper',
        '&:focus-within': {
            borderColor: 'primary.main',
            boxShadow: (theme: any) => `0 0 0 2px ${theme.palette.primary.main}25`
        },
        ...hotelTokens.inputField.container,
        // Override container styles for responsive behavior
        flexDirection: 'row',
        gap: isVerticalLayout ? 1 : 0.5,
        minHeight: compact ? 'auto' : isMobile ? 56 : 40,
    };

    if (isVerticalLayout) {
        return (
            <Box className={className}>
                {/* Vertical Layout - Mobile/Stacked */}
                <Box sx={containerStyles}>
                    <CalendarToday
                        fontSize="small"
                        sx={{
                            paddingY: 'auto',
                            color: disabled ? 'text.disabled' : 'text.secondary',
                            alignSelf: 'flex-start',
                            mb: 0.5
                        }}
                    />

                    {/* Start Date */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        {/* <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5 }}>
                            {placeholder.checkIn}
                        </Typography> */}
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={dateSelection.startDate || ''}
                            min={formattedMinDate}
                            max={formattedMaxDate}
                            onChange={handleStartDateChange}
                            disabled={disabled}
                            required={required}
                            style={inputStyles}
                        />
                    </Box>

                    {/* End Date */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        {/* <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5 }}>
                            {placeholder.checkOut}
                        </Typography> */}
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={dateSelection.endDate || ''}
                            min={minEndDate}
                            max={formattedMaxDate}
                            onChange={handleEndDateChange}
                            disabled={disabled || !dateSelection.startDate}
                            required={required}
                            style={inputStyles}
                        />
                    </Box>

                    {/* Clear Button */}
                    {!isEmpty && !disabled && (
                        <IconButton
                            onClick={handleClear}
                            size={compact ? "small" : "medium"}
                            sx={{ alignSelf: 'flex-end', mt: 0.5 }}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    )}
                </Box>

                {/* Error Messages */}
                {(errors.startDate || errors.endDate) && (
                    <Box sx={{ mt: 0.5, px: 1 }}>
                        {errors.startDate && (
                            <Typography variant="caption" color="error" display="block">
                                {errors.startDate}
                            </Typography>
                        )}
                        {errors.endDate && (
                            <Typography variant="caption" color="error" display="block">
                                {errors.endDate}
                            </Typography>
                        )}
                    </Box>
                )}

                {/* Helper Text */}
                {!isEmpty && hasValidRange && (
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            mt: 0.5,
                            display: 'block',
                            px: 1,
                            fontSize: { xs: '0.7rem', sm: '0.75rem' }
                        }}
                    >
                        {dateSelection.startDate && dateSelection.endDate && (
                            `${formatDisplayDate(dateSelection.startDate, true)} - ${formatDisplayDate(dateSelection.endDate, isMobile)}`
                        )}
                    </Typography>
                )}
            </Box>
        );
    }

    // Horizontal Layout - Desktop/Inline
    return (
        <Box className={className}>
            <Box sx={containerStyles}>
                <CalendarToday
                    fontSize="small"
                    sx={{
                        color: disabled ? 'text.disabled' : 'text.secondary',
                        flexShrink: 0
                    }}
                />

                {/* Start Date Input */}
                <Box sx={{ display: 'flex', flex: 1, minWidth: 0 }}>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={dateSelection.startDate || ''}
                        min={formattedMinDate}
                        max={formattedMaxDate}
                        onChange={handleStartDateChange}
                        disabled={disabled}
                        required={required}
                        style={inputStyles}
                        placeholder={placeholder.checkIn}
                    />
                </Box>

                {/* Separator */}
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        px: { xs: 0.25, sm: 0.5 },
                        flexShrink: 0,
                        display: { xs: 'none', sm: 'block' } // Hide separator on very small screens
                    }}
                >
                    —
                </Typography>

                {/* End Date Input */}
                <Box sx={{ display: 'flex', flex: 1, minWidth: 0 }}>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={dateSelection.endDate || ''}
                        min={minEndDate}
                        max={formattedMaxDate}
                        onChange={handleEndDateChange}
                        disabled={disabled || !dateSelection.startDate}
                        required={required}
                        style={inputStyles}
                        placeholder={placeholder.checkOut}
                    />
                </Box>

                {/* Clear Button */}
                {!isEmpty && !disabled && (
                    <IconButton
                        onClick={handleClear}
                        size={compact ? "small" : "medium"}
                        sx={{ flexShrink: 0, ml: { xs: 0.25, sm: 0.5 } }}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                )}
            </Box>

            {/* Error Messages */}
            {(errors.startDate || errors.endDate) && (
                <Box sx={{ mt: 0.5 }}>
                    {errors.startDate && (
                        <Typography variant="caption" color="error">
                            {errors.startDate}
                        </Typography>
                    )}
                    {errors.endDate && (
                        <Typography variant="caption" color="error">
                            {errors.endDate}
                        </Typography>
                    )}
                </Box>
            )}

            {/* Helper Text */}
            {!isEmpty && hasValidRange && !compact && (
                <Typography
                    variant="caption"
                    sx={{
                        color: 'text.secondary',
                        mt: 0.5,
                        display: 'block',
                        fontSize: { xs: '0.7rem', sm: '0.75rem' }
                    }}
                >
                    {dateSelection.startDate && dateSelection.endDate && (
                        `${formatDisplayDate(dateSelection.startDate, isTablet)} - ${formatDisplayDate(dateSelection.endDate, isTablet)}`
                    )}
                </Typography>
            )}
        </Box>
    );
}

// Usage Examples Component
function ResponsiveDateRangeExamples() {
    const [selectedDates, setSelectedDates] = useState<DateSelection>({
        startDate: null,
        endDate: null
    });

    const handleDateChange = (dates: DateSelection) => {
        setSelectedDates(dates);
        console.log('Selected dates:', dates);
    };

    return (
        <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Responsive Date Range Selector Examples
            </Typography>

            {/* Auto Layout (Responsive) */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Auto Layout (responsive):
                </Typography>
                <DateRangeSelector
                    onDateChange={handleDateChange}
                    variant="auto"
                />
            </Box>

            {/* Horizontal Layout */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Always Horizontal:
                </Typography>
                <DateRangeSelector
                    onDateChange={handleDateChange}
                    variant="horizontal"
                />
            </Box>

            {/* Vertical Layout */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Always Vertical:
                </Typography>
                <DateRangeSelector
                    onDateChange={handleDateChange}
                    variant="vertical"
                />
            </Box>

            {/* Compact Version */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Compact Version:
                </Typography>
                <DateRangeSelector
                    onDateChange={handleDateChange}
                    compact={true}
                />
            </Box>

            {/* With Custom Placeholders */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Custom Placeholders:
                </Typography>
                <DateRangeSelector
                    onDateChange={handleDateChange}
                    placeholder={{
                        checkIn: 'Arrival Date',
                        checkOut: 'Departure Date'
                    }}
                />
            </Box>

            {/* Selected Values Display */}
            {(selectedDates.startDate || selectedDates.endDate) && (
                <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
                    <Typography variant="body2">
                        <strong>Selected Dates:</strong><br />
                        Start: {selectedDates.startDate || 'Not selected'}<br />
                        End: {selectedDates.endDate || 'Not selected'}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

export { DateRangeSelector, ResponsiveDateRangeExamples };
export type { DateSelection, DateRangeSelectorProps };