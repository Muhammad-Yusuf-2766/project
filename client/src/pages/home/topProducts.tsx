import {
	ChevronLeft,
	ChevronRight,
	Flame,
	Heart,
	ShoppingCart,
	TrendingUp,
} from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../lib/helpers'
import { resolveImageUrl } from '../../lib/mediaUrl'
import { Product } from '../../types'

type Props = {
	products: Product[]
}

export default function TopProductsSection({ products }: Props) {
	const carouselRef = useRef<HTMLDivElement>(null)
	const { add } = useCart()

	const scroll = (direction: 'left' | 'right') => {
		if (carouselRef.current) {
			const scrollAmount = 320
			carouselRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			})
		}
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
			<div className='flex items-center justify-between mb-10'>
				<div>
					<div className='flex items-center gap-2 mb-2'>
						<Flame className='w-6 h-6 text-secondary' />
						<span className='text-secondary font-semibold uppercase tracking-wider text-sm'>
							Eng yaxshilari
						</span>
					</div>
					<h2 className='md:text-4xl text-2xl font-bold text-text'>
						Top Mahsulotlar
					</h2>
				</div>
				<div className='flex items-center gap-4'>
					<div className='hidden md:flex items-center gap-2'>
						<button
							onClick={() => scroll('left')}
							className='p-2 rounded-full bg-card shadow-md hover:bg-light transition-colors'
						>
							<ChevronLeft className='w-5 h-5 text-text' />
						</button>
						<button
							onClick={() => scroll('right')}
							className='p-2 rounded-full bg-card shadow-md hover:bg-light transition-colors'
						>
							<ChevronRight className='w-5 h-5 text-text' />
						</button>
					</div>
					<Link
						to='/products'
						className='hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all'
					>
						Barchasini ko'rish
						<TrendingUp className='w-5 h-5' />
					</Link>
				</div>
			</div>

			{/* Mine */}
			<div
				ref={carouselRef}
				className='flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide'
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			>
				{products.map(product => (
					<Link
						to={`/products/${product._id}`}
						key={product._id}
						className='group shrink-0 w-64 bg-card rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 snap-start'
					>
						<div className='relative h-40 overflow-hidden'>
							<img
								loading='lazy'
								src={resolveImageUrl(product.images?.[0])}
								alt={product.title}
								className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
							/>
							{product.originalPrice && (
								<div className='absolute top-3 right-3'>
									<span className='px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full'>
										-
										{Math.round(
											((product.originalPrice - product.price) /
												product.originalPrice) *
												100,
										)}
										%
									</span>
								</div>
							)}
						</div>
						<div className='p-3'>
							<p className='text-text-muted text-sm mb-1 line-clamp-1'>
								{product.description}
							</p>
							<h3 className='text-text font-semibold text-lg mb-2 line-clamp-1'>
								{product.title}
							</h3>
							<div className='flex items-center gap-1 mb-3'>
								<Heart className='w-4 h-4 fill-secondary text-secondary' />

								<span className='text-text-muted text-sm'>
									{product.likeCount || 0}.
								</span>

								<span className='text-text-muted text-sm'>
									qoldi {product.stock}
								</span>
							</div>
							<div className='flex items-center justify-between'>
								<div>
									<span className='text-primary font-bold text-base'>
										{formatPrice(product.price)}
									</span>
									{product.originalPrice && (
										<span className='text-text-muted text-sm line-through ml-2'>
											{formatPrice(product.originalPrice)}
										</span>
									)}
								</div>
								<button
									onClick={e => {
										e.preventDefault() // Link navigatsiyasini bloklaydi
										e.stopPropagation() // click yuqoriga chiqib ketmasin
										add(product, 1)
									}}
									className='p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors'
								>
									<ShoppingCart className='w-5 h-5' />
								</button>
							</div>
						</div>
					</Link>
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
