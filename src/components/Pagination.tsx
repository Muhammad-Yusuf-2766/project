import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
	siblingsCount?: number
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	siblingsCount = 1,
}: PaginationProps) {
	const range = (start: number, end: number) => {
		return Array.from({ length: end - start + 1 }, (_, i) => start + i)
	}

	const generatePageNumbers = () => {
		const totalPageNumbers = siblingsCount * 2 + 5

		if (totalPages <= totalPageNumbers) {
			return range(1, totalPages)
		}

		const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1)
		const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages)

		const showLeftDots = leftSiblingIndex > 2
		const showRightDots = rightSiblingIndex < totalPages - 1

		if (!showLeftDots && showRightDots) {
			const leftRange = range(1, 3 + 2 * siblingsCount)
			return [...leftRange, 'dots-right', totalPages]
		}

		if (showLeftDots && !showRightDots) {
			const rightRange = range(totalPages - (2 + 2 * siblingsCount), totalPages)
			return [1, 'dots-left', ...rightRange]
		}

		if (showLeftDots && showRightDots) {
			const middleRange = range(leftSiblingIndex, rightSiblingIndex)
			return [1, 'dots-left', ...middleRange, 'dots-right', totalPages]
		}

		return range(1, totalPages)
	}

	const pages = generatePageNumbers()

	if (totalPages <= 1) return null

	return (
		<div className='flex items-center justify-center gap-1 sm:gap-2'>
			{/* First Page Button - Hidden on mobile */}
			<button
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
				className='hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-lg bg-card border border-border text-text-muted hover:bg-light hover:text-text transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card'
				aria-label='Birinchi sahifa'
			>
				<ChevronsLeft className='w-4 h-4' />
			</button>

			{/* Previous Button */}
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-lg bg-card border border-border text-text-muted hover:bg-light hover:text-text transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card'
				aria-label='Oldingi sahifa'
			>
				<ChevronLeft className='w-4 h-4' />
			</button>

			{/* Page Numbers */}
			<div className='flex items-center gap-1 sm:gap-2'>
				{pages.map((page, index) => {
					if (typeof page === 'string') {
						return (
							<span
								key={page}
								className='w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-text-muted text-sm'
							>
								...
							</span>
						)
					}

					const isActive = page === currentPage

					return (
						<button
							key={index}
							onClick={() => onPageChange(page)}
							className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm sm:text-base font-medium transition-colors ${
								isActive
									? 'bg-primary text-white shadow-md'
									: 'bg-card border border-border text-text hover:bg-light'
							}`}
							aria-label={`Sahifa ${page}`}
							aria-current={isActive ? 'page' : undefined}
						>
							{page}
						</button>
					)
				})}
			</div>

			{/* Next Button */}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-lg bg-card border border-border text-text-muted hover:bg-light hover:text-text transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card'
				aria-label='Keyingi sahifa'
			>
				<ChevronRight className='w-4 h-4' />
			</button>

			{/* Last Page Button - Hidden on mobile */}
			<button
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
				className='hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-lg bg-card border border-border text-text-muted hover:bg-light hover:text-text transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card'
				aria-label='Oxirgi sahifa'
			>
				<ChevronsRight className='w-4 h-4' />
			</button>
		</div>
	)
}
