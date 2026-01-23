import { Clock, Star, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { recentProducts } from '../../constants'

const formatPrice = (price: number) => {
	return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
}

export default function RecentProductsSection() {
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
			<div className='flex items-center justify-between mb-10'>
				<div>
					<div className='flex items-center gap-2 mb-2'>
						<Clock className='w-6 h-6 text-primary' />
						<span className='text-primary font-semibold uppercase tracking-wider text-sm'>
							Yangi kelganlar
						</span>
					</div>
					<h2 className='text-3xl md:text-4xl font-bold text-text'>
						So'nggi Mahsulotlar
					</h2>
				</div>
				<Link
					to='/products'
					className='hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all'
				>
					Barchasini ko'rish
					<TrendingUp className='w-5 h-5' />
				</Link>
			</div>

			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
				{recentProducts.slice(0, 5).map(product => (
					<div
						key={product.id}
						className='group bg-card rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300'
					>
						<div className='relative h-36 overflow-hidden'>
							<img
								src={product.image || '/placeholder.svg'}
								alt={product.name}
								className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
							/>
							{product.isNew && (
								<div className='absolute top-2 left-2'>
									<span className='px-2 py-0.5 bg-primary text-white text-xs font-semibold rounded-full'>
										Yangi
									</span>
								</div>
							)}
						</div>
						<div className='p-3'>
							<p className='text-text-muted text-xs mb-1'>{product.seller}</p>
							<h3 className='text-text font-medium text-sm mb-1 line-clamp-1'>
								{product.name}
							</h3>
							<div className='flex items-center gap-1 mb-2'>
								<Star className='w-3 h-3 fill-secondary text-secondary' />
								<span className='text-text text-xs'>{product.rating}</span>
							</div>
							<span className='text-primary font-bold text-sm'>
								{formatPrice(product.price)}
							</span>
						</div>
					</div>
				))}
			</div>

			<Link
				to='/products'
				className='md:hidden flex items-center justify-center gap-2 mt-8 text-primary font-semibold'
			>
				Barchasini ko'rish
				<TrendingUp className='w-5 h-5' />
			</Link>
		</div>
	)
}
