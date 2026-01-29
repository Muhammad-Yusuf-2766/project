import { useQuery } from '@tanstack/react-query'
import { Package } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import CategoryBar from '../../components/CategoryBar'
import { ProductGridSkeleton } from '../../components/Loader/Loading'
import ProductCard from '../../components/ProductCard'
import SearchInput from '../../components/SearchInput'
import { categoriesPage } from '../../constants'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { fetchProducts, Sort } from '../../service/apiProducts'

type SaleFilter = 'all' | 'sale' | 'new' | 'top'

export default function Products() {
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedSearchQuery = useDebouncedValue(searchQuery, 500)

	const [category, setCategory] = useState<string>('all')
	const [sort] = useState<Sort>('newest')
	const [page, setPage] = useState(1)
	const pageSize = 12
	const [saleFilter, setSaleFilter] = useState<SaleFilter>('all')

	// qaysi param o'zgarsa page 1 bo'lsin (UX)
	useEffect(() => {
		setPage(1)
	}, [debouncedSearchQuery, category, sort])

	const params = useMemo(
		() => ({
			searchQuery: debouncedSearchQuery,
			category,
			sort,
			page,
			pageSize,
		}),
		[debouncedSearchQuery, category, sort, page, pageSize],
	)

	const { data, isLoading, isError } = useQuery({
		queryKey: ['products', params],
		queryFn: () => fetchProducts(params),
		placeholderData: prev => prev, // keepPreviousData (v5 uslub)
		staleTime: 60_000,
	})

	const products = data?.products ?? []
	const meta = data?.meta

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
						<SearchInput value={searchQuery} onChange={setSearchQuery} />

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
						<CategoryBar
							categories={categoriesPage}
							selectedCategory={category}
							onChange={setCategory}
						/>
					</div>

					{isLoading && <ProductGridSkeleton count={3} />}
					{isError && <div>Xatolik yuz berdi</div>}

					<div className='flex-1'>
						<div className='mb-4 flex items-center justify-between'>
							<p className='text-text-secondary'>
								Ko'rsatilmoqda:{' '}
								<span className='font-semibold text-text'>{meta?.total}</span>{' '}
								mahsulot
							</p>
						</div>

						{!isLoading && products.length === 0 ? (
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
								{products.map(product => (
									<ProductCard key={product._id} product={product} />
								))}
							</div>
						)}

						{/* Pagination */}
						{/* <div className='mt-8 sm:mt-12'>
							<Pagination
								currentPage={page}
								totalPages={totalPages}
								onPageChange={setCurrentPage}
							/>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	)
}
