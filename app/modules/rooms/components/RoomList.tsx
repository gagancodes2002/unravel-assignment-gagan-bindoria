'use client';

import { useInView } from "react-intersection-observer";
import { useInfiniteRooms } from "../hooks/useInfiniteRooms";
import ErrorFallBack from "@/components/ui/ErrorFallback/ErrorFallback";
import React, { useMemo, useState, useCallback } from "react";
import {
    Autocomplete,
    Box,
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    Skeleton,
    TextField,
    Typography,
    Container,
    Stack,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useTheme,
    useMediaQuery,
    Chip
} from "@mui/material";
import RoomCard from "./RoomCard";
import { LocationPin, Person, Search, FilterList, Tune, ExpandMore } from "@mui/icons-material";
import mapImage from "@/../public/images/map.png"
import { hotelTokens } from "@/lib/theme";
import { useRouter, useSearchParams } from "next/navigation";
import { DateRangeSelector } from "@/components/ui/Input/DateRangeSelector";
import { LazyComponentWrapper } from "@/components/ui/LazyLoading/LazyComponentWrapper";
import OptimizedImage from "@/components/ui/Media/Image/OptimizedImage";

// Constants
const cityOptions = [
    { label: "Delhi", id: "delhi" },
    { label: "Mumbai", id: "mumbai" },
    { label: "Bangalore", id: "bangalore" },
    { label: "Kolkata", id: "kolkata" },
    { label: "Chennai", id: "chennai" },
    { label: "Hyderabad", id: "hyderabad" },
    { label: "Pune", id: "pune" },
    { label: "Ahmedabad", id: "ahmedabad" },
    { label: "Jaipur", id: "jaipur" },
    { label: "Surat", id: "surat" },
    { label: "Lucknow", id: "lucknow" },
    { label: "Kanpur", id: "kanpur" },
    { label: "Nagpur", id: "nagpur" },
    { label: "Indore", id: "indore" },
    { label: "Bhopal", id: "bhopal" },
    { label: "Visakhapatnam", id: "visakhapatnam" },
    { label: "Patna", id: "patna" },
    { label: "Vadodara", id: "vadodara" },
    { label: "Ghaziabad", id: "ghaziabad" },
    { label: "Ludhiana", id: "ludhiana" },
    { label: "Coimbatore", id: "coimbatore" },
    { label: "Kochi", id: "kochi" },
    { label: "Chandigarh", id: "chandigarh" },
    { label: "Mysore", id: "mysore" },
    { label: "Thiruvananthapuram", id: "thiruvananthapuram" }
];

const filterOptions = [
    'Breakfast Included',
    'Free Cancellation',
    'Hotel',
    'Reserve now, Pay later',
    'Pool',
    'Gym',
    'Free WiFi',
    'Pet Friendly'
];

// Utility Functions



// Components
function ExploreOnMap() {
    return (
        <Paper
            elevation={1}
            sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: 240, md: '100%' },
                aspectRatio: '1/1',
                maxHeight: { xs: 200, sm: 240, md: 220 },
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) => theme.shadows[4]
                }
            }}
        >
            <Box sx={{ height: '75%', position: 'relative', overflow: 'hidden' }}>
                <OptimizedImage
                    fill
                    src={mapImage.src}
                    alt="Explore on map"
                    style={{ objectFit: 'cover' }}
                />
            </Box>
            <Box sx={{ height: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2 }}>
                <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                        color: 'primary.main',
                        textAlign: 'center',
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    View on map
                </Typography>
            </Box>
        </Paper>
    );
}


function SearchInputs({ onDateChange }: { onDateChange?: (dates: any) => void }) {

    const [hotelDates, setHotelDates] = useState({ startDate: null, endDate: null });


    return (
        <Paper elevation={1} sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <Autocomplete
                        disablePortal
                        options={cityOptions}
                        renderInput={(params) => (
                            <Box sx={hotelTokens.inputField.container}>
                                <LocationPin sx={{ color: 'text.secondary' }} />
                                <TextField
                                    variant="standard"
                                    sx={hotelTokens.inputField.textFieldBorderLess}
                                    {...params}
                                    placeholder="Where to?"
                                />
                            </Box>
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 'grow', md: 'grow' }}>
                    <DateRangeSelector onDateChange={onDateChange} />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 'auto' }}>

                    <Box sx={hotelTokens.inputField.container}>
                        <Person sx={{ color: 'text.secondary' }} />
                        <TextField
                            type="number"
                            variant="standard"
                            sx={hotelTokens.inputField.textFieldBorderLess}
                            placeholder="Guests & rooms"
                        />
                    </Box>

                </Grid>
            </Grid>
        </Paper>
    );
}

