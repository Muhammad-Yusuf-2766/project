import { Filter, Package, Search } from 'lucide-react'
import { useState } from 'react'
import Pagination from '../../components/Pagination'
import ProductCard from '../../components/ProductCard'
import { categoriesPage, mockProductsPage } from '../../constants'
import { FilterCategoryType } from '../../types'

type SaleFilter = 'all' | 'sale' | 'new' | 'top'

export default function Products() {
	const [selectedCategory, setSelectedCategory] =
		useState<FilterCategoryType>('all')
	const [searchQuery, setSearchQuery] = useState('')
	const [saleFilter, setSaleFilter] = useState<SaleFilter>('all')

	const filteredProducts = mockProductsPage.filter(product => {
		const matchesCategory =
			selectedCategory === 'all' || product.category === selectedCategory
		const matchesSearch =
			product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.description.toLowerCase().includes(searchQuery.toLowerCase())
		const matchesSaleFilter =
			saleFilter === 'all' ||
			(saleFilter === 'sale' && product.originalPrice !== undefined) ||
			(saleFilter === 'new' && product.createdAt)
		return matchesCategory && matchesSearch && matchesSaleFilter
	})

	// ===== Pagination testing ===== //
	const [currentPage, setCurrentPage] = useState(1)
	const totalPages = 10
	const itemsPerPage = 2

	// Calculate which products to show
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentProducts = filteredProducts.slice(startIndex, endIndex)

	return (
		<div className='min-h-screen overflow-hidden'>
			<div className='bg-secondary text-white md:py-12 py-6'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h1 className='md:text-4xl text-2xl font-bold mb-4'>
						Bizning Mahsulotlar
					</h1>
					<p className='md:text-lg text-base'>
						Eng sara halol mahsulotlar — bir joyda
					</p>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:text-lg text-base'>
				<div className='mb-8'>
					{/* Filter section */}
					<div className='grid grid-cols-2 max-md:grid-cols-1 gap-4 items-center'>
						<div className='relative flex-1'>
							<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
							<input
								type='text'
								placeholder='Mahsulotlarni qidirish...'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='w-full pl-12 pr-4 md:py-3 py-2 border border-border rounded-lg focus:ring-1 focus:ring-secondary focus:outline-none bg-card text-text'
							/>
						</div>

						<div className='w-full grid grid-cols-4 gap-2'>
							<button
								onClick={() => setSaleFilter('all')}
								className={`w-full md:px-5 md:py-3 p-2 rounded-lg transition-all text-base ${
									saleFilter === 'all'
										? 'bg-primary text-white shadow-md'
										: 'bg-card text-text border border-border hover:bg-light'
								}`}
							>
								Barchasi
							</button>

							<button
								onClick={() => setSaleFilter('sale')}
								className={`w-full md:px-5 md:py-3 p-2 rounded-lg transition-all ${
									saleFilter === 'sale'
										? 'bg-primary text-white shadow-md'
										: 'bg-card text-text border border-border hover:bg-light'
								}`}
							>
								Sale
							</button>

							<button
								onClick={() => setSaleFilter('new')}
								className={`w-full md:px-5 md:py-3 p-2 rounded-lg transition-all ${
									saleFilter === 'new'
										? 'bg-primary text-white shadow-md'
										: 'bg-card text-text border border-border hover:bg-light'
								}`}
							>
								Yangi
							</button>

							<button
								onClick={() => setSaleFilter('top')}
								className={`w-full md:px-5 md:py-3 p-2 rounded-lg transition-all ${
									saleFilter === 'top'
										? 'bg-primary text-white shadow-md'
										: 'bg-card text-text border border-border hover:bg-light'
								}`}
							>
								Top
							</button>
						</div>
					</div>
				</div>

				{/* Category & product render section */}
				<div className='flex flex-col lg:flex-row gap-8'>
					<div className='lg:w-64 shrink-0'>
						<div className='bg-card rounded-lg shadow-md md:p-6 p-3 sticky top-24'>
							<div className='flex items-center mb-4'>
								<Filter className='w-5 h-5 mr-2 text-primary' />
								<h2 className='text-lg font-semibold text-text'>
									Kategoriyalar
								</h2>
							</div>

							{/* md dan kichik: dropdown menu (button + panel) */}
							<div className='md:hidden'>
								<details className='group'>
									<summary className='list-none flex items-center justify-between w-full px-4 py-2 rounded-lg border-border bg-primary text-light cursor-pointer'>
										<span className='font-medium'>
											{categoriesPage.find(c => c.id === selectedCategory)
												?.name ?? 'Barchasi'}
										</span>

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
										{categoriesPage.map(category => {
											const Icon = category.icon
											return (
												<button
													key={category.id}
													onClick={() => {
														setSelectedCategory(
															category.id as FilterCategoryType,
														)
														// menu ni yopish:
														const details = document.activeElement?.closest(
															'details',
														) as HTMLDetailsElement | null
														if (details) details.open = false
													}}
													className={`w-full flex items-center px-4 py-2 rounded-lg transition-all ${
														selectedCategory === category.id
															? 'bg-primary text-white shadow-md'
															: 'hover:bg-light border border-transparent'
													}`}
												>
													<Icon className='w-5 h-5 mr-3' />
													<span className='font-medium'>{category.name}</span>
												</button>
											)
										})}
									</div>
								</details>
							</div>

							{/* md va katta: hozirgi button list (o‘zgarmaydi) */}
							<div className='hidden md:block space-y-2 text-text'>
								{categoriesPage.map(category => {
									const Icon = category.icon
									return (
										<button
											key={category.id}
											onClick={() =>
												setSelectedCategory(category.id as FilterCategoryType)
											}
											className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
												selectedCategory === category.id
													? 'bg-primary text-white shadow-md'
													: 'hover:bg-light'
											}`}
										>
											<Icon className='w-5 h-5 mr-3' />
											<span className='font-medium'>{category.name}</span>
										</button>
									)
								})}
							</div>
						</div>
					</div>

					<div className='flex-1'>
						<div className='mb-4 flex items-center justify-between'>
							<p className='text-text-secondary'>
								Ko'rsatilmoqda:{' '}
								<span className='font-semibold text-text'>
									{filteredProducts.length}
								</span>{' '}
								mahsulot
							</p>
						</div>

						{currentProducts.length === 0 ? (
							<div className='bg-card rounded-lg shadow-md p-12 text-center'>
								<Package className='w-16 h-16 text-text-muted mx-auto mb-4' />
								<h3 className='text-xl font-semibold text-text mb-2'>
									Mahsulot topilmadi
								</h3>
								<p className='text-text-secondary'>
									Qidiruv yoki filtrlarni o'zgartirib ko'ring
								</p>
							</div>
						) : (
							<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2'>
								{filteredProducts.map(product => (
									<ProductCard key={product.productId} product={product} />
								))}
							</div>
						)}

						{/* Pagination */}
						<div className='mt-8 sm:mt-12'>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={setCurrentPage}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
