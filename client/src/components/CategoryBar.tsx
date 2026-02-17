import { Filter, Package } from 'lucide-react'
import { CategoryType } from '../types'

type Props = {
	categories: CategoryType[]
	selectedCategory: string
	onChange: (v: string) => void
	placeholder?: string
	className?: string
}

const CategoryBar = ({ categories, selectedCategory, onChange }: Props) => {
	const Icon =
		categories.find(c => c.slug === selectedCategory)?.icon ?? Package
	return (
		<div className='bg-card rounded-lg shadow-md md:p-6 p-3 sticky top-24'>
			<div className='flex items-center mb-4'>
				<Filter className='w-5 h-5 mr-2 text-primary' />
				<h2 className='md:text-lg text-base font-semibold text-text'>
					Kategoriyalar
				</h2>
			</div>

			{/* md dan kichik: dropdown menu (button + panel) */}
			<div className='md:hidden'>
				<details className='group'>
					<summary className='list-none flex items-center justify-between w-full px-4 py-2 rounded-lg border-border bg-primary text-light cursor-pointer'>
						<div className='flex items-center gap-x-2'>
							<Icon className='w-5 h-5' />
							<span className='font-medium text-sm'>
								{categories.find(c => c.slug === selectedCategory)?.title ??
									'Barchasi'}
							</span>
						</div>

						{/* simple chevron */}
						<svg
							className='w-4 h-4 transition-transform group-open:rotate-180'
							viewBox='0 0 20 20'
							fill='currentColor'
							aria-hidden='true'
						>
							<path
								fillRule='evenodd'
								d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z'
								clipRule='evenodd'
							/>
						</svg>
					</summary>

					<div className='mt-3 space-y-2 text-text'>
						{categories.map(category => {
							const Icon = category.icon
							return (
								<button
									key={category._id}
									onClick={() => {
										onChange(category.slug)
										// menu ni yopish:
										const details = document.activeElement?.closest(
											'details',
										) as HTMLDetailsElement | null
										if (details) details.open = false
									}}
									className={`w-full flex items-center px-4 py-2 rounded-lg transition-all ${
										selectedCategory === category.slug
											? 'bg-primary text-white shadow-md'
											: 'hover:bg-light border border-transparent'
									}`}
								>
									<Icon className='w-5 h-5 mr-3' />
									<span className='font-medium text-sm'>{category.title}</span>
								</button>
							)
						})}
					</div>
				</details>
			</div>

			{/* md va katta: hozirgi button list (o‘zgarmaydi) */}
			<div className='hidden md:block space-y-2 text-text'>
				{categories.map(category => {
					const Icon = category.icon
					return (
						<button
							key={category._id}
							onClick={() => onChange(category.slug)}
							className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
								selectedCategory === category.slug
									? 'bg-primary text-white shadow-md'
									: 'hover:bg-light'
							}`}
						>
							<Icon className='w-5 h-5 mr-3' />
							<span className='font-medium'>{category.title}</span>
						</button>
					)
				})}
			</div>
		</div>
	)
}

export default CategoryBar

export const DropdownCategoryBar = ({
	categories,
	selectedCategory,
	onChange,
}: Props) => {
	return (
		<div className='w-full'>
			<details className='group relative'>
				<summary className='list-none flex items-center justify-between w-full px-4 py-3 rounded-lg border-border bg-primary text-light cursor-pointer'>
					<div className='flex items-center gap-x-2'>
						<span className='font-medium'>
							{categories.find(c => c.slug === selectedCategory)?.title ??
								'Barchasi'}
						</span>
					</div>

					<svg
						className='w-4 h-4 transition-transform group-open:rotate-180'
						viewBox='0 0 20 20'
						fill='currentColor'
						aria-hidden='true'
					>
						<path
							fillRule='evenodd'
							d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z'
							clipRule='evenodd'
						/>
					</svg>
				</summary>

				{/* ✅ dropdown panel: flow’dan chiqadi */}
				<div
					className='
            absolute left-0 top-full mt-2 w-64
            rounded-xl border border-border bg-card shadow-xl
            p-2 space-y-1 z-50
          '
				>
					{categories.map(category => {
						const Icon = category.icon
						return (
							<button
								key={category._id}
								onClick={e => {
									onChange(category.slug)

									// ✅ shu detailsni yopish (eng ishonchli usul)
									const details = e.currentTarget.closest(
										'details',
									) as HTMLDetailsElement | null
									if (details) details.open = false
								}}
								className={`w-full flex items-center px-3 py-2 rounded-lg transition-all ${
									selectedCategory === category.slug
										? 'bg-primary text-white shadow-md'
										: 'hover:bg-light'
								}`}
							>
								<Icon className='w-5 h-5 mr-3' />
								<span className='font-medium'>{category.title}</span>
							</button>
						)
					})}
				</div>
			</details>
		</div>
	)
}

type FilterProps = {
	filters: string[]
	selectedFilter: string
	onChange: (v: string) => void
}

export const DropdownFilterBar = ({
	filters,
	selectedFilter,

	onChange,
}: FilterProps) => {
	return (
		<div className='w-full'>
			<details className='group relative'>
				<summary className='list-none flex items-center justify-between w-full px-4 py-3 rounded-lg border-border bg-primary text-light cursor-pointer'>
					<div className='flex items-center gap-x-2'>
						<span className='font-medium'>
							{filters.find(c => c === selectedFilter) ?? 'Yangilari'}
						</span>
					</div>

					<svg
						className='w-4 h-4 transition-transform group-open:rotate-180'
						viewBox='0 0 20 20'
						fill='currentColor'
						aria-hidden='true'
					>
						<path
							fillRule='evenodd'
							d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z'
							clipRule='evenodd'
						/>
					</svg>
				</summary>

				{/* ✅ dropdown panel: flow’dan chiqadi */}
				<div
					className='
            absolute left-0 top-full mt-2 w-64
            rounded-xl border border-border bg-card shadow-xl
            p-2 space-y-1 z-50
          '
				>
					{filters.map(value => {
						return (
							<button
								key={value}
								onClick={e => {
									onChange(value)

									// ✅ shu detailsni yopish (eng ishonchli usul)
									const details = e.currentTarget.closest(
										'details',
									) as HTMLDetailsElement | null
									if (details) details.open = false
								}}
								className={`w-full flex items-center px-3 py-2 rounded-lg transition-all ${
									selectedFilter === value
										? 'bg-primary text-white shadow-md'
										: 'hover:bg-light'
								}`}
							>
								<span className='font-medium'>{value}</span>
							</button>
						)
					})}
				</div>
			</details>
		</div>
	)
}
