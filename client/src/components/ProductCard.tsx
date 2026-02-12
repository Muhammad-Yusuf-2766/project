import { Heart, Package, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { useToggleLike } from '../hooks/useToggleLike'
import { resolveImageUrl } from '../lib/mediaUrl'
import { Product } from '../types'

interface ProductCardProps {
	product: Product
}

const formatPrice = (price: number) => {
	return new Intl.NumberFormat('uz-UZ').format(price)
}

export default function ProductCard({ product }: ProductCardProps) {
	const { add } = useCart()
	const { mutate: toggleLike, isPending } = useToggleLike()
	const { isLiked } = useFavorites()
	const { ready } = useFavorites()

	return (
		<div className='bg-card rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 snap-start group'>
			<div className='relative h-28 sm:h-36 md:h-40 overflow-hidden bg-gray-200 group'>
				<img
					loading='lazy'
					src={resolveImageUrl(product.images?.[0])}
					alt={product.title}
					className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
				/>
				{product.originalPrice && (
					<div className='absolute top-2 left-2 sm:top-3 sm:left-3'>
						<span className='px-1.5 py-0.5 sm:px-2 sm:py-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full'>
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

			<div className='p-2.5 sm:p-3 md:p-4 text-text'>
				<h3 className='text-sm sm:text-base md:text-lg font-medium line-clamp-1'>
					{product.title}
				</h3>
				<p className='text-text-muted text-xs sm:text-sm mb-1.5 sm:mb-2 line-clamp-1'>
					{product.description}
				</p>

				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1.5 sm:mb-2'>
					<div className='flex items-baseline flex-wrap gap-x-1'>
						<span className='text-primary font-bold text-sm sm:text-base md:text-lg'>
							{formatPrice(product.price)}
						</span>
						{product.originalPrice && (
							<span className='text-text-muted text-[10px] sm:text-xs md:text-sm line-through'>
								{formatPrice(product.originalPrice)}
							</span>
						)}
						<span className='text-gray-500 text-[10px] sm:text-xs md:text-sm'>
							/ {product.unit}
						</span>
					</div>
				</div>

				<div className='flex items-center justify-between text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-3'>
					<div className='flex items-center text-text-muted'>
						<Package className='w-3 h-3 sm:w-4 sm:h-4 mr-1' />
						<span>
							qoldi {product.stock} {product.unit}
						</span>
					</div>
					<button
						type='button'
						disabled={!ready || isPending}
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							toggleLike({
								productId: product._id,
								prevLiked: isLiked(product._id),
							})
						}}
					>
						<Heart
							className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked(product._id) ? 'fill-red-500 text-red-500' : 'text-text'}`}
						/>
					</button>
				</div>

				<div className='flex items-center gap-2 text-light'>
					<button
						onClick={() => add(product, 1)}
						className='flex-1 px-2 py-1.5 sm:py-2 bg-primary rounded-md sm:rounded-lg font-medium sm:font-semibold hover:bg-primary-hover transition-colors flex items-center justify-center text-xs sm:text-sm md:text-base'
					>
						<ShoppingCart className='w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2' />
						<span className='hidden sm:inline'>Savatga qo'shish</span>
						<span className='sm:hidden'>Qo'shish</span>
					</button>
				</div>
			</div>
		</div>
	)
}
