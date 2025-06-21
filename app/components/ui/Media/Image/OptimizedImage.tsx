import Image from 'next/image'
import { Box, Skeleton } from '@mui/material'
import { useState } from 'react'

interface OptimizedImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    fill?: boolean
    priority?: boolean
    sizes?: string
    className?: string
    style?: React.CSSProperties
    onLoad?: () => void
    onError?: () => void
}

export default function OptimizedImage({
    src,
    alt,
    width,
    height,
    fill = false,
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    className,
    style,
    onLoad,
    onError
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const handleLoad = () => {
        setIsLoading(false)
        onLoad?.()
    }

    const handleError = () => {
        setIsLoading(false)
        setHasError(true)
        onError?.()
    }

    if (hasError) {
        return (
            <Box
                sx={{
                    width: fill ? '100%' : width,
                    height: fill ? '100%' : height,
                    bgcolor: 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1
                }}
            >
                Failed to load image
            </Box>
        )
    }

    return (
        <Box sx={{ position: 'relative', width: fill ? '100%' : width, height: fill ? '100%' : height }}>
            {isLoading && (
                <Skeleton
                    variant="rectangular"
                    width={fill ? '100%' : width}
                    height={fill ? '100%' : height}
                    sx={{ position: fill ? 'absolute' : 'static', borderRadius: 1 }}
                />
            )}
            <Image
                src={src}
                alt={alt}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                fill={fill}
                priority={priority}
                sizes={sizes}
                className={className}
                style={{
                    ...style,
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease-in-out'
                }}
                onLoad={handleLoad}
                onError={handleError}
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
        </Box>
    )
}