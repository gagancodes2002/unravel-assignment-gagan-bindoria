import { useRef, useEffect } from "react"

export function useThrottledScroll(callback: () => void, delay: number = 100) {
    const lastCall = useRef<number>(0)

    useEffect(() => {
        const handleScroll = () => {
            const now = Date.now()
            if (now - lastCall.current >= delay) {
                callback()
                lastCall.current = now
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [callback, delay])
}