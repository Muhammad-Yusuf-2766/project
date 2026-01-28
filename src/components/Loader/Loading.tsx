import { Loader2 } from 'lucide-react'

interface LoadingProps {
	variant?: 'spinner' | 'dots' | 'brand' | 'skeleton' | 'overlay'
	size?: 'sm' | 'md' | 'lg'
	text?: string
	fullScreen?: boolean
	className?: string
}

export default function Loading({
	variant = 'spinner',
	size = 'md',
	text,
	fullScreen = false,
	className = '',
}: LoadingProps) {
	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-8 h-8',
		lg: 'w-14 h-14',
	}

	const textSizeClasses = {
		sm: 'text-xs',
		md: 'text-sm',
		lg: 'text-base',
	}

	const containerClasses = fullScreen
		? 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center'
		: 'flex items-center justify-center'

	// Spinner variant
	if (variant === 'spinner') {
		return (
			<div className={`${containerClasses} ${className}`}>
				<div className='flex flex-col items-center gap-3'>
					<Loader2 className={`${sizeClasses[size]} animate-spin`} />
					{text && (
						<p className={`text-text-muted ${textSizeClasses[size]}`}>{text}</p>
					)}
				</div>
			</div>
		)
	}

	// Dots variant
	if (variant === 'dots') {
		const dotSize = {
			sm: 'w-1.5 h-1.5',
			md: 'w-2.5 h-2.5',
			lg: 'w-3.5 h-3.5',
		}

		return (
			<div className={`${containerClasses} ${className}`}>
				<div className='flex flex-col items-center gap-3'>
					<div className='flex items-center gap-1.5'>
						<div
							className={`${dotSize[size]} bg-primary rounded-full animate-bounce`}
							style={{ animationDelay: '0ms' }}
						/>
						<div
							className={`${dotSize[size]} bg-primary rounded-full animate-bounce`}
							style={{ animationDelay: '150ms' }}
						/>
						<div
							className={`${dotSize[size]} bg-primary rounded-full animate-bounce`}
							style={{ animationDelay: '300ms' }}
						/>
					</div>
					{text && (
						<p className={`text-text-muted ${textSizeClasses[size]}`}>{text}</p>
					)}
				</div>
			</div>
		)
	}

	// Brand variant (with logo)
	if (variant === 'brand') {
		return (
			<div className={`${containerClasses} ${className}`}>
				<div className='flex flex-col items-center gap-4'>
					<div className='relative'>
						<div className='absolute inset-0 bg-primary/20 rounded-full animate-ping' />
						<div className='relative bg-card p-4 rounded-full shadow-lg'>
							<img
								src='/ansor_logo_180px.png'
								className={`${sizeClasses[size]} text-primary`}
							/>
						</div>
					</div>
					<div className='flex items-center gap-1'>
						<span className='text-lg sm:text-xl font-bold text-text'>
							Ansor
						</span>
						<span className='text-lg sm:text-xl font-bold text-primary'>
							Market
						</span>
					</div>
					{text && (
						<p className={`text-text-muted ${textSizeClasses[size]}`}>{text}</p>
					)}
				</div>
			</div>
		)
	}

	// Overlay variant (for buttons, cards, etc.)
	if (variant === 'overlay') {
		return (
			<div
				className={`absolute inset-0 bg-card/80 backdrop-blur-[2px] flex items-center justify-center rounded-inherit z-10 ${className}`}
			>
				<Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
			</div>
		)
	}

	// Skeleton variant
	if (variant === 'skeleton') {
		return (
			<div className={`animate-pulse ${className}`}>
				<div className='bg-border rounded-lg h-full w-full' />
			</div>
		)
	}

	return null
}

// Skeleton components for specific use cases
export function ProductCardSkeleton() {
	return (
		<div className='bg-card rounded-lg sm:rounded-xl shadow-md overflow-hidden animate-pulse'>
			<div className='h-28 sm:h-36 md:h-40 bg-border' />
			<div className='p-2.5 sm:p-3 md:p-4 space-y-2 sm:space-y-3'>
				<div className='h-4 bg-border rounded w-3/4' />
				<div className='h-3 bg-border rounded w-1/2' />
				<div className='h-4 bg-border rounded w-1/3' />
				<div className='h-8 sm:h-10 bg-border rounded' />
			</div>
		</div>
	)
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
	return (
		<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
			{Array.from({ length: count }).map((_, i) => (
				<ProductCardSkeleton key={i} />
			))}
		</div>
	)
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
	return (
		<tr className='animate-pulse'>
			{Array.from({ length: columns }).map((_, i) => (
				<td key={i} className='px-4 sm:px-6 py-3 sm:py-4'>
					<div className='h-4 bg-border rounded w-full' />
				</td>
			))}
		</tr>
	)
}

export function TableSkeleton({
	rows = 5,
	columns = 5,
}: {
	rows?: number
	columns?: number
}) {
	return (
		<div className='bg-card rounded-xl shadow-lg overflow-hidden'>
			<div className='p-4 sm:p-6 border-b border-border'>
				<div className='h-6 bg-border rounded w-48 animate-pulse' />
			</div>
			<table className='w-full'>
				<thead className='bg-light'>
					<tr>
						{Array.from({ length: columns }).map((_, i) => (
							<th key={i} className='px-4 sm:px-6 py-3 sm:py-4'>
								<div className='h-4 bg-border rounded w-20 animate-pulse' />
							</th>
						))}
					</tr>
				</thead>
				<tbody className='divide-y divide-border'>
					{Array.from({ length: rows }).map((_, i) => (
						<TableRowSkeleton key={i} columns={columns} />
					))}
				</tbody>
			</table>
		</div>
	)
}

export function ProfileSkeleton() {
	return (
		<div className='bg-card rounded-2xl shadow-md p-6 animate-pulse'>
			<div className='flex flex-col items-center mb-6'>
				<div className='w-24 h-24 bg-border rounded-full mb-4' />
				<div className='h-5 bg-border rounded w-32 mb-2' />
				<div className='h-4 bg-border rounded w-40' />
			</div>
			<div className='space-y-3'>
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className='h-12 bg-border rounded-xl' />
				))}
			</div>
		</div>
	)
}

export function CartItemSkeleton() {
	return (
		<div className='bg-card rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 md:p-6 animate-pulse'>
			<div className='flex gap-3 sm:gap-4'>
				<div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-border rounded-lg sm:rounded-xl' />
				<div className='flex-1 space-y-2 sm:space-y-3'>
					<div className='h-4 sm:h-5 bg-border rounded w-3/4' />
					<div className='h-4 bg-border rounded w-1/3' />
					<div className='flex justify-between items-center mt-4'>
						<div className='h-8 sm:h-9 bg-border rounded w-24' />
						<div className='h-5 bg-border rounded w-20' />
					</div>
				</div>
			</div>
		</div>
	)
}

export function PageLoading({ text = 'Yuklanmoqda...' }: { text?: string }) {
	return (
		<div className='min-h-[60vh] flex items-center justify-center'>
			<Loading variant='brand' size='lg' text={text} />
		</div>
	)
}
