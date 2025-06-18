import { useResponsiveTheme } from "@/lib/hooks/useTheme";
import { ArrowLeft, ArrowRight, Pause, PlayArrow, PlayCircleFilled } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";


export default function ({ media, mediaType }: { media: string[], mediaType: 'video' | 'image' | null }) {


    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleImgNav = (action: string | number) => {

        if (typeof (action) === "number") {
            setCurrentIndex(action)
            return;
        }

        setCurrentIndex((oldCurrentIndex) => action === "next" ? ++oldCurrentIndex : --oldCurrentIndex)

    }

    const videoPlayerRef = useRef<null | HTMLVideoElement>(null);

    const handlePlay = () => {
        videoPlayerRef?.current?.play()
    }

    const handlePause = () => {
        videoPlayerRef?.current?.pause()
    }

    const { isMobile, isDesktop, tokens } = useResponsiveTheme()

    return (
        <Box
            onMouseEnter={() => {
                handlePlay()
            }}
            onMouseLeave={() => {
                if (videoPlayerRef.current !== null && videoPlayerRef.current.currentTime) {
                    videoPlayerRef.current.currentTime = 0
                }
                handlePause()
            }}
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                scrollSnapType: 'x mandatory'
            }}

        >
            {
                mediaType === "video" && <Fab
                    onClick={handlePlay}
                    sx={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        "&:hover": {
                        }
                    }}
                    size="small"
                >
                    {
                        videoPlayerRef?.current?.paused ? <PlayArrow className="text-white/80" radius={2} /> : <Pause className="text-white/80" radius={2} />
                    }

                </Fab>
            }

            {
                mediaType === 'image' ?
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: 'transform 0.5s ease',
                        }}
                    >
                        {media.map((src, index) => (
                            <Box
                                key={src}
                                sx={{
                                    minWidth: '100%',
                                    height: '100%',
                                    position: 'relative',
                                }}
                            >
                                <Image
                                    src={src}
                                    fill
                                    sizes={isMobile ? "100vh" : "30vh"}
                                    alt={`Picture ${index + 1}`}
                                    unoptimized
                                    style={{ objectFit: 'cover' }}
                                />
                            </Box>
                        ))}
                    </Box>
                    :
                    <video
                        src={media[currentIndex]}
                        className="absolute inset-0 object-fill z-0 -translate-y-1/4"
                        ref={videoPlayerRef}
                    />
            }



            <Box
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    zIndex: 20,
                    gap: '2px'
                }}
            >
                {
                    Array.from({ length: media?.length }).map((elm, index) =>
                        <Box
                            key={index}
                            onClick={() => {
                                handleImgNav(index)
                            }}
                            sx={{
                                backgroundColor: index === currentIndex ? tokens.carousel.active : tokens.carousel.inactive,
                                height: 8,
                                width: 8,
                                borderRadius: '50%',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease',
                                '&:hover': {
                                    backgroundColor: index === currentIndex ? '#0f172a' : '#94a3b8'
                                }
                            }}
                        />
                    )
                }
            </Box>
        </Box>
    )

}