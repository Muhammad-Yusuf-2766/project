import {
	ArrowLeft,
	Minus,
	Plus,
	ShoppingBag,
	Trash2,
	Truck,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface CartItem {
	id: number
	name: string
	price: number
	quantity: number
	image: string
	seller: string
	unit: string
}

const initialCartItems: CartItem[] = [
	{
		id: 1,
		name: 'Premium Beef Steak',
		price: 89000,
		quantity: 2,
		image:
			'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
		seller: 'Halal Farms',
		unit: 'kg',
	},
	{
		id: 2,
		name: 'Fresh Lamb Chops',
		price: 75000,
		quantity: 1,
		image:
			'https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg?auto=compress&cs=tinysrgb&w=400',
		seller: 'Mountain Meats',
		unit: 'kg',
	},
	{
		id: 3,
		name: 'Artisan Sourdough Bread',
		price: 18000,
		quantity: 3,
		image:
			'https://images.pexels.com/photos/1510684/pexels-photo-1510684.jpeg?auto=compress&cs=tinysrgb&w=400',
		seller: 'Baker House',
		unit: 'dona',
	},
]

const formatPrice = (price: number) => {
	return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
}

export default function Cart() {
	const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

	const updateQuantity = (id: number, change: number) => {
		setCartItems(items =>
			items.map(item =>
				item.id === id
					? { ...item, quantity: Math.max(1, item.quantity + change) }
					: item,
			),
		)
	}

	const removeItem = (id: number) => {
		setCartItems(items => items.filter(item => item.id !== id))
	}

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	)
	const shippingCost = subtotal > 200000 ? 0 : 15000
	const total = subtotal + shippingCost

	return (
		<div className='min-h-screen py-8'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='flex items-center gap-4 mb-8'>
					<Link
						to='/products'
						className='p-2 bg-card rounded-lg hover:bg-light transition-colors'
					>
						<ArrowLeft className='w-5 h-5 text-text' />
					</Link>
					<div>
						<h1 className='text-3xl font-bold text-text'>Savatcha</h1>
						<p className='text-text-muted'>{cartItems.length} ta mahsulot</p>
					</div>
				</div>

				{cartItems.length > 0 ? (
					<div className='grid lg:grid-cols-3 gap-8'>
						{/* Cart Items */}
						<div className='lg:col-span-2 space-y-4'>
							{cartItems.map(item => (
								<div
									key={item.id}
									className='bg-card rounded-xl shadow-sm p-4 sm:p-6'
								>
									<div className='flex gap-4'>
										{/* Product Image */}
										<div className='shrink-0'>
											<img
												src={item.image || '/placeholder.svg'}
												alt={item.name}
												className='w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover'
											/>
										</div>

										{/* Product Details */}
										<div className='flex-1 min-w-0'>
											<div className='flex justify-between items-start'>
												<div>
													<p className='text-text-muted text-sm'>
														{item.seller}
													</p>
													<h3 className='text-text font-semibold text-lg mb-1'>
														{item.name}
													</h3>
													<p className='text-primary font-bold'>
														{formatPrice(item.price)} / {item.unit}
													</p>
												</div>
												<button
													onClick={() => removeItem(item.id)}
													className='p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors'
												>
													<Trash2 className='w-5 h-5' />
												</button>
											</div>

											{/* Quantity Controls & Line Total */}
											<div className='flex items-center justify-between mt-4'>
												<div className='flex items-center gap-3'>
													<button
														onClick={() => updateQuantity(item.id, -1)}
														className='w-9 h-9 flex items-center justify-center bg-light rounded-lg hover:bg-border transition-colors'
													>
														<Minus className='w-4 h-4 text-text' />
													</button>
													<span className='w-8 text-center font-semibold text-text'>
														{item.quantity}
													</span>
													<button
														onClick={() => updateQuantity(item.id, 1)}
														className='w-9 h-9 flex items-center justify-center bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors'
													>
														<Plus className='w-4 h-4' />
													</button>
												</div>
												<div className='text-right'>
													<p className='text-text-muted text-sm'>Jami</p>
													<p className='text-text font-bold text-lg'>
														{formatPrice(item.price * item.quantity)}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}

							{/* Continue Shopping */}
							<Link
								to='/products'
								className='inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all mt-4'
							>
								<ArrowLeft className='w-5 h-5' />
								Xarid qilishni davom ettirish
							</Link>
						</div>

						{/* Order Summary */}
						<div className='lg:col-span-1'>
							<div className='bg-card rounded-xl shadow-sm p-6 sticky top-24'>
								<h2 className='text-xl font-bold text-text mb-6'>
									Buyurtma xulosasi
								</h2>

								<div className='space-y-4 mb-6'>
									<div className='flex justify-between text-text'>
										<span>Mahsulotlar ({cartItems.length})</span>
										<span className='font-medium'>{formatPrice(subtotal)}</span>
									</div>
									<div className='flex justify-between text-text'>
										<span>Yetkazib berish</span>
										<span className='font-medium'>
											{shippingCost === 0 ? (
												<span className='text-green-600'>Bepul</span>
											) : (
												formatPrice(shippingCost)
											)}
										</span>
									</div>
									{shippingCost > 0 && (
										<div className='flex items-start gap-2 p-3 bg-primary/10 rounded-lg'>
											<Truck className='w-5 h-5 text-primary flex-shrink-0 mt-0.5' />
											<p className='text-sm text-text'>
												{formatPrice(200000 - subtotal)} dan ko'proq xarid
												qiling va bepul yetkazib berishdan foydalaning!
											</p>
										</div>
									)}
									<div className='border-t border-border pt-4'>
										<div className='flex justify-between text-text'>
											<span className='text-lg font-bold'>Jami</span>
											<span className='text-xl font-bold text-primary'>
												{formatPrice(total)}
											</span>
										</div>
									</div>
								</div>

								<button className='w-full px-6 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors shadow-lg hover:shadow-xl'>
									Buyurtma berish
								</button>

								{/* Payment Methods */}
								<div className='mt-6 pt-6 border-t border-border'>
									<p className='text-text-muted text-sm text-center mb-3'>
										Qabul qilinadigan to'lov usullari
									</p>
									<div className='flex justify-center gap-3'>
										<div className='px-3 py-2 bg-light rounded-lg'>
											<span className='text-sm font-medium text-text'>
												Payme
											</span>
										</div>
										<div className='px-3 py-2 bg-light rounded-lg'>
											<span className='text-sm font-medium text-text'>
												Click
											</span>
										</div>
										<div className='px-3 py-2 bg-light rounded-lg'>
											<span className='text-sm font-medium text-text'>
												Naqd
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					/* Empty Cart State */
					<div className='bg-card rounded-2xl shadow-sm p-12 text-center'>
						<div className='w-24 h-24 bg-light rounded-full flex items-center justify-center mx-auto mb-6'>
							<ShoppingBag className='w-12 h-12 text-text-muted' />
						</div>
						<h2 className='text-2xl font-bold text-text mb-2'>
							Savatchangiz bo'sh
						</h2>
						<p className='text-text-muted mb-8 max-w-md mx-auto'>
							Hali hech qanday mahsulot qo'shilmagan. Mahsulotlarni ko'rib
							chiqing va sevimlilaringizni qo'shing.
						</p>
						<Link
							to='/products'
							className='inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors shadow-lg hover:shadow-xl'
						>
							<ShoppingBag className='w-5 h-5' />
							Xarid qilishni boshlash
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}
