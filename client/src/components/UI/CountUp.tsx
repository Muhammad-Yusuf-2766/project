import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
	end: number
	duration?: number
	suffix?: string
	className?: string
}

export function CountUp({
	end,
	duration = 2000,
	suffix = '',
	className = '',
}: CountUpProps) {
	const [count, setCount] = useState(0)
	const [hasAnimated, setHasAnimated] = useState(false)
	const elementRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const element = elementRef.current
		if (!element || hasAnimated) return

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting && !hasAnimated) {
						setHasAnimated(true)
						animateCount()
						observer.unobserve(entry.target)
					}
				})
			},
			{
				threshold: 0.3,
			},
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [hasAnimated])

	const animateCount = () => {
		const startTime = Date.now()
		const endTime = startTime + duration

		const updateCount = () => {
			const now = Date.now()
			const progress = Math.min((now - startTime) / duration, 1)

			// Easing function (easeOutExpo) for smooth deceleration
			const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

			const currentCount = Math.floor(easeProgress * end)
			setCount(currentCount)

			if (now < endTime) {
				requestAnimationFrame(updateCount)
			} else {
				setCount(end)
			}
		}

		requestAnimationFrame(updateCount)
	}

	return (
		<span ref={elementRef} className={className}>
			{count.toLocaleString()}
			{suffix}
		</span>
	)
}
