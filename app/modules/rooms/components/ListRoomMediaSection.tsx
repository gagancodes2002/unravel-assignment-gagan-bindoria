import { useState, useRef, useCallback } from "react";
import { Box, Paper, Typography, Button, Grid } from "@mui/material";
import { useResponsiveTheme } from "@/lib/utils/hooks/useTheme";
import { Room } from "../types/room.types";
import VideoView from "./VideoView";
import ImageView from "./ImageView";
import { descriptionLoremIpsum } from "../lib/constants";

interface RoomMediaSectionProps {
    roomIndex: number;
    room: Room;
    media: string[];
    mediaType: 'video' | 'image' | null;
    onImageClick?: (index: number) => void;
}

export default function ListRoomMediaSection({
    roomIndex,
    room,
    media,
    mediaType,
    onImageClick
}: RoomMediaSectionProps) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const videoPlayerRef = useRef<HTMLVideoElement>(null);
    const { isMobile, theme } = useResponsiveTheme();

    const handlePlayPause = useCallback(() => {
        if (videoPlayerRef.current) {
            if (isPlaying) {
                videoPlayerRef.current.pause();
                setIsPlaying(false);
            } else {
                videoPlayerRef.current.play();
                setIsPlaying(true);
            }
        }
    }, [isPlaying]);

    const handleMouseEnter = useCallback(() => {
        if (!isMobile && mediaType === 'video' && videoPlayerRef.current) {
            videoPlayerRef.current.play();
            setIsPlaying(true);
        }
    }, [isMobile, mediaType]);

    const handleMouseLeave = useCallback(() => {
        if (!isMobile && mediaType === 'video' && videoPlayerRef.current) {
            videoPlayerRef.current.pause();
            videoPlayerRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, [isMobile, mediaType]);

    if (!media || media.length === 0) {
        return (
            <Paper
                elevation={2}
                sx={{
                    width: '100%',
                    backgroundColor: 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: { xs: 300, sm: 400, md: 350 },
                    borderRadius: 2
                }}
            >
                <Typography variant="body1" color="text.secondary">
                    No media available
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper
            elevation={2}
            sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '60vw' },
                backgroundColor: 'background.paper',
                display: 'grid',
                overflow: 'hidden',
                borderRadius: 2,
                gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
                gridTemplateRows: { xs: 'auto auto', md: '1fr' },
                height: { xs: 'auto', md: '32vh' },
                maxHeight: { xs: 'none', md: '280px' },
                minHeight: { xs: 'auto', sm: '58vh', md: '260px' },
                gap: { xs: 0, md: 2 },
                padding: { xs: 1, sm: 1.5, md: 2 },
                transition: 'scale 0.25s ease-in-out',
                '&:hover': {
                    scale: '102%',
                    boxShadow: 3,
                    border: '1px solid',
                    borderColor: 'grey.400'
                }
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 1,
                    backgroundColor: 'grey.200',
                    aspectRatio: '1/1',
                    width: { xs: '100%', md: 'auto' },
                    height: { xs: 'auto', md: '100%' },
                    maxWidth: { xs: '90vw', md: 'none' },
                    justifySelf: { xs: 'center', md: 'start' }
                }}
            >
                {mediaType === "video" ? (
                    <VideoView
                        videoPlayerRef={videoPlayerRef}
                        media={media[0]}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                    />
                ) : mediaType === "image" ? (
                    <ImageView media={media} onImageClick={onImageClick} />
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: 'text.secondary'
                        }}
                    >
                        <Typography variant="body1">Unsupported media type</Typography>
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    padding: { xs: 1.5, sm: 2, md: 0 },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: 2,
                    minHeight: { xs: '120px', md: 'auto' },
                    backgroundColor: { xs: 'transparent', md: 'background.paper' },
                    overflow: 'auto'
                }}
            >
                <Box
                    sx={{
                        width: '40%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                        sx={{
                            overflow: {
                                xs: 'hidden',
                                md: 'visible',
                            },
                            display: {
                                xs: '-webkit-box',
                                md: 'block',
                            },
                            WebkitBoxOrient: {
                                xs: 'vertical',
                                md: 'unset',
                            },
                            WebkitLineClamp: {
                                xs: 2,
                                md: 'unset',
                            },
                            textOverflow: {
                                xs: 'ellipsis',
                                md: 'unset',
                            },
                            whiteSpace: {
                                xs: 'normal',
                                md: 'normal',
                            },
                        }}
                    >
                        {room.name}
                    </Typography>
                    <Typography
                        variant="body1"
                        maxHeight={"30%"}
                        sx={{
                            overflowY: 'scroll'
                        }}
                    >
                        {descriptionLoremIpsum}
                    </Typography>
                </Box>

                <Grid
                    size={
                        {
                            xs: 12
                        }
                    }
                >


                    <Button
                        variant="contained"
                        href={`/rooms/${roomIndex}`}
                        sx={{
                            alignSelf: 'flex-start',
                            textTransform: 'none',
                            borderRadius: 1
                        }}
                    >
                        View Details
                    </Button>
                </Grid>
            </Box>
        </Paper >
    );
}