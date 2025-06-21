import { useState, useCallback } from "react";
import { Box, Fab, IconButton } from "@mui/material";
import { Pause, PlayArrow, VolumeOff, VolumeUp } from "@mui/icons-material";
import OptimizedVideo from "@/components/ui/Media/Video/OptimizedVideo";

interface VideoViewProps {
    media: string;
    videoPlayerRef: React.RefObject<HTMLVideoElement | null>;
    isPlaying: boolean;
    onPlayPause: () => void;
}

export default function VideoView({
    media,
    videoPlayerRef,
    isPlaying,
    onPlayPause
}: VideoViewProps) {
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
                borderRadius: 1,
                backgroundColor: 'grey.900',
                cursor: 'pointer',
                '&:hover .video-controls': { opacity: 1 }
            }}
            onClick={(e) => {
                e.stopPropagation();
                onPlayPause()
            }}

        >
            <OptimizedVideo
                src={media}
                ref={videoPlayerRef}
                muted={isMuted}
                loop

                style={{
                    width: 'auto',
                    height: '150%',
                    minWidth: '100%',
                    objectFit: 'cover',
                    transform: 'translateY(-25%)', // The videos in the data were mobile resolution so compensating for that :|
                }}
                height={'100%'}
                width={'100%'}

            />

            {
                !isPlaying &&
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
                    <Fab
                        size="large"
                        sx={{
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            color: 'grey.800',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                        }}
                    >
                        {isPlaying ? <Pause /> : <PlayArrow />}
                    </Fab>
                </Box>
            }

            <IconButton
                onClick={(e) => {
                    e.stopPropagation();
                    handleMuteToggle();
                }}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                }}
            >
                {isMuted ? <VolumeOff fontSize="small" /> : <VolumeUp fontSize="small" />}
            </IconButton>
        </Box >
    );
}