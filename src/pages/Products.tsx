import { Beef, ChefHat, Filter, Package, Search, Wheat } from 'lucide-react'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { CategoryType, Product } from '../types'

type SaleFilter = 'all' | 'sale' | 'non-sale'

export default function Products() {
	const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all')
	const [searchQuery, setSearchQuery] = useState('')
	const [saleFilter, setSaleFilter] = useState<SaleFilter>('all')

	const mockProducts: Product[] = [
		{
			id: '1',
			name: 'Premium Angus Beef',
			category: 'beef',
			price: 24.99,
			originalPrice: 32.99, // On Sale
			unit: 'kg',
			description:
				'High-quality halal Angus beef, perfect for grilling and roasting',
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
			description: 'Tender halal lamb chops, ideal for special occasions',
			image:
				'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
			stock: 30,
			sellerId: '2',
			createdAt: '2024-01-02',
		},
		{
			id: '3',
			name: 'Whole Chicken',
			category: 'chicken',
			price: 8.99,
			originalPrice: 11.99, // On Sale
			unit: 'piece',
			description: 'Farm-fresh halal chicken, cleaned and ready to cook',
			image:
				'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
			stock: 100,
			sellerId: '1',
			createdAt: '2024-01-03',
		},
		{
			id: '4',
			name: 'Artisan Sourdough Bread',
			category: 'bread',
			price: 5.99,
			unit: 'loaf',
			description: 'Freshly baked sourdough with a crispy crust',
			image:
				'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
			stock: 40,
			sellerId: '3',
			createdAt: '2024-01-04',
		},
		{
			id: '5',
			name: 'Ground Beef',
			category: 'beef',
			price: 18.99,
			originalPrice: 24.99, // On Sale
			unit: 'kg',
			description: 'Lean halal ground beef, perfect for burgers and meatballs',
			image:
				'https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=400',
			stock: 60,
			sellerId: '2',
			createdAt: '2024-01-05',
		},
		{
			id: '6',
			name: 'Chicken Breast',
			category: 'chicken',
			price: 12.99,
			unit: 'kg',
			description: 'Boneless halal chicken breast, high in protein',
			image:
				'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400',
			stock: 75,
			sellerId: '1',
			createdAt: '2024-01-06',
		},
		{
			id: '7',
			name: 'Whole Wheat Bread',
			category: 'bread',
			price: 4.99,
			originalPrice: 6.49, // On Sale
			unit: 'loaf',
			description: 'Healthy whole wheat bread, baked fresh daily',
			image:
				'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400',
			stock: 50,
			sellerId: '3',
			createdAt: '2024-01-07',
		},
		{
			id: '8',
			name: 'Leg of Lamb',
			category: 'mutton',
			price: 32.99,
			unit: 'kg',
			description: 'Premium halal leg of lamb, perfect for roasting',
			image:
				'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=400',
			stock: 25,
			sellerId: '2',
			createdAt: '2024-01-08',
		},
	]

	const categories = [
		{ id: 'all', name: 'Barchasi', icon: Package },
		{ id: 'beef', name: 'Mol go`shti', icon: Beef },
		{ id: 'mutton', name: 'Qo`y go`shti', icon: Beef },
		{ id: 'chicken', name: 'Tovuq go`shti', icon: ChefHat },
		{ id: 'bread', name: 'Patir va Nonlar', icon: Wheat },
	]

	const filteredProducts = mockProducts.filter(product => {
		const matchesCategory =
			selectedCategory === 'all' || product.category === selectedCategory
		const matchesSearch =
			product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.description.toLowerCase().includes(searchQuery.toLowerCase())
		const matchesSaleFilter =
			saleFilter === 'all' ||
			(saleFilter === 'sale' && product.originalPrice !== undefined) ||
			(saleFilter === 'non-sale' && product.originalPrice === undefined)
		return matchesCategory && matchesSearch && matchesSaleFilter
	})

	return (
		<div className='min-h-screen bg-background overflow-hidden'>
			<div className='bg-linear-to-r from-secondary to-transparent text-white py-12'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h1 className='text-4xl font-bold mb-4'>Bizning Mahsulotlar</h1>
					<p className='text-emerald-50 text-lg'>
						Eng sara halol mahsulotlar — bir joyda
					</p>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='mb-8'>
					<div className='flex flex-col sm:flex-row gap-4'>
						<div className='relative flex-1'>
							<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
							<input
								type='text'
								placeholder='Mahsulotlarni qidirish...'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-text'
							/>
						</div>
						<div className='flex gap-2 w-full flex-wrap'>
							<button
								onClick={() => setSaleFilter('all')}
								className={`px-5 py-3 rounded-lg font-medium transition-all ${
									saleFilter === 'all'
										? 'bg-primary text-white shadow-md'
										: 'bg-card text-text border border-border hover:bg-light'
								}`}
							>
								Barchasi
							</button>
							<button
								onClick={() => setSaleFilter('sale')}
								className={`px-5 py-3 rounded-lg font-medium transition-all ${
									saleFilter === 'sale'
										? 'bg-primary text-white shadow-md'
										: 'bg-card text-text border border-border hover:bg-light'
								}`}
							>
								Chegirmada
							</button>
							<button
								onClick={() => setSaleFilter('non-sale')}
								className={`px-5 py-3 rounded-lg font-medium transition-all ${
									saleFilter === 'non-sale'
										? 'bg-primary text-white shadow-md'
										: 'bg-card text-text border border-border hover:bg-light'
								}`}
							>
								Chegirmasiz
							</button>
						</div>
					</div>
				</div>

				<div className='flex flex-col lg:flex-row gap-8'>
					<div className='lg:w-64 shrink-0'>
						<div className='bg-card rounded-lg shadow-md p-6 sticky top-24'>
							<div className='flex items-center mb-4'>
								<Filter className='w-5 h-5 mr-2 text-primary' />
								<h2 className='text-lg font-semibold text-text'>
									Kategoriyalar
								</h2>
							</div>
							<div className='space-y-2 text-text'>
								{categories.map(category => {
									const Icon = category.icon
									return (
										<button
											key={category.id}
											onClick={() =>
												setSelectedCategory(category.id as CategoryType)
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

						{filteredProducts.length === 0 ? (
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
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{filteredProducts.map(product => (
									<ProductCard key={product.id} product={product} />
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
