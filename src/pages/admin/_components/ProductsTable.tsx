import { useQuery } from '@tanstack/react-query'
import { Edit, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
	DropdownCategoryBar,
	DropdownFilterBar,
} from '../../../components/CategoryBar'
import { TableSkeleton } from '../../../components/Loader/Loading'
import SearchInput from '../../../components/SearchInput'
import { categoriesPage } from '../../../constants'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import { formatPrice } from '../../../lib/helpers'
import { resolveImageUrl } from '../../../lib/mediaUrl'
import { fetchProducts, Sort } from '../../../service/apiProducts'
import { Product } from '../../../types'

interface ProductsTableProps {
	products?: Product[]
	onEdit: (product: Product) => void
	onDelete: (id: string) => void
}

const filters = ['newest', 'oldest', 'sale']

export default function ProductsTable({
	onEdit,
	onDelete,
}: ProductsTableProps) {
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedSearchQuery = useDebouncedValue(searchQuery, 500)

	const [category, setCategory] = useState<string>('all')
	const [sort] = useState<Sort>('newest')
	const [page, setPage] = useState(1)
	const pageSize = 12
	const [filter, setFilter] = useState<string>('Newest')

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

	const { data, isLoading } = useQuery({
		queryKey: ['products', params],
		queryFn: () => fetchProducts(params),
		placeholderData: prev => prev, // keepPreviousData (v5 uslub)
		staleTime: 60_000,
	})

	const products = data?.products ?? []
	// const meta = data?.meta
	return (
		<div className='bg-card rounded-xl shadow-lg overflow-visible text-text'>
			<div className='p-6 border-b border-border grid grid-cols-2 items-center justify-between'>
				<h2 className='text-2xl font-bold text-secondary'>
					Mahsulotlarni boshqarish
				</h2>
				{/* filtering sections */}
				<div className='grid grid-cols-4 gap-x-4 items-center'>
					<SearchInput
						className='col-span-2'
						value={searchQuery}
						onChange={setSearchQuery}
					/>
					<DropdownCategoryBar
						categories={categoriesPage}
						selectedCategory={category}
						onChange={setCategory}
					/>
					<DropdownFilterBar
						filters={filters}
						selectedFilter={filter}
						onChange={setFilter}
					/>
				</div>
			</div>
			<div className='overflow-x-auto'>
				{/* Loading */}
				{isLoading && <TableSkeleton columns={5} rows={5} />}

				{products && (
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
