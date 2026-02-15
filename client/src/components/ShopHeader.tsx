import SearchInput from './SearchInput'

type ButtonProps = {
	active?: boolean
	title: string
	onClick: () => void
}

const FilterButton = ({ title, onClick, active }: ButtonProps) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className={`w-full items-center px-3 py-3 text-base border border-border rounded-lg ring-1 ring-text-muted font-semibold ${
				active
					? 'bg-primary text-light ring-0 border-none'
					: 'bg-card text-text'
			}`}
		>
			{title}
		</button>
	)
}

type ShopPageHeaderProps = {
	searchQuery: string
	saleFilter: string
	setSearchQuery: (value: string) => void
	setSaleFilter: (value: string) => void
}

const ShopPageHeader = ({
	searchQuery,
	saleFilter,
	setSearchQuery,
	setSaleFilter,
}: ShopPageHeaderProps) => {
	return (
		<div>
			<div className='grid grid-cols-2 max-md:grid-cols-1 gap-4 items-center'>
				<SearchInput value={searchQuery} onChange={setSearchQuery} />

				<div className='w-full grid grid-cols-4 gap-2'>
					<FilterButton
						title='Barchasi'
						onClick={() => setSaleFilter('all')}
						active={saleFilter === 'all'}
					/>

					<FilterButton
						title='Sale'
						onClick={() => setSaleFilter('sale')}
						active={saleFilter === 'sale'}
					/>

					<FilterButton
						title='Yangi'
						onClick={() => setSaleFilter('new')}
						active={saleFilter === 'new'}
					/>

					<FilterButton
						title='Top'
						onClick={() => setSaleFilter('top')}
						active={saleFilter === 'top'}
					/>
				</div>
			</div>
		</div>
	)
}

export default ShopPageHeader
