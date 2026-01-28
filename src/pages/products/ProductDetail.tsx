import {
	ArrowLeft,
	Heart,
	Minus,
	Package,
	Plus,
	Share2,
	ShoppingCart,
	Star,
	Truck,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryType } from '../../types'
// import { CategoryType } from '../types'

export interface Product {
	productId: string
	title: string
	category: CategoryType
	price: number
	originalPrice?: number
	unit: string
	description: string
	image: string[]
	stock: number
	rating?: number
	sellerId?: string
	createdAt?: string
}

// Mock product data
const mockProduct: Product = {
	productId: '1',
	title: 'Premium Beef Steak',
	category: 'beef',
	price: 89000,
	originalPrice: 110000,
	unit: 'kg',
	description:
		"Eng yuqori sifatli halol mol go'shti. Mahalliy fermerlardan yangi yetkazib beriladi. Go'sht yumshoq, mazali va oilangiz uchun mukammal tanlovdir. Barcha mahsulotlarimiz halol sertifikatiga ega va sifat nazoratidan o'tgan.",
	image: [
		'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
		'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=800',
		'https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg?auto=compress&cs=tinysrgb&w=800',
		'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=800',
	],
	stock: 45,
	rating: 4.8,
	sellerId: 'halal-farms',
	createdAt: '2024-01-15',
}

const formatPrice = (price: number) => {
	return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
}

