'use client';

import { useInView } from "react-intersection-observer";
import { useInfiniteRooms } from "../hooks/useInfiniteRooms";
import SkeletonLoader from "@/components/ui/Loader/SkeletonLoader";
import ErrorFallBack from "@/components/ui/ErrorFallback/ErrorFallback";
import React from "react";
import { Autocomplete, Box, CircularProgress, Grid, Skeleton, TextField, Typography } from "@mui/material";
import RoomCard from "./RoomCard";
import { LocationPin } from "@mui/icons-material";

const cityOptions = [
    {
        label: "Delhi",
        id: "delhi"
    },
    {
        label: "Mumbai",
        id: "mumbai"
    },
    {
        label: "Bangalore",
        id: "bangalore"
    },
    {
        label: "Kolkata",
        id: "kolkata"
    },
    {
        label: "Chennai",
        id: "chennai"
    },
    {
        label: "Hyderabad",
        id: "hyderabad"
    },
    {
        label: "Pune",
        id: "pune"
    },
    {
        label: "Ahmedabad",
        id: "ahmedabad"
    },
    {
        label: "Jaipur",
        id: "jaipur"
    },
    {
        label: "Surat",
        id: "surat"
    },
    {
        label: "Lucknow",
        id: "lucknow"
    },
    {
        label: "Kanpur",
        id: "kanpur"
    },
    {
        label: "Nagpur",
        id: "nagpur"
    },
    {
        label: "Indore",
        id: "indore"
    },
    {
        label: "Bhopal",
        id: "bhopal"
    },
    {
        label: "Visakhapatnam",
        id: "visakhapatnam"
    },
    {
        label: "Patna",
        id: "patna"
    },
    {
        label: "Vadodara",
        id: "vadodara"
    },
    {
        label: "Ghaziabad",
        id: "ghaziabad"
    },
    {
        label: "Ludhiana",
        id: "ludhiana"
    },
    {
        label: "Coimbatore",
        id: "coimbatore"
    },
    {
        label: "Kochi",
        id: "kochi"
    },
    {
        label: "Chandigarh",
        id: "chandigarh"
    },
    {
        label: "Mysore",
        id: "mysore"
    },
    {
        label: "Thiruvananthapuram",
        id: "thiruvananthapuram"
    }
]

export default function InfiniteRoomsList() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error
    } = useInfiniteRooms();

    const { ref } = useInView({
        threshold: 1,
        onChange: (inView) => {
            if (inView && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
    });

    if (isLoading) {
        return (
            <Grid container spacing={3} >
                {Array.from({ length: 12 }).map((_, index) => (
                    <Grid
                        key={index}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 3,
                            xl: 2,
                        }}
                        sx={{
                            gap: 16,
                        }}
                    >
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            sx={{
                                position: 'relative',
                                borderRadius: 2,
                                overflow: 'hidden',
                                aspectRatio: '20/19',
                                backgroundColor: 'grey.200',
                                minHeight: 200,
                                boxSizing: 'border-box'
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (isError) {
        return <ErrorFallBack error={error} />;
    }


    return (
        <Grid
            sx={{
                maxWidth: '1200px',
                margin: '0 auto',


            }}
            container

        >

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                    width: '100%'
                }}
            >


                <Autocomplete
                    disablePortal
                    options={cityOptions}
                    sx={{
                        width: 300,
                    }}
                    renderInput={(params) =>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: "row",
                                gap: 2,
                                justifyItems: 'center',
                                alignItems: 'center',
                                border: 'solid 2px gray',
                                borderRadius: '8px',
                                height: 50,
                                px: 2
                            }}
                        >
                            <LocationPin
                                className="grow-0"
                            />
                            <TextField
                                variant="standard"
                                sx={{
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
                                }
                                {...params} placeholder="Where to?" />
                        </Box>}
                />
                <Autocomplete
                    disablePortal
                    options={cityOptions}
                    sx={{
                        width: 300,
                    }}
                    renderInput={(params) =>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: "row",
                                gap: 2,
                                justifyItems: 'center',
                                alignItems: 'center',
                                border: 'solid 2px gray',
                                borderRadius: '8px',
                                height: 50,
                                px: 2
                            }}
                        >
                            <LocationPin
                                className="grow-0"
                            />
                            <TextField
                                variant="standard"
                                sx={{
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
                                }
                                {...params} placeholder="Where to?" />
                        </Box>}
                />
                <Autocomplete
                    disablePortal
                    options={cityOptions}
                    sx={{
                        width: 300,
                    }}
                    renderInput={(params) =>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: "row",
                                gap: 2,
                                justifyItems: 'center',
                                alignItems: 'center',
                                border: 'solid 2px gray',
                                borderRadius: '8px',
                                height: 50,
                                px: 2
                            }}
                        >
                            <LocationPin
                                className="grow-0"
                            />
                            <TextField
                                variant="standard"
                                sx={{
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
                                }
                                {...params} placeholder="Where to?" />
                        </Box>}
                />

            </Box>

            <Grid
                container
                columnSpacing={6}
                rowSpacing={3}
            // sx={{
            //     // Fix for grid item height issues
            //     '& .MuiGrid-item': {
            //         display: 'flex',
            //         flexDirection: 'column',
            //         minHeight: 320, // Minimum height for each grid item
            //     }
            // }}
            >
                {data?.pages.map((page, pageIndex) =>
                    page.map((room, roomIndex) => (
                        <Grid
                            key={room?.id || `${pageIndex}-${roomIndex}`}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4,
                                lg: 3,
                                xl: 2,
                            }}
                        // Remove any extra sx props that might conflict
                        >
                            <RoomCard room={room} />
                        </Grid>
                    ))
                )}
            </Grid>
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
                {isFetchingNextPage && (
                    <CircularProgress
                        size={40}
                        sx={{ color: 'primary.main' }}
                    />
                )}
            </Box>
        </Grid>

    );
}