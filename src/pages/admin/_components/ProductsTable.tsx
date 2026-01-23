import { Edit, Trash2 } from 'lucide-react'
import { Product } from '../../../types'

interface ProductsTableProps {
	products: Product[]
	onEdit: (product: Product) => void
	onDelete: (id: string) => void
}

export default function ProductsTable({
	products,
	onEdit,
	onDelete,
}: ProductsTableProps) {
	return (
		<div className='bg-card rounded-xl shadow-lg overflow-hidden text-text'>
			<div className='p-6 border-b border-border'>
				<h2 className='text-2xl font-bold text-secondary'>
					Mahsulotlarni boshqarish
				</h2>
			</div>
			<div className='overflow-x-auto'>
				<table className='w-full'>
					<thead className='bg-light'>
						<tr>
							<th className='px-6 py-4 text-left text-sm font-semibold'>
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
							<tr key={product.id} className='hover:bg-light'>
								<td className='px-6 py-4'>
									<div className='flex items-center'>
										<img
											src={product.image || '/placeholder.svg'}
											alt={product.name}
											className='w-12 h-12 rounded-lg object-cover mr-4'
										/>
										<div>
											<p className='font-semibold'>{product.name}</p>
											<p className='text-sm text-text-muted line-clamp-1'>
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
									{product.price} / {product.unit}
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
											onClick={() => onDelete(product.id)}
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
			</div>
		</div>
	)
}
