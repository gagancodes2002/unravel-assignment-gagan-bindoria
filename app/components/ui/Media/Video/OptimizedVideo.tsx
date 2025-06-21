import { Box, Skeleton } from '@mui/material';
import React, { forwardRef, useRef, useImperativeHandle, MediaHTMLAttributes, useState, useEffect } from 'react';

type Props = {
    height: number | string;
    width: number | string;
    src: string;
    muted?: boolean
    loop?: boolean
} & MediaHTMLAttributes<HTMLVideoElement>;

const OptimizedVideo = forwardRef<HTMLVideoElement, Props>(({ src, width, height, className, muted, loop, ...params }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useImperativeHandle(ref, () => videoRef.current!, []);
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();

    }, []);

    const handleLoadedData = () => {
        setIsLoaded(true);
    }


    return (

        <Box
            ref={containerRef}
            sx={{
                width,
                height: height === 'auto' ? undefined : height,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 1,
                backgroundColor: 'red.100',
            }}
            className={className}
        >

            {
                !isInView ? (
                    <Skeleton
                        variant='rectangular'
                        width={'100%'}
                        height={height === 'auto' ? 200 : height}
                        sx={{
                            borderRadius: 1,
                        }}
                    />
                ) : (

                    <>
                        {!isLoaded && (
                            <Skeleton
                                variant='rectangular'
                                width="100%"
                                height={height === 'auto' ? 200 : height}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: 1,
                                    borderRadius: 1,
                                }}

                            />
                        )}


                        <Box
                            component={"video"}
                            src={src}
                            ref={ref}
                            preload='metadata'
                            muted={muted}
                            onLoadedData={handleLoadedData}
                            {...params}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                opacity: isLoaded ? 1 : 0,
                                transition: 'opacity 0.3s ease-in-out'
                            }}
                        >

                        </Box>

                    </>
                )
            }

        </Box>

        // <video
        //     loop
        //     muted={muted}
        //     ref={internalRef} src={src}
        //     {...params}
        // />
    )


});

export default OptimizedVideo;