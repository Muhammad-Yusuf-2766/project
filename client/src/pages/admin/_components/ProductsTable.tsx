import { useQuery } from '@tanstack/react-query'
import { Edit, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { TableSkeleton } from '../../../components/Loader/Loading'
import { useCategories } from '../../../hooks/categoriesQuery'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import { formatPrice } from '../../../lib/helpers'
import { resolveImageUrl } from '../../../lib/mediaUrl'
import { fetchProducts, SortProducts } from '../../../service/apiProducts'
import { Product } from '../../../types'
import TableHeaders from './TableHeaders'

interface ProductsTableProps {
	onEdit: (product: Product) => void
	onDelete: (id: string) => void
}

export default function ProductsTable({
	onEdit,
	onDelete,
}: ProductsTableProps) {
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedSearchQuery = useDebouncedValue(searchQuery, 500)

	const [category, setCategory] = useState<string>('all')
	const [sort, setSort] = useState('newest')
	const [page, setPage] = useState(1)
	const pageSize = 12

	// qaysi param o'zgarsa page 1 bo'lsin (UX)
	useEffect(() => {
		setPage(1)
	}, [debouncedSearchQuery, category, sort])

	const params = useMemo(
		() => ({
			searchQuery: debouncedSearchQuery,
			category,
			sort: sort as SortProducts,
			page,
			pageSize,
		}),
		[debouncedSearchQuery, category, sort, page, pageSize],
	)

	const { data: categories } = useCategories()

	const { data, isLoading } = useQuery({
		queryKey: ['products'],
		queryFn: () => fetchProducts(params),
		placeholderData: prev => prev, // keepPreviousData (v5 uslub)
		staleTime: 60_000,
	})

	const SORT_OPTIONS = [
		{ value: 'newest', label: 'Yangi' },
		{ value: 'oldest', label: 'Eski' },
		{ value: 'best-selling', label: "Ko'p sotilgan" },
		{ value: 'on-sale', label: 'Chegirmadagi' },
	]

	const CATEGORY_FILTERS = [
		{ value: 'all', label: 'Barchasi' },
		...((categories ?? []).map(cat => ({
			value: cat.slug,
			label: cat.title,
		})) as { value: string; label: string }[]),
	]

	const products = data?.products ?? []
	// const meta = data?.meta
	return (
		<div className='bg-card rounded-xl shadow-lg overflow-visible text-foreground'>
			{/* filtering sections */}
			<TableHeaders
				header='Mahsulotlarni boshqarish'
				searchQuery={searchQuery}
				filterOptions={CATEGORY_FILTERS}
				sortOptions={SORT_OPTIONS}
				sort={sort}
				filter={category}
				onSearchChange={setSearchQuery}
				onFilterChange={setCategory}
				onSortChange={setSort}
			/>

			<div className='overflow-x-auto'>
				{/* Loading */}
				{isLoading && <TableSkeleton columns={5} rows={5} />}

				{!isLoading && products.length > 0 && (
					<table className='w-full table-fixed'>
						<thead className='bg-light'>
							<tr>
								<th className='w-[30%] px-6 py-4 text-left text-sm font-semibold'>
									Mahsulot
								</th>
								<th className='px-6 py-4 text-left text-sm font-semibold'>
									Turi
								</th>
								<th className='px-6 py-4 text-left text-sm font-semibold'>
									Narxi
								</th>
								<th className='px-6 py-4 text-left text-sm font-semibold'>
									Sotuvda
								</th>
								<th className='px-6 py-4 text-left text-sm font-semibold'>
									O'zgarishlar
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-border'>
							{products.map(product => (
								<tr key={product._id} className='hover:bg-light'>
									<td className='px-6 py-4'>
										<div className='flex items-center gap-4 min-w-0'>
											<img
												src={resolveImageUrl(product.images[0])}
												alt={product.title}
												className='w-12 h-12 rounded-lg object-cover shrink-0'
											/>
											<div className='min-w-0'>
												<p className='font-semibold truncate'>
													{product.title}
												</p>
												<p className='text-sm text-text-muted line-clamp-2'>
													{product.description}
												</p>
											</div>
										</div>
									</td>

									<td className='px-6 py-4'>
										<span className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium'>
											{product.category}
										</span>
									</td>
									<td className='px-6 py-4 font-semibold'>
										{formatPrice(product.price)} / {product.unit}
									</td>
									<td className='px-6 py-4'>{product.stock}</td>
									<td className='px-6 py-4'>
										<div className='flex gap-2'>
											<button
												onClick={() => onEdit(product)}
												className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
											>
												<Edit className='w-4 h-4' />
											</button>
											<button
												onClick={() => onDelete(product._id)}
												className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
											>
												<Trash2 className='w-4 h-4' />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	)
}
