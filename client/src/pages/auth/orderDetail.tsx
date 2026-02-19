'use client'

import { useQuery } from '@tanstack/react-query'
import {
	ArrowLeft,
	Clock,
	Copy,
	CreditCard,
	MapPin,
	Package,
	Phone,
	ShoppingBag,
	Truck,
	User,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Reveal } from '../../components/UI/Reveal'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { formatDate, formatPrice } from '../../lib/helpers'
import { fetchOrder } from '../../service/userApi'
import { OrderStatus } from '../../types'

// ─── Status pipeline ──────────────────────────────────────────────────────────

const STATUS_STEPS: {
	key: OrderStatus
	label: string
	icon: React.ReactNode
}[] = [
	{
		key: 'pending',
		label: 'Qabul qilindi',
		icon: <ShoppingBag className='w-4 h-4' />,
	},
	{
		key: 'sending',
		label: 'Yetkazilmoqda',
		icon: <Truck className='w-4 h-4' />,
	},
	{
		key: 'completed',
		label: 'Yetkazildi',
		icon: <Package className='w-4 h-4' />,
	},
	// {
	// 	key: 'delivered',
	// 	label: 'Yetkazildi',
	// 	icon: <CheckCircle2 className='w-4 h-4' />,
	// },
]

const STATUS_ORDER: Record<OrderStatus, number> = {
	pending: 0,
	sending: 1,
	completed: 2,
	// delivered: 3,
	// cancelled: -1,
}