export default function ProductDetail() {
	// const { id } = useParams()
	const [selectedImage, setSelectedImage] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const [isFavorite, setIsFavorite] = useState(false)

	// In real app, fetch product by id
	const product = mockProduct

	const displayImages = product.image.slice(0, 4)

	const handleQuantityChange = (change: number) => {
		setQuantity(prev => Math.max(1, Math.min(product.stock, prev + change)))
	}

	const discountPercent = product.originalPrice
		? Math.round(
				((product.originalPrice - product.price) / product.originalPrice) * 100,
			)
		: 0

	return (
		<div className='min-h-screen py-4 sm:py-6 md:py-8'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Breadcrumb / Back Button */}
				<div className='flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8'>
					<Link
						to='/products'
						className='p-1.5 sm:p-2 bg-card rounded-lg hover:bg-light transition-colors'
					>
						<ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5 text-text' />
					</Link>
					<nav className='text-xs sm:text-sm text-text-muted'>
						<Link to='/' className='hover:text-primary'>
							Bosh sahifa
						</Link>
						<span className='mx-1 sm:mx-2'>/</span>
						<Link to='/products' className='hover:text-primary'>
							Mahsulotlar
						</Link>
						<span className='mx-1 sm:mx-2'>/</span>
						<span className='text-text'>{product.title}</span>
					</nav>
				</div>

				<div className='grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12'>
					{/* Image Gallery */}
					<div className='space-y-3 sm:space-y-4'>
						{/* Main Image */}
						<div className='relative bg-card rounded-xl sm:rounded-2xl overflow-hidden aspect-square'>
							<img
								src={displayImages[selectedImage] || '/placeholder.svg'}
								alt={product.title}
								className='w-full h-full object-cover'
							/>
							{discountPercent > 0 && (
								<div className='absolute top-3 sm:top-4 left-3 sm:left-4'>
									<span className='px-2 sm:px-3 py-1 sm:py-1.5 bg-red-500 text-white text-xs sm:text-sm font-bold rounded-full'>
										-{discountPercent}%
									</span>
								</div>
							)}
							<button
								onClick={() => setIsFavorite(!isFavorite)}
								className={`absolute top-3 sm:top-4 right-3 sm:right-4 p-2 sm:p-2.5 rounded-full transition-colors ${
									isFavorite
										? 'bg-red-500 text-white'
										: 'bg-white/90 text-text-muted hover:text-red-500'
								}`}
							>
								<Heart
									className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-current' : ''}`}
								/>
							</button>
						</div>

						{/* Thumbnail Images */}
						{displayImages.length > 1 && (
							<div className='grid grid-cols-4 gap-2 sm:gap-3'>
								{displayImages.map((img, index) => (
									<button
										key={index}
										onClick={() => setSelectedImage(index)}
										className={`relative aspect-square rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
											selectedImage === index
												? 'border-primary ring-2 ring-primary/20'
												: 'border-transparent hover:border-border'
										}`}
									>
										<img
											src={img || '/placeholder.svg'}
											alt={`${product.title} ${index + 1}`}
											className='w-full h-full object-cover'
										/>
									</button>
								))}
							</div>
						)}
					</div>

					{/* Product Info */}
					<div className='space-y-4 sm:space-y-6'>
						{/* Category & Rating */}
						<div className='flex flex-wrap items-center gap-2 sm:gap-3'>
							<span className='px-2 sm:px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full capitalize'>
								{product.category}
							</span>
							{product.rating && (
								<div className='flex items-center gap-1'>
									<Star className='w-4 h-4 sm:w-5 sm:h-5 fill-secondary text-secondary' />
									<span className='font-semibold text-text text-sm sm:text-base'>
										{product.rating}
									</span>
									<span className='text-text-muted text-xs sm:text-sm'>
										(128 ta baho)
									</span>
								</div>
							)}
						</div>

						{/* Title */}
						<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-text'>
							{product.title}
						</h1>

						{/* Price */}
						<div className='flex flex-wrap items-baseline gap-2 sm:gap-3'>
							<span className='text-2xl sm:text-3xl md:text-4xl font-bold text-primary'>
								{formatPrice(product.price)}
							</span>
							{product.originalPrice && (
								<span className='text-lg sm:text-xl text-text-muted line-through'>
									{formatPrice(product.originalPrice)}
								</span>
							)}
							<span className='text-text-muted text-sm sm:text-base'>
								/ {product.unit}
							</span>
						</div>

						{/* Stock Status */}
						<div className='flex items-center gap-2 text-sm sm:text-base'>
							<Package className='w-4 h-4 sm:w-5 sm:h-5 text-text-muted' />
							{product.stock > 0 ? (
								<span className='text-text'>
									Omborda:{' '}
									<span className='font-semibold text-green-600'>
										{product.stock} {product.unit}
									</span>
								</span>
							) : (
								<span className='text-red-500 font-semibold'>Mavjud emas</span>
							)}
						</div>

						{/* Description */}
						<div className='pt-2 sm:pt-4 border-t border-border'>
							<h3 className='font-semibold text-text mb-2 text-sm sm:text-base'>
								Tavsif
							</h3>
							<p className='text-text-muted leading-relaxed text-sm sm:text-base'>
								{product.description}
							</p>
						</div>

						{/* Quantity Selector */}
						<div className='pt-2 sm:pt-4'>
							<label className='block text-sm sm:text-base font-semibold text-text mb-2 sm:mb-3'>
								Miqdori
							</label>
							<div className='flex items-center gap-3 sm:gap-4'>
								<div className='flex items-center bg-light rounded-lg sm:rounded-xl'>
									<button
										onClick={() => handleQuantityChange(-1)}
										disabled={quantity <= 1}
										className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-text hover:bg-border rounded-l-lg sm:rounded-l-xl transition-colors disabled:opacity-50'
									>
										<Minus className='w-4 h-4 sm:w-5 sm:h-5' />
									</button>
									<span className='w-12 sm:w-16 text-center font-semibold text-text text-base sm:text-lg'>
										{quantity}
									</span>
									<button
										onClick={() => handleQuantityChange(1)}
										disabled={quantity >= product.stock}
										className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-text hover:bg-border rounded-r-lg sm:rounded-r-xl transition-colors disabled:opacity-50'
									>
										<Plus className='w-4 h-4 sm:w-5 sm:h-5' />
									</button>
								</div>
								<span className='text-text-muted text-sm sm:text-base'>
									Jami:{' '}
									<span className='font-bold text-text'>
										{formatPrice(product.price * quantity)}
									</span>
								</span>
							</div>
						</div>

						{/* Action Buttons */}
						<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4'>
							<button
								disabled={product.stock === 0}
								className='flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-primary text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-primary-hover transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
							>
								<ShoppingCart className='w-4 h-4 sm:w-5 sm:h-5' />
								Savatga qo'shish
							</button>
							<button className='px-4 sm:px-6 py-3 sm:py-4 border border-border text-text rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-light transition-colors flex items-center justify-center gap-2'>
								<Share2 className='w-4 h-4 sm:w-5 sm:h-5' />
								<span className='sm:inline'>Ulashish</span>
							</button>
						</div>

						{/* Delivery Info */}
						<div className='bg-light rounded-lg sm:rounded-xl p-3 sm:p-4 mt-4 sm:mt-6'>
							<div className='flex items-start gap-3'>
								<div className='p-2 bg-primary/10 rounded-lg'>
									<Truck className='w-5 h-5 sm:w-6 sm:h-6 text-primary' />
								</div>
								<div>
									<h4 className='font-semibold text-text text-sm sm:text-base'>
										Yetkazib berish
									</h4>
									<p className='text-text-muted text-xs sm:text-sm mt-1'>
										Toshkent bo'ylab 1-2 kun ichida yetkazib beramiz. 200,000
										so'mdan ortiq buyurtmalarga bepul yetkazib berish.
									</p>
								</div>
							</div>
						</div>

						{/* Seller Info */}
						{product.sellerId && (
							<div className='flex items-center justify-between p-3 sm:p-4 bg-card border border-border rounded-lg sm:rounded-xl'>
								<div className='flex items-center gap-3'>
									<div className='w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center'>
										<span className='text-primary font-bold text-sm sm:text-base'>
											HF
										</span>
									</div>
									<div>
										<p className='font-semibold text-text text-sm sm:text-base'>
											Halal Farms
										</p>
										<p className='text-text-muted text-xs sm:text-sm'>
											Tasdiqlangan sotuvchi
										</p>
									</div>
								</div>
								<Link
									to={`/seller/${product.sellerId}`}
									className='text-primary font-medium text-xs sm:text-sm hover:underline'
								>
									Do'konga o'tish
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
