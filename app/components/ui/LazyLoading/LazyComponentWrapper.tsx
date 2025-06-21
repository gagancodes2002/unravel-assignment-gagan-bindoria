import { ReactNode, Suspense, lazy, ComponentType } from 'react'
import { Box, Skeleton, CircularProgress } from '@mui/material'
import { useLazyLoading } from '@/lib/utils/hooks/useLazyLoading'

interface LazyComponentWrapperProps {
    children: ReactNode
    fallback?: ReactNode
    height?: number | string
    width?: number | string
    threshold?: number
    rootMargin?: string
    maxWidth: any
}

export function LazyComponentWrapper({
    children,
    fallback,
    height = 200,
    width = '100%',
    threshold = 0,
    rootMargin = '100px',
    maxWidth
}: LazyComponentWrapperProps) {
    const { elementRef, isVisible } = useLazyLoading({
        threshold,
        rootMargin,
        triggerOnce: true,
    })

    const defaultFallback = (
        <Box
            sx={{
                width,
                height,
                maxWidth: maxWidth,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Skeleton variant='rectangular' width={width} height={height} sx={{
                width,
                maxWidth
            }} />
        </Box>
    )

    return (
        <Box ref={elementRef} sx={{ width, height }}>
            {isVisible ? children : (fallback || defaultFallback)}
        </Box>
    )
}