'use client'
import { useState, useRef, useCallback } from 'react'
import { Box, Paper, Typography, IconButton } from '@mui/material'
import { PlayArrow, Pause, VolumeOff, VolumeUp } from '@mui/icons-material'
import Image from 'next/image'
import { Room } from '@/modules/rooms/types/index'
import { useResponsiveTheme } from '@/lib/utils/hooks/useTheme'
import OptimizedImage from '@/components/ui/Media/Image/OptimizedImage'
import OptimizedVideo from '@/components/ui/Media/Video/OptimizedVideo'

// Video component for single room page
function RoomVideoView({
    media,
    videoPlayerRef,
    isPlaying,
    onPlayPause
}: {
    media: string;
    videoPlayerRef: React.RefObject<HTMLVideoElement | null>;
    isPlaying: boolean;
    onPlayPause: () => void;
}) {
    const [isMuted, setIsMuted] = useState(true);

    const handleMuteToggle = useCallback(() => {
        if (videoPlayerRef.current) {
            videoPlayerRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    }, [isMuted, videoPlayerRef]);

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                borderRadius: 2,
                backgroundColor: 'grey.900',
                cursor: 'pointer',
                '&:hover .video-controls': {
                    opacity: 1
                }
            }}
            onClick={(e) => {
                e.stopPropagation();
                onPlayPause()
            }
            }
        >
            <OptimizedVideo
                src={media}
                ref={videoPlayerRef}
                muted={isMuted}
                loop
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }} height={'100%'} width={'100%'} />

            {/* Video Controls Overlay */}
            <Box
                className="video-controls"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    opacity: isPlaying ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: isPlaying ? 'none' : 'auto'
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        borderRadius: '50%',
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'grey.800'
                    }}
                >
                    {isPlaying ? <Pause sx={{ fontSize: 32 }} /> : <PlayArrow sx={{ fontSize: 32 }} />}
                </Box>
            </Box>

            {/* Sound Toggle */}
            <IconButton
                onClick={(e) => {
                    e.stopPropagation();
                    handleMuteToggle();
                }}
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.7)',
                    }
                }}
            >
                {isMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
        </Box>
    );
}

// Image gallery component for single room page
function RoomImageView({
    media,
    onImageClick
}: {
    media: string[];
    onImageClick?: (index: number) => void;
}) {
    const { isMobile } = useResponsiveTheme();

    // Process up to 7 images for display
    const mediaList = media.slice(0, 7);
    const hasMoreImages = media.length > 5;
    const remainingCount = media.length - 4;

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}
        >
            {/* Main large image */}
            <Box
                sx={{
                    flex: '1 1 65%',
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    backgroundColor: 'grey.300',
                    cursor: onImageClick ? 'pointer' : 'default',
                    transition: 'transform 0.2s ease',
                    '&:hover': onImageClick ? {
                        transform: 'scale(1.01)'
                    } : {}
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onImageClick?.(0)
                }
                }
            >
                {mediaList[0] && (
                    <OptimizedImage
                        src={mediaList[0]}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                        alt="Main room image"
                        priority
                    />
                )}
            </Box>

            {/* Bottom row - 4 thumbnail images */}
            {mediaList.length > 1 && (
                <Box
                    sx={{
                        flex: '1 1 35%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 1,
                        minHeight: 0,
                        alignItems: 'stretch'
                    }}
                >
                    {Array.from({ length: 4 }).map((_, index) => {
                        const imageIndex = index + 1;
                        const imageUrl = mediaList[imageIndex];
                        const isLastThumbnail = index === 3;
                        const showViewAll = isLastThumbnail && hasMoreImages;

                        return (
                            <Box
                                key={index}
                                sx={{
                                    position: 'relative',
                                    aspectRatio: '1/1',
                                    borderRadius: 1,
                                    overflow: 'hidden',
                                    backgroundColor: 'grey.300',
                                    cursor: onImageClick ? 'pointer' : 'default',
                                    transition: 'transform 0.2s ease',
                                    '&:hover': onImageClick ? {
                                        transform: 'scale(1.03)'
                                    } : {}
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onImageClick?.(imageIndex)
                                }}
                            >
                                {imageUrl && (
                                    <OptimizedImage
                                        src={imageUrl}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 25vw, 15vw"
                                        alt={`Room image ${imageIndex + 1}`}

                                    />
                                )}



                                {/* Empty state */}
                                {!imageUrl && !showViewAll && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'grey.200',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            color="text.disabled"
                                            sx={{ fontSize: '0.7rem' }}
                                        >
                                            No Image
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
}

// Main room media section component
export default function RoomMediaSection({
    room,
    media,
    mediaType,
    onImageClick
}: {
    room: Room;
    media: string[];
    mediaType: 'video' | 'image' | null;
    onImageClick?: (index: number) => void;
}) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
    const { isMobile } = useResponsiveTheme();

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

    // Auto-play on hover for desktop
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
                    height: {
                        xs: 300,
                        sm: 400,
                        md: 500
                    },
                    borderRadius: 2
                }}
            >
                <Typography variant="body1" color="text.secondary">
                    No media available for {room.name}
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper
            elevation={2}
            sx={{
                width: '100%',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                overflow: 'hidden',

                height: {
                    xs: '60vh',
                    sm: '70vh',
                    md: '60vh',
                    lg: '65vh'
                },

                maxHeight: {
                    xs: '500px',
                    sm: '600px',
                    md: '700px',
                    lg: '800px'
                },

                minHeight: {
                    xs: '400px',
                    sm: '500px',
                    md: '600px'
                },


                // Hover effects
                transition: 'all 0.25s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.01)',
                    boxShadow: 4,
                }
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Media Container - Always Square for consistency */}
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {mediaType === "video" ? (
                    <RoomVideoView
                        videoPlayerRef={videoPlayerRef}
                        media={media[0]}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                    />
                ) : mediaType === "image" ? (
                    <RoomImageView
                        media={media}
                        onImageClick={onImageClick}
                    />
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: 'text.secondary',
                            backgroundColor: 'grey.100'
                        }}
                    >
                        <Typography variant="h6">
                            Unsupported media type
                        </Typography>
                    </Box>
                )}

                {/* Room name overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                        padding: 3,
                        paddingTop: 6
                    }}
                >
                    <Typography
                        variant="h4"
                        color="white"
                        fontWeight="bold"
                        sx={{
                            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                        }}
                    >
                        {room.name}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="rgba(255,255,255,0.9)"
                        sx={{
                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                            mt: 1
                        }}
                    >
                        {room.properties.bed_type} • Up to {room.properties.room_capacity.max_occupancy} guests
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}