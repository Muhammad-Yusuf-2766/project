import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import CategoryBar from '../../components/CategoryBar'
import { ProductGridSkeleton } from '../../components/Loader/Loading'
import { Pagination2 } from '../../components/Pagination'
import ProductCard from '../../components/ProductCard'
import ShopPageHeader from '../../components/ShopHeader'
import UndefinedData from '../../components/UndefinedData'
import { categoriesPage } from '../../constants'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { fetchProducts, SortProducts } from '../../service/apiProducts'

export type SaleFilter = 'all' | 'sale' | 'new' | 'top' | 'newst' | 'oldest'

export default function Products() {
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedSearchQuery = useDebouncedValue(searchQuery, 500)
	const [category, setCategory] = useState<string>('all')
	const [sort, setSort] = useState<SortProducts>('all')
	const [page, setPage] = useState(1)
	const pageSize = 20

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
	const totalProducts = data?.meta?.total ?? 0
	const totalPages = Math.ceil(totalProducts / pageSize)

	return (
		<div className='min-h-screen overflow-x-hidden'>
			<div
				className='relative text-white py-16 sm:py-24'
				style={{
					backgroundImage:
						'linear-gradient(#14141490, #14141499), url(/banner.webp)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
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
					{/* Filter Section */}
					<ShopPageHeader
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						saleFilter={sort}
						setSaleFilter={(value: string) => setSort(value as SortProducts)}
					/>
				</div>

				{/* Category & product render section */}
				<div className='flex flex-col lg:flex-row gap-8'>
					<div className='lg:w-64 shrink-0 '>
						<CategoryBar
							categories={categoriesPage}
							selectedCategory={category}
							onChange={setCategory}
						/>
					</div>

					<div className='flex-1'>
						{isLoading && <ProductGridSkeleton count={4} />}
						{isError && <div>Xatolik yuz berdi</div>}

						<div className='mb-4 flex items-center justify-between'>
							<p className='text-text-secondary'>
								Ko'rsatilmoqda:{' '}
								<span className='font-semibold text-text'>
									{data?.meta.total}
								</span>{' '}
								mahsulot
							</p>
						</div>

						{!isLoading && products.length === 0 ? (
							<UndefinedData
								header='Mahsulotlar topilmadi.'
								subHeader='Iltimos admin bilan bog`laning'
							/>
						) : (
							<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2'>
								{products.map(product => (
									<ProductCard key={product._id} product={product} />
								))}
							</div>
						)}

						{/* Pagination */}
						{/* {!isLoading && totalPages > 1 && (
							<Pagination
								header='mahsulotlar'
								page={page}
								totalPages={totalPages}
								totalOrders={totalProducts}
								setPage={setPage}
							/>
						)} */}

						{/* Pagination */}
						{!isLoading && totalPages > 1 && (
							<div className='mt-8 sm:mt-12'>
								<Pagination2
									currentPage={page}
									totalPages={totalPages}
									onPageChange={setPage}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
