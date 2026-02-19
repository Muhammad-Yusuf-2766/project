/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade'

type As = keyof JSX.IntrinsicElements

interface RevealProps<T extends As = 'div'> {
	/** HTML tag to render — defaults to 'div'. Use 'h1', 'p', 'section', etc. */
	as?: T
	/** Animation direction — defaults to 'up' */
	animation?: Direction
	/** Delay before animation starts, e.g. '200ms' or '0.2s' */
	delay?: string
	/** Animation duration, e.g. '0.6s'. Defaults to '0.7s' */
	duration?: string
	className?: string
	children: React.ReactNode
}

export function Reveal<T extends As = 'div'>({
	as,
	animation = 'up',
	delay = '0s',
	duration = '1.2s',
	className = '',
	children,
	...rest
}: RevealProps<T> &
	Omit<React.ComponentPropsWithoutRef<T>, keyof RevealProps<T>>) {
	const Tag = (as ?? 'div') as As

	return (
		<Tag
			className={`sr-hidden ${className}`.trim()}
			data-sr-animation={animation}
			style={
				{
					'--sr-delay': delay,
					'--sr-duration': duration,
				} as React.CSSProperties
			}
			{...(rest as any)}
		>
			{children}
		</Tag>
	)
}
