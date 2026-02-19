/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ArrowLeft,
	Loader2,
	MapPin,
	Minus,
	Plus,
	ShoppingBag,
	Trash2,
	Truck,
	X,
} from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../components/Loader/Loading'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../lib/helpers'
import { resolveImageUrl } from '../../lib/mediaUrl'
import { api } from '../../service/axiosinctance'
import { Order } from '../../types'

export default function Cart() {
	const { items, remove, updateQty, clear } = useCart()
	const { isLoggedIn, user } = useAuth()
	const navigate = useNavigate()

	const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
	const [addressInput, setAddressInput] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
	const shippingCost = subtotal >= 70000 ? 0 : 5000
	const total = subtotal + shippingCost

	const submitOrder = async (address: string) => {
		setIsSubmitting(true)
		try {
			const orderData = {
				fullName: user?.fullName || user?.fullName || '',
				items: items.map(item => ({
					productId: item._id,
					title: item.title,
					price: item.price,
					quantity: item.qty,
					unit: item.unit,
				})),
				subTotal: subtotal,
				deliveryPrice: shippingCost,
				totalPrice: total,
				address: address,
				customerPhone: user?.phone || '',
			}

			type Createorder = {
				order: Order
			}
			const res = await api.post<Createorder>('/api/user/order', orderData)
			const order = res.data.order
			if (!order) return

			toast.success('Buyurtma muvaffaqiyatli yuborildi!')
			clear()
			navigate(`/orders/${order._id}`)
		} catch (error) {
			toast.error('Buyurtma yuborishda xatolik yuz berdi')
		} finally {
			setIsSubmitting(false)
			setIsAddressModalOpen(false)
			setIsConfirmModalOpen(false)
		}
	}

	const checkout = async () => {
		if (!isLoggedIn) {
			toast.error('Sotib olish uchun avval login qiling')
			return navigate('/login', { state: { redirectTo: '/cart' } })
		}

		const userAddress = user?.address?.trim()

		if (!userAddress) {
			setAddressInput('')
			setIsAddressModalOpen(true)
		} else {
			setIsConfirmModalOpen(true)
		}
	}

	const handleAddressSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!addressInput.trim()) {
			toast.error('Iltimos, manzilni kiriting')
			return
		}
		submitOrder(addressInput.trim())
	}

	const handleConfirmAddress = () => {
		submitOrder(user?.address || '')
	}

	const handleUseNewAddress = () => {
		setIsConfirmModalOpen(false)
		setAddressInput('')
		setIsAddressModalOpen(true)
	}

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
						<h1 className='md:text-3xl text-lg font-bold text-text'>
							Savatcha
						</h1>
						<p className='text-text-muted'>{items.length} ta mahsulot</p>
					</div>
				</div>

				{items.length > 0 ? (
					<div className='grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
						{/* Cart Items */}
						<div className='lg:col-span-2 space-y-3 sm:space-y-4'>
							{items.map(item => (
								<div
									key={item._id}
									className='bg-card rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 md:p-6'
								>
									<div className='flex gap-3 sm:gap-4'>
										{/* Product Image */}
										<div className='shrink-0'>
											<img
												loading='lazy'
												src={
													resolveImageUrl(item.images?.[0]) ||
													'/placeholder.svg'
												}
												alt={item.title}
												className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-lg sm:rounded-xl object-cover'
											/>
										</div>

										{/* Product Details */}
										<div className='flex-1 min-w-0'>
											<div className='flex justify-between items-start gap-2'>
												<div className='min-w-0'>
													<h3 className='text-text font-semibold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1 line-clamp-1'>
														{item.title}
													</h3>
													<p className='text-primary font-bold text-sm sm:text-base'>
														{formatPrice(item.price)} / {item.qty}-{item.unit}
													</p>
												</div>
												<button
													onClick={() => remove(item._id)}
													className='p-1.5 sm:p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0'
												>
													<Trash2 className='w-4 h-4 sm:w-5 sm:h-5' />
												</button>
											</div>

											{/* Quantity Controls & Line Total */}
											<div className='flex items-center justify-between mt-2 sm:mt-3 md:mt-4'>
												<div className='flex items-center gap-2 sm:gap-3'>
													<button
														onClick={() => updateQty(item._id, item.qty - 1)}
														className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center bg-light rounded-md sm:rounded-lg hover:bg-border transition-colors'
													>
														<Minus className='w-3 h-3 sm:w-4 sm:h-4 text-text' />
													</button>
													<span className='w-6 sm:w-8 text-center font-semibold text-text text-sm sm:text-base'>
														{item.qty}
													</span>
													<button
														onClick={() => updateQty(item._id, item.qty + 1)}
														className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center bg-primary text-white rounded-md sm:rounded-lg hover:bg-primary-hover transition-colors'
													>
														<Plus className='w-3 h-3 sm:w-4 sm:h-4' />
													</button>
												</div>
												<div className='text-right'>
													<p className='text-text-muted text-[10px] sm:text-xs md:text-sm'>
														Jami
													</p>
													<p className='text-text font-bold text-sm sm:text-base md:text-lg'>
														{formatPrice(item.price * item.qty)}
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
								className='inline-flex items-center gap-2 text-primary font-semibold text-sm sm:text-base hover:gap-3 transition-all mt-2 sm:mt-4'
							>
								<ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
								Xarid qilishni davom ettirish
							</Link>
						</div>

						{/* Order Summary */}
						<div className='lg:col-span-1'>
							<div className='bg-card rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 sticky top-20 sm:top-24'>
								<h2 className='text-lg sm:text-xl font-bold text-text mb-4 sm:mb-6'>
									Buyurtma xulosasi
								</h2>

								<div className='space-y-3 sm:space-y-4 mb-4 sm:mb-6'>
									<div className='flex justify-between text-text text-sm sm:text-base'>
										<span>Mahsulotlar ({items.length})</span>
										<span className='font-medium'>{formatPrice(subtotal)}</span>
									</div>
									<div className='flex justify-between text-text text-sm sm:text-base'>
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
										<div className='flex items-start gap-2 p-2 sm:p-3 bg-primary/10 rounded-lg'>
											<Truck className='w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5' />
											<p className='text-xs sm:text-sm text-text'>
												{formatPrice(70000 - subtotal)} dan ko{"'"}proq xarid
												qiling va bepul yetkazib berishdan foydalaning!
											</p>
										</div>
									)}
									<div className='border-t border-border pt-3 sm:pt-4'>
										<div className='flex justify-between text-text'>
											<span className='text-base sm:text-lg font-bold'>
												Jami
											</span>
											<span className='text-lg sm:text-xl font-bold text-primary'>
												{formatPrice(total)}
											</span>
										</div>
									</div>
								</div>

								<button
									onClick={checkout}
									className='w-full px-4 sm:px-6 py-3 sm:py-4 bg-primary text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-primary-hover transition-colors shadow-lg hover:shadow-xl'
								>
									Buyurtma berish
								</button>

								{/* Payment Methods */}
								{/* <div className='mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border'>
									<p className='text-text-muted text-xs sm:text-sm text-center mb-2 sm:mb-3'>
										Qabul qilinadigan to{"'"}lov usullari
									</p>
									<div className='flex justify-center gap-2 sm:gap-3'>
										<div className='px-2 sm:px-3 py-1.5 sm:py-2 bg-light rounded-md sm:rounded-lg'>
											<span className='text-xs sm:text-sm font-medium text-text'>
												Payme
											</span>
										</div>
										<div className='px-2 sm:px-3 py-1.5 sm:py-2 bg-light rounded-md sm:rounded-lg'>
											<span className='text-xs sm:text-sm font-medium text-text'>
												Click
											</span>
										</div>
										<div className='px-2 sm:px-3 py-1.5 sm:py-2 bg-light rounded-md sm:rounded-lg'>
											<span className='text-xs sm:text-sm font-medium text-text'>
												Naqd
											</span>
										</div>
									</div>
								</div> */}
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
							Savatchangiz bo{"'"}sh
						</h2>
						<p className='text-text-muted mb-8 max-w-md mx-auto'>
							Hali hech qanday mahsulot qo{"'"}shilmagan. Mahsulotlarni ko{"'"}
							rib chiqing va sevimlilaringizni qo{"'"}shing.
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

			{/* Address Input Modal */}
			{isAddressModalOpen && (
				<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
					<div className='bg-card rounded-xl max-w-md w-full'>
						{/* Header */}
						<div className='flex items-center justify-between p-6 border-b border-border'>
							<div className='flex items-center gap-3'>
								<div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
									<MapPin className='w-5 h-5 text-primary' />
								</div>
								<h3 className='text-xl font-bold text-text'>
									Yetkazib berish manzili
								</h3>
							</div>
							<button
								onClick={() => setIsAddressModalOpen(false)}
								className='text-text-muted hover:text-text transition-colors'
							>
								<X className='w-6 h-6' />
							</button>
						</div>

						{/* Form */}
						<form onSubmit={handleAddressSubmit} className='p-6 space-y-5'>
							<p className='text-text-muted text-sm'>
								Buyurtmangizni yetkazib berish uchun to{"'"}liq manzilni
								kiriting (Koreya manzili formatida).
							</p>

							<div>
								<label className='block text-sm font-semibold text-text mb-2'>
									To{"'"}liq manzil
								</label>
								<textarea
									value={addressInput}
									onChange={e => setAddressInput(e.target.value)}
									rows={4}
									placeholder='예: 서울특별시 강남구 테헤란로 123, 아파트 456호'
									className='w-full px-4 py-3 border border-border rounded-lg bg-light text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none resize-none'
									required
								/>
								<p className='text-xs text-text-muted mt-2'>
									Misol: 서울특별시 강남구 테헤란로 123, 아파트 456호
								</p>
							</div>

							{/* Actions */}
							<div className='flex gap-3 pt-2'>
								<button
									type='submit'
									disabled={isSubmitting}
									className='flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
								>
									{isSubmitting ? (
										<>
											<Loader2 className='w-4 h-4 animate-spin' />
											Yuborilmoqda...
										</>
									) : (
										'Buyurtma berish'
									)}
								</button>
								<button
									type='button'
									onClick={() => setIsAddressModalOpen(false)}
									disabled={isSubmitting}
									className='px-6 py-3 bg-light text-text rounded-lg font-semibold hover:bg-border transition-colors disabled:opacity-50'
								>
									Bekor qilish
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Address Confirmation Modal */}
			{isConfirmModalOpen && (
				<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
					<div className='bg-card rounded-xl max-w-md w-full'>
						{/* Header */}
						<div className='flex items-center justify-between p-6 border-b border-border'>
							<div className='flex items-center gap-3'>
								<div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
									<MapPin className='w-5 h-5 text-primary' />
								</div>
								<h3 className='text-xl font-bold text-text'>
									Manzilni tasdiqlang
								</h3>
							</div>
							<button
								onClick={() => setIsConfirmModalOpen(false)}
								className='text-text-muted hover:text-text transition-colors'
							>
								<X className='w-6 h-6' />
							</button>
						</div>

						{/* Content */}
						<div className='p-6 space-y-5'>
							<p className='text-text-muted text-sm'>
								Buyurtmangiz quyidagi manzilga yetkazib beriladi. Bu manzil to
								{"'"}g{"'"}rimi?
							</p>

							<div className='p-4 bg-light rounded-lg border border-border'>
								<p className='text-text font-medium'>{user?.address}</p>
							</div>

							{/* Actions */}
							<div className='flex flex-col gap-3 pt-2'>
								<button
									onClick={handleConfirmAddress}
									disabled={isSubmitting}
									className='w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
								>
									{isSubmitting ? (
										<>
											<Loading text='Yuborilmoqda...' className='w-4 h-4' />
										</>
									) : (
										"Ha, to'g'ri manzil"
									)}
								</button>
								<button
									onClick={handleUseNewAddress}
									disabled={isSubmitting}
									className='w-full px-6 py-3 bg-light text-text rounded-lg font-semibold hover:bg-border transition-colors disabled:opacity-50'
								>
									Boshqa manzil kiritish
								</button>
								<button
									onClick={() => setIsConfirmModalOpen(false)}
									disabled={isSubmitting}
									className='w-full px-6 py-3 text-text-muted hover:text-text transition-colors font-medium'
								>
									Bekor qilish
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
