import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import SearchInput from '../../../components/SearchInput'

/* ------------------------------------------------------------------ */
/*  Dropdown (pure Tailwind, no library)                               */
/* ------------------------------------------------------------------ */

interface DropdownProps {
	options: { value: string; label: string }[]
	selected: string
	onChange: (value: string) => void
}

function Dropdown({ options, selected, onChange }: DropdownProps) {
	const [open, setOpen] = useState(false)
	const selectedLabel =
		options.find(o => o.value === selected)?.label ?? selected

	return (
		<div className='relative'>
			<button
				type='button'
				onClick={() => setOpen(v => !v)}
				className='flex h-10 w-full items-center justify-between rounded-lg border border-input bg-primary px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-light'
			>
				<span className='truncate'>{selectedLabel}</span>
				<ChevronDown
					className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
				/>
			</button>

			{open && (
				<>
					<div className='fixed inset-0 z-40' onClick={() => setOpen(false)} />
					<ul className='absolute z-50 mt-1 w-full rounded-lg border border-border bg-card shadow-lg py-1'>
						{options.map(opt => (
							<li key={opt.value}>
								<button
									type='button'
									onClick={() => {
										onChange(opt.value)
										setOpen(false)
									}}
									className={`w-full px-3 py-2 text-left text-sm hover:bg-muted hover:bg-light text-foreground rounded-lg ${
										selected === opt.value
											? 'bg-light text-foreground font-medium'
											: ''
									}`}
								>
									{opt.label}
								</button>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	)
}

type Props = {
	header?: string
	searchQuery: string
	filter: string
	sort: string
	filterOptions: { value: string; label: string }[]
	sortOptions: { value: string; label: string }[]
	onSearchChange: (value: string) => void
	onFilterChange: (value: string) => void
	onSortChange: (value: string) => void
}

const TableHeaders = ({
	header,
	searchQuery,
	filter,
	filterOptions,
	sort,
	sortOptions,
	onSearchChange,
	onFilterChange,
	onSortChange,
}: Props) => {
	return (
		<div className='p-6 border-b border-border grid grid-cols-1 lg:grid-cols-2 items-center gap-4'>
			<h2 className='text-2xl font-bold text-foreground'>
				{header ?? 'Natijalar'}
			</h2>
			{/* Filters */}
			<div className='grid grid-cols-1 sm:grid-cols-4 gap-4 items-center'>
				<SearchInput
					value={searchQuery}
					onChange={onSearchChange}
					placeholder='Ism, telefon, manzil...'
					className='sm:col-span-2'
				/>
				<Dropdown
					options={filterOptions}
					selected={filter || ''}
					onChange={onFilterChange}
				/>
				<Dropdown
					options={sortOptions}
					selected={sort}
					onChange={onSortChange}
				/>
			</div>
		</div>
	)
}

export default TableHeaders
