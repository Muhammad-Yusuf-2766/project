import {
	DollarSign,
	Edit,
	Package,
	Plus,
	Trash2,
	TrendingUp,
	Users,
	X,
} from 'lucide-react'
import { useState } from 'react'
import { Product } from '../types'

export default function AdminDashboard() {
	const [activeTab, setActiveTab] = useState<
		'overview' | 'products' | 'add-product'
	>('overview')
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [productToDelete, setProductToDelete] = useState<string | null>(null)

	const [formData, setFormData] = useState({
		name: '',
		category: 'beef',
		price: '',
		unit: 'kg',
		description: '',
		image: '',
		stock: '',
	})

	const mockProducts: Product[] = [
		{
			id: '1',
			name: 'Premium Angus Beef',
			category: 'beef',
			price: 24.99,
			unit: 'kg',
			description: 'High-quality halal Angus beef',
			image:
				'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=400',
			stock: 50,
			sellerId: '1',
			createdAt: '2024-01-01',
		},
		{
			id: '2',
			name: 'Fresh Lamb Chops',
			category: 'mutton',
			price: 28.99,
			unit: 'kg',
			description: 'Tender halal lamb chops',
			image:
				'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
			stock: 30,
			sellerId: '2',
			createdAt: '2024-01-02',
		},
	]

	const stats = [
		{
			label: 'Barcha mahsulotlar',
			value: '156',
			icon: Package,
			color: 'bg-blue-500',
		},
		{
			label: 'Barcha buyurtmalar',
			value: '42',
			icon: Users,
			color: 'bg-emerald-500',
		},
		{
			label: 'Barcha savdo',
			value: '$24,580',
			icon: DollarSign,
			color: 'bg-purple-500',
		},
		{
			label: 'O`sish',
			value: '+12.5%',
			icon: TrendingUp,
			color: 'bg-orange-500',
		},
	]

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setFormData({
			name: '',
			category: 'beef',
			price: '',
			unit: 'kg',
			description: '',
			image: '',
			stock: '',
		})
		setActiveTab('products')
	}

	const handleDelete = (id: string) => {
		setProductToDelete(id)
		setShowDeleteModal(true)
	}

	const confirmDelete = () => {
		setShowDeleteModal(false)
		setProductToDelete(null)
	}

	return (
		<div className='min-h-screen text-text'>
			<div className='bg-gradient-to-r from-secondary to-background  py-8'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold'>Admin uchun Dashboard</h1>
					<p className=' mt-2'>Mahsulotlaringizni va sotuv ni boshqaring</p>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='flex flex-wrap gap-4 mb-8'>
					<button
						onClick={() => setActiveTab('overview')}
						className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-lg ${
							activeTab === 'overview'
								? 'bg-primary text-light '
								: 'bg-card hover:bg-light'
						}`}
					>
						Umumiy
					</button>
					<button
						onClick={() => setActiveTab('products')}
						className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-lg ${
							activeTab === 'products'
								? 'bg-primary text-light '
								: 'bg-card text-text hover:bg-light'
						}`}
					>
						Mahsulotlarni boshqarish
					</button>
					<button
						onClick={() => setActiveTab('add-product')}
						className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center shadow-lg ${
							activeTab === 'add-product'
								? 'bg-primary text-white'
								: 'bg-card text-text hover:bg-light'
						}`}
					>
						<Plus className='w-5 h-5 mr-2' />
						Mahsulot qo'shish
					</button>
				</div>

				{activeTab === 'overview' && (
					<div>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
							{stats.map((stat, index) => {
								const Icon = stat.icon
								return (
									<div
										key={index}
										className='bg-card rounded-xl shadow-lg p-6 text-text-secondary'
									>
										<div className='flex items-center justify-between mb-4'>
											<div
												className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
											>
												<Icon className='w-6 h-6 text-white' />
											</div>
										</div>
										<p className=' text-sm mb-1'>{stat.label}</p>
										<p className='text-3xl font-bold'>{stat.value}</p>
									</div>
								)
							})}
						</div>

						<div className='bg-card rounded-xl shadow-lg p-6 text-text'>
							<h2 className='text-2xl font-bold mb-6'>Recent Activity</h2>
							<div className='space-y-4'>
								{[1, 2, 3].map(i => (
									<div
										key={i}
										className='flex items-center p-4 bg-gray-50 hover:bg-light rounded-lg'
									>
										<div className='w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-4'>
											<Package className='w-5 h-5 text-emerald-600' />
										</div>
										<div className='flex-1'>
											<p className='font-semibold'>Yangi mahsulot qo'shildi</p>
											<p className='text-sm '>2 soat oldin</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{activeTab === 'products' && (
					<div className='bg-card rounded-xl shadow-lg overflow-hidden text-text'>
						<div className='p-6 border-b border-gray-200'>
							<h2 className='text-2xl font-bold text-secondary'>
								Mahsulotlarni boshqarish
							</h2>
						</div>
						<div className='overflow-x-auto'>
							<table className='w-full'>
								<thead className='bg-light'>
									<tr>
										<th className='px-6 py-4 text-left text-sm font-semibold '>
											Mahsulot
										</th>
										<th className='px-6 py-4 text-left text-sm font-semibold '>
											Turi
										</th>
										<th className='px-6 py-4 text-left text-sm font-semibold '>
											Narxi
										</th>
										<th className='px-6 py-4 text-left text-sm font-semibold '>
											Sotuvda
										</th>
										<th className='px-6 py-4 text-left text-sm font-semibold '>
											O'zgarishlar
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-gray-200'>
									{mockProducts.map(product => (
										<tr key={product.id} className='hover:bg-light'>
											<td className='px-6 py-4'>
												<div className='flex items-center'>
													<img
														src={product.image}
														alt={product.name}
														className='w-12 h-12 rounded-lg object-cover mr-4'
													/>
													<div>
														<p className='font-semibold'>{product.name}</p>
														<p className='text-sm text-text-muted'>
															{product.description}
														</p>
													</div>
												</div>
											</td>
											<td className='px-6 py-4'>
												<span className='px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium'>
													{product.category}
												</span>
											</td>
											<td className='px-6 py-4 font-semibold'>
												${product.price}/{product.unit}
											</td>
											<td className='px-6 py-4'>{product.stock}</td>
											<td className='px-6 py-4'>
												<div className='flex gap-2'>
													<button className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'>
														<Edit className='w-4 h-4' />
													</button>
													<button
														onClick={() => handleDelete(product.id)}
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
				)}

				{activeTab === 'add-product' && (
					<div className='bg-card rounded-xl shadow-lg p-8'>
						<h2 className='text-2xl font-bold  mb-6'>
							Yangi mahsulot qo'shish
						</h2>
						<form onSubmit={handleSubmit} className='space-y-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div>
									<label className='block text-sm font-semibold mb-2'>
										Mahsulot nomi
									</label>
									<input
										type='text'
										value={formData.name}
										onChange={e =>
											setFormData({ ...formData, name: e.target.value })
										}
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:outline-0'
										required
									/>
								</div>

								<div>
									<label className='block text-sm font-semibold mb-2'>
										Mahsulot turi
									</label>
									<select
										value={formData.category}
										onChange={e =>
											setFormData({ ...formData, category: e.target.value })
										}
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:outline-0'
									>
										<option value='beef'>Beef</option>
										<option value='mutton'>Mutton</option>
										<option value='chicken'>Chicken</option>
										<option value='bread'>Bread</option>
										<option value='other'>Other</option>
									</select>
								</div>

								<div>
									<label className='block text-sm font-semibold mb-2'>
										Narxi
									</label>
									<input
										type='number'
										step='0.01'
										value={formData.price}
										onChange={e =>
											setFormData({ ...formData, price: e.target.value })
										}
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:outline-0'
										required
									/>
								</div>

								<div>
									<label className='block text-sm font-semibold mb-2'>
										Qiymati
									</label>
									<select
										value={formData.unit}
										onChange={e =>
											setFormData({ ...formData, unit: e.target.value })
										}
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:outline-0'
									>
										<option value='kg'>Kilogram (kg)</option>
										<option value='piece'>Piece</option>
										<option value='loaf'>Loaf</option>
										<option value='lb'>Pound (lb)</option>
									</select>
								</div>

								<div>
									<label className='block text-sm font-semibold mb-2'>
										Soni
									</label>
									<input
										type='number'
										value={formData.stock}
										onChange={e =>
											setFormData({ ...formData, stock: e.target.value })
										}
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:outline-0'
										required
									/>
								</div>

								<div>
									<label className='block text-sm font-semibold mb-2'>
										Mahsulot rasmi
									</label>
									<input
										type='url'
										value={formData.image}
										onChange={e =>
											setFormData({ ...formData, image: e.target.value })
										}
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:outline-0'
										required
									/>
								</div>
							</div>

							<div>
								<label className='block text-sm font-semibold mb-2'>
									Tasnifi
								</label>
								<textarea
									value={formData.description}
									onChange={e =>
										setFormData({ ...formData, description: e.target.value })
									}
									rows={4}
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:outline-0'
									required
								/>
							</div>

							<div className='flex gap-4'>
								<button
									type='submit'
									className='px-8 py-3 bg-primary text-light rounded-lg font-semibold hover:bg-emerald-700 transition-colors'
								>
									Qo'shish
								</button>
								<button
									type='button'
									onClick={() => setActiveTab('products')}
									className='px-8 py-3 bg-gray-200 rounded-lg font-semibold hover:bg-light transition-colors'
								>
									Bekor qilish
								</button>
							</div>
						</form>
					</div>
				)}
			</div>

			{showDeleteModal && (
				<div className='fixed inset-0 bg-black/45 bg-opacity-50 flex items-center justify-center z-50 p-4'>
					<div className='bg-white rounded-xl max-w-md w-full p-6'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-xl font-bold'>Mahsulotni O'chirish</h3>
							<button
								onClick={() => setShowDeleteModal(false)}
								className='text-gray-400 hover:text-gray-600'
							>
								<X className='w-6 h-6' />
							</button>
						</div>
						<p className='text-gray-600 mb-6'>
							Bu mahsulotni o'chirishga rozimisiz ?
						</p>
						<div className='flex gap-3'>
							<button
								onClick={confirmDelete}
								className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors'
							>
								O'chirish
							</button>
							<button
								onClick={() => setShowDeleteModal(false)}
								className='flex-1 px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition-colors'
							>
								Bekor qilish
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