function FilterContent({ selectedFilters, onFilterChange }: {
    selectedFilters: string[];
    onFilterChange: (filters: string[]) => void;
}) {
    const handleFilterToggle = useCallback((filter: string) => {
        const newFilters = selectedFilters.includes(filter)
            ? selectedFilters.filter(f => f !== filter)
            : [...selectedFilters, filter];
        onFilterChange(newFilters);
    }, [selectedFilters, onFilterChange]);

    return (
        <Box sx={{ px: 2 }}>
            <FormGroup>
                {filterOptions.map((filter) => (
                    <FormControlLabel
                        key={filter}
                        control={
                            <Checkbox
                                size="small"
                                checked={selectedFilters.includes(filter)}
                                onChange={() => handleFilterToggle(filter)}
                            />
                        }
                        label={<Typography variant="body2">{filter}</Typography>}
                    />
                ))}
            </FormGroup>

            {selectedFilters.length > 0 && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {selectedFilters.map((filter) => (
                            <Chip
                                key={filter}
                                label={filter}
                                size="small"
                                onDelete={() => handleFilterToggle(filter)}
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
}

function FilterSidebar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleFilterChange = useCallback((filters: string[]) => {
        setSelectedFilters(filters);
    }, []);

    if (isMobile) {
        return (
            <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1rem' }}>
                            Search Properties
                        </Typography>
                        <Autocomplete
                            disablePortal
                            options={cityOptions}
                            size="small"
                            renderInput={(params) => (
                                <Box sx={hotelTokens.inputField.container}>
                                    <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
                                    <TextField
                                        variant="standard"
                                        sx={hotelTokens.inputField.textFieldBorderLess}
                                        {...params}
                                        placeholder="Property name"
                                    />
                                </Box>
                            )}
                        />
                    </Paper>

                    <Accordion
                        elevation={1}
                        sx={{
                            '&:before': { display: 'none' },
                            borderRadius: 2
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Tune sx={{ color: 'text.secondary', mr: 1 }} />
                            <Typography>Filters</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FilterContent
                                selectedFilters={selectedFilters}
                                onFilterChange={handleFilterChange}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <ExploreOnMap />
                </Stack>
            </Box>
        );
    }

    return (
        <Stack spacing={3}>
            <ExploreOnMap />

            <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Search Properties
                </Typography>
                <Autocomplete
                    disablePortal
                    options={cityOptions}
                    renderInput={(params) => (
                        <Box sx={hotelTokens.inputField.container}>
                            <Search sx={{ color: 'text.secondary' }} />
                            <TextField
                                variant="standard"
                                sx={hotelTokens.inputField.textFieldBorderLess}
                                {...params}
                                placeholder="Property name"
                            />
                        </Box>
                    )}
                />
            </Paper>

            <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <FilterList sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="h6">Filters</Typography>
                </Box>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                    Popular Filters
                </Typography>
                <FilterContent
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                />
            </Paper>
        </Stack>
    );
}

function LoadingSkeleton() {
    return (
        <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>
            <SearchInputs />
            <Grid container spacing={3}>
                <Grid sx={{ display: { xs: 'none', sm: 'block' } }} size={{ xs: 12, md: 3 }}>
                    <Stack spacing={3}>
                        <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 2 }} />
                        <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
                        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 9 }}>
                    <Grid container spacing={3}>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Grid key={index} size={{ xs: 12, sm: 6, md: 12 }}>
                                <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 2 }} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default function InfiniteRoomsList() {
    // All hooks at the top
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error
    } = useInfiniteRooms();

    const queryParam = useSearchParams();
    const router = useRouter();
    const [selectedDates, setSelectedDates] = useState<any>(null);

    const { ref } = useInView({
        threshold: 0.1,
        onChange: (inView) => {
            if (inView && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
    });

    // Computed values
    const loadedRooms = useMemo(() => {
        if (!data?.pages?.length) return [];
        return data.pages.flat();
    }, [data?.pages]);

    const selectedRoom = useMemo(() => {
        const roomId = queryParam.get('roomId');
        if (!roomId || !loadedRooms.length) return null;

        const roomIndex = parseInt(roomId);
        return loadedRooms[roomIndex] || null;
    }, [queryParam, loadedRooms]);

    // Event handlers
    const handleRoomSelection = useCallback((roomIndex: number) => {
        router.push(`/rooms/${roomIndex}`);
    }, [router]);

    const handleDateChange = useCallback((dates: any) => {
        setSelectedDates(dates);
    }, []);

    // Early returns after all hooks
    if (isLoading) return <LoadingSkeleton />;

    if (isError) {
        return (
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <ErrorFallBack error={error} />
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>
            <SearchInputs onDateChange={handleDateChange} />

            <Grid container spacing={{ xs: 2, md: 3 }}>
                {/* Desktop Sidebar */}
                <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Box sx={{ position: 'sticky', top: 20 }}>
                        <FilterSidebar />
                    </Box>
                </Grid>

                {/* Mobile Sidebar */}
                <Grid size={12} sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
                    <FilterSidebar />
                </Grid>

                {/* Rooms Grid */}
                <Grid size={{ xs: 12, md: 9 }}>
                    <Grid container spacing={{ xs: 2, sm: 3 }}>
                        {loadedRooms.map((room, roomIndex) => (
                            <Grid
                                key={roomIndex}
                                size={{ xs: 12, sm: 6, md: 12 }}
                                onClick={(e) => {

                                    e.stopPropagation();
                                    handleRoomSelection(roomIndex)
                                }
                                }
                                sx={{ cursor: 'pointer' }}
                            >
                                <LazyComponentWrapper
                                    key={roomIndex}
                                    height={'fitContent'}
                                    threshold={0.1}
                                    width={'100%'}
                                    maxWidth={{ xs: '100%', sm: '60vw' }}

                                >
                                    <RoomCard roomIndex={roomIndex} room={room} />
                                </LazyComponentWrapper>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Loading Indicator */}
                    <Box
                        ref={ref}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            py: 4,
                            minHeight: 80,
                        }}
                    >
                        {isFetchingNextPage && <CircularProgress size={40} />}
                        {!hasNextPage && loadedRooms.length > 0 && (
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                No more results to load
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container >
    );
}