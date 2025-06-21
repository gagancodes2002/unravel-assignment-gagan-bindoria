
import { useEffect, useRef, useState } from 'react'

interface UseLazyLoadingOptions {
    threshold?: number
    rootMargin?: string
    triggerOnce?: boolean
}

export function useLazyLoading({
    threshold = 0,
    rootMargin = '50px',
    triggerOnce = true
}: UseLazyLoadingOptions = {}) {
    const [isVisible, setIsVisible] = useState(false)
    const [hasTriggered, setHasTriggered] = useState(false)
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                const isIntersecting = entry.isIntersecting

                if (isIntersecting && (!triggerOnce || !hasTriggered)) {
                    setIsVisible(true)
                    setHasTriggered(true)
                } else if (!triggerOnce && !isIntersecting) {
                    setIsVisible(false)
                }
            },
            {
                threshold,
                rootMargin
            }
        )

        observer.observe(element)

        return () => {
            observer.unobserve(element)
        }
    }, [threshold, rootMargin, triggerOnce, hasTriggered])

    return { elementRef, isVisible }
}