function StatusTracker({ status }: { status: OrderStatus }) {
	// if (status === '') {
	// 	return (
	// 		<div className='flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100'>
	// 			<XCircle className='w-5 h-5 text-red-500 shrink-0' />
	// 			<div>
	// 				<p className='font-semibold text-red-600'>Buyurtma bekor qilindi</p>
	// 				<p className='text-sm text-red-400'>Ushbu buyurtma bekor qilingan</p>
	// 			</div>
	// 		</div>
	// 	)
	// }

	const currentStep = STATUS_ORDER[status]

	return (
		<div className='relative'>
			{/* Connecting line */}
			<div className='absolute top-5 left-5 right-5 h-0.5 bg-light hidden sm:block' />
			<div
				className='absolute top-5 left-5 h-0.5 bg-primary hidden sm:block transition-all duration-700'
				style={{ width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` }}
			/>

			<div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 relative'>
				{STATUS_STEPS.map((step, i) => {
					const isDone = i <= currentStep
					const isCurrent = i === currentStep

					return (
						<div
							key={step.key}
							className='flex sm:flex-col items-center gap-3 sm:gap-2 sm:flex-1'
						>
							<div
								className={`
									w-10 h-10 rounded-full flex items-center justify-center shrink-0
									transition-all duration-300 z-10
									${
										isDone
											? 'bg-primary text-white shadow-md shadow-primary/30'
											: 'bg-light text-text-muted'
									}
									${isCurrent ? 'ring-4 ring-primary/20 scale-110' : ''}
								`}
							>
								{step.icon}
							</div>
							<span
								className={`text-xs sm:text-center font-medium transition-colors ${
									isDone ? 'text-primary' : 'text-text-muted'
								}`}
							>
								{step.label}
							</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}

// ─── Info row ─────────────────────────────────────────────────────────────────

function InfoRow({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode
	label: string
	value: string
}) {
	return (
		<div className='flex items-start gap-3'>
			<div className='p-2 bg-primary/10 rounded-lg shrink-0 mt-0.5'>{icon}</div>
			<div className='min-w-0'>
				<p className='text-xs text-text-muted mb-0.5'>{label}</p>
				<p className='font-medium text-text text-sm leading-snug'>{value}</p>
			</div>
		</div>
	)
}

// ─── Order Detail Page ────────────────────────────────────────────────────────

export default function OrderDetailPage() {
	const { id } = useParams<{ id: string }>()
	const accountNumber = '1000-5982-9483'
	const [copied, setCopied] = useState(false)

	const { data: orderData, isLoading } = useOrder(id!)
	useScrollReveal([orderData?.order?._id])

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed':
				return 'bg-green-100 text-green-700'
			case 'sending':
				return 'bg-blue-100 text-blue-700'
			default:
				return 'bg-light text-text'
		}
	}

	const order = orderData?.order

	if (isLoading) return <OrderDetailSkeleton />
	if (!order) return <OrderNotFound />

	const handleCopy = async () => {
		try {
			const removedSlash = accountNumber.replace(/-/g, '')
			await navigator.clipboard.writeText(removedSlash)
			setCopied(true)
			setTimeout(() => setCopied(false), 5000)
		} catch {
			// Fallback (ba'zi browserlarda clipboard blok bo'lishi mumkin)
			const ta = document.createElement('textarea')
			ta.value = accountNumber
			document.body.appendChild(ta)
			ta.select()
			document.execCommand('copy')
			document.body.removeChild(ta)

			setCopied(true)
			setTimeout(() => setCopied(false), 1200)
		}
	}

	return (
		<div className='min-h-screen bg-background'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-5'>
				{/* Back button */}
				<Reveal animation='fade' duration='0.4s'>
					<Link
						to='/profile'
						className='inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm font-medium group'
					>
						<ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
						Buyurtmalarga qaytish
					</Link>
				</Reveal>

				<div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
					{/* Order Details */}
					<div className='flex-col space-y-5 col-span-2'>
						{/* Header */}
						<Reveal delay='50ms'>
							<div className='bg-card rounded-2xl shadow-md p-6'>
								<div className='flex items-start justify-between gap-4'>
									<div>
										<h1 className='text-xl sm:text-2xl font-bold text-text mb-1'>
											Buyurtma #{order._id.slice(-6).toUpperCase()}
										</h1>
										<div className='flex items-center gap-2 text-text-muted text-sm'>
											<Clock className='w-4 h-4' />
											{formatDate(order.createdAt)}
										</div>
									</div>
									<span
										className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 ${getStatusColor(
											order.status,
										)}`}
									>
										{order.status === 'pending'
											? 'Buyurtma jo`natilmoqda'
											: order.status === 'sending'
												? 'Buyurtma yetkazilmoqda'
												: 'Buyurtma yetkazildi'}
									</span>
								</div>
							</div>
						</Reveal>

						{/* Status tracker */}
						<Reveal delay='100ms'>
							<div className='bg-card rounded-2xl shadow-md p-6'>
								<h2 className='text-base font-semibold text-text mb-5'>
									Buyurtma holati
								</h2>
								<StatusTracker status={order.status} />
							</div>
						</Reveal>

						{/* Order items */}
						<Reveal delay='150ms'>
							<div className='bg-card rounded-2xl shadow-md p-6'>
								<h2 className='text-base font-semibold text-text mb-4'>
									Mahsulotlar ({order.items.length} ta)
								</h2>

								<div className='space-y-3'>
									{order.items.map((item, i) => (
										<Reveal key={item.productId ?? i} delay={`${i * 60}ms`}>
											<div className='flex items-center gap-3 p-3 bg-light rounded-xl'>
												{/* Product image or fallback */}

												<div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0'>
													<Package className='w-5 h-5 text-primary' />
												</div>

												<div className='flex-1 min-w-0'>
													<p className='font-medium text-text text-sm truncate'>
														{item.title}
													</p>
													<p className='text-text-muted text-xs mt-0.5'>
														{item.quantity} x {formatPrice(item.price)}
													</p>
												</div>

												<p className='font-semibold text-text text-sm shrink-0'>
													{formatPrice(item.price * item.quantity)}
												</p>
											</div>
										</Reveal>
									))}
								</div>
							</div>
						</Reveal>
					</div>
					{/* Price summary + Customer info side by side on desktop */}
					<div className='grid grid-cols-1 gap-y-5 h-fit'>
						{/* Price breakdown */}
						<Reveal delay='200ms'>
							<div className='bg-card rounded-2xl shadow-md p-6 h-full'>
								<h2 className='text-base font-semibold text-text mb-4 flex items-center gap-2'>
									<CreditCard className='w-4 h-4 text-primary' />
									To'lov ma'lumotlari
								</h2>

								<div className='space-y-3 text-sm'>
									<div className='flex justify-between text-text-muted'>
										<span>Mahsulotlar</span>
										<span>{formatPrice(order.subTotal)}</span>
									</div>
									<div className='flex justify-between text-text-muted'>
										<span>Yetkazib berish</span>
										<span>{formatPrice(order.deliveryPrice)}</span>
									</div>
									<div className='flex justify-between  text-text-muted'>
										<span>Jami</span>
										<span className='text-primary'>
											{formatPrice(order.totalPrice)}
										</span>
									</div>
									<div className='h-px bg-light' />

									{/* <div className='flex justify-between font-semibold text-text text-base'> */}
									<span className='text-base font-semibold text-text mb-4 flex items-center gap-2'>
										To'lov uchun karta raqam
									</span>
									{/* </div> */}
									<div className='flex justify-between  text-text-muted'>
										<span>Qabul qiluvchi</span>
										<span>Ansor Market</span>
									</div>
									<div className='flex justify-between text-blue-500'>
										<button
											type='button'
											onClick={handleCopy}
											className='flex gap-1 items-center hover:opacity-80'
											aria-label='Copy account number'
										>
											<Copy className='w-4 h-4 ml-2' />
											<span>{copied ? 'Copied' : 'Copy'}</span>
										</button>
										<div>
											<span>토스뱅크</span>
											<span className='text-blue-500'> {accountNumber}</span>
										</div>
									</div>
								</div>
							</div>
						</Reveal>

						{/* Customer info */}
						<Reveal delay='250ms'>
							<div className='bg-card rounded-2xl shadow-md p-6 h-full'>
								<h2 className='text-base font-semibold text-text mb-4'>
									Mijoz ma'lumotlari
								</h2>

								<div className='space-y-3'>
									<InfoRow
										icon={<User className='w-4 h-4 text-primary' />}
										label='Ism'
										value={order.fullName}
									/>
									<InfoRow
										icon={<Phone className='w-4 h-4 text-primary' />}
										label='Telefon'
										value={order.customerPhone}
									/>
									<InfoRow
										icon={<MapPin className='w-4 h-4 text-primary' />}
										label='Manzil'
										value={order.address}
									/>
								</div>
							</div>
						</Reveal>
					</div>
				</div>
			</div>
		</div>
	)
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function OrderDetailSkeleton() {
	return (
		<div className='max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5 animate-pulse'>
			<div className='h-4 w-40 bg-light rounded-lg' />
			{[160, 120, 220, 100].map((h, i) => (
				<div key={i} className='bg-card rounded-2xl shadow-md p-6'>
					<div
						className={`h-${h === 100 ? '24' : h === 120 ? '16' : h === 160 ? '20' : '32'} bg-light rounded-xl`}
					/>
				</div>
			))}
		</div>
	)
}

// ─── Not found ────────────────────────────────────────────────────────────────

function OrderNotFound() {
	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
			<div className='text-center'>
				<Package className='w-16 h-16 text-text-muted mx-auto mb-4' />
				<h2 className='text-xl font-bold text-text mb-2'>Buyurtma topilmadi</h2>
				<p className='text-text-muted mb-6'>
					Bu buyurtma mavjud emas yoki o'chirilgan
				</p>
				<Link
					to='/profile'
					className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors'
				>
					<ArrowLeft className='w-4 h-4' />
					Profilga qaytish
				</Link>
			</div>
		</div>
	)
}

export const useOrder = (id: string) =>
	useQuery({
		queryKey: ['order', id],
		queryFn: () => fetchOrder(id), // your existing API call
	})
