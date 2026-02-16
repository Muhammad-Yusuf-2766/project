'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	CheckCircle,
	ChevronDown,
	Clock,
	Eye,
	MapPin,
	Phone,
	Truck,
	X,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { TableSkeleton } from '../../../components/Loader/Loading'
import Pagination from '../../../components/Pagination'
import UndefinedData from '../../../components/UndefinedData'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import { formatDate, formatPrice } from '../../../lib/helpers'
import { updateOrderStatus } from '../../../service/adminApi'
import {
	fetchOrders,
	SortOrders,
	Statusorders,
} from '../../../service/apiProducts'
import { Order, OrderStatus } from '../../../types'
import TableHeaders from './TableHeaders'

/* ------------------------------------------------------------------ */
/*  Constants & Helpers                                                */
/* ------------------------------------------------------------------ */

const STATUS_CONFIG: Record<
	OrderStatus,
	{ label: string; bg: string; icon: React.ElementType }
> = {
	pending: {
		label: 'Kutilmoqda',
		bg: 'bg-amber-100 text-amber-700',
		icon: Clock,
	},
	sending: {
		label: 'Yetkazilmoqda',
		bg: 'bg-blue-100 text-blue-700',
		icon: Truck,
	},
	completed: {
		label: 'Yakunlangan',
		bg: 'bg-emerald-100 text-emerald-700',
		icon: CheckCircle,
	},
}

/* ------------------------------------------------------------------ */
/*  Status badge (plain span, no library)                              */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: OrderStatus }) {
	const cfg = STATUS_CONFIG[status]
	const Icon = cfg.icon
	return (
		<span
			className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${cfg.bg}`}
		>
			<Icon className='h-3.5 w-3.5' />
			{cfg.label}
		</span>
	)
}

/* ------------------------------------------------------------------ */
/*  Status changer dropdown (inline in row)                            */
/* ------------------------------------------------------------------ */

function StatusChanger({
	orderId,
	current,
	onStatusChange,
}: {
	orderId: string
	current: OrderStatus
	onStatusChange: (orderId: string, s: OrderStatus) => void
}) {
	const [open, setOpen] = useState(false)
	const cfg = STATUS_CONFIG[current]
	const Icon = cfg.icon

	const statuses: OrderStatus[] = ['pending', 'sending', 'completed']

	return (
		<div className='relative'>
			<button
				type='button'
				onClick={() => setOpen(v => !v)}
				className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium cursor-pointer ${cfg.bg}`}
			>
				<Icon className='h-3.5 w-3.5' />
				{cfg.label}
				<ChevronDown
					className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`}
				/>
			</button>

			{open && (
				<>
					<div className='fixed inset-0 z-40' onClick={() => setOpen(false)} />
					<ul className='absolute z-50 mt-1 left-0 min-w-[10rem] rounded-lg border border-border bg-card shadow-lg py-1'>
						{statuses.map(s => {
							const c = STATUS_CONFIG[s]
							const SIcon = c.icon
							return (
								<li key={s}>
									<button
										type='button'
										onClick={() => {
											onStatusChange(orderId, s)
											setOpen(false)
										}}
										className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-muted ${
											current === s ? 'bg-muted font-medium' : ''
										}`}
									>
										<SIcon className='h-3.5 w-3.5' />
										{c.label}
									</button>
								</li>
							)
						})}
					</ul>
				</>
			)}
		</div>
	)
}

/* ------------------------------------------------------------------ */
/*  Order detail modal (pure Tailwind, no library)                     */
/* ------------------------------------------------------------------ */

function OrderDetailModal({
	order,
	onClose,
}: {
	order: Order
	onClose: () => void
}) {
	// Close on Escape key
	useEffect(() => {
		function handleKey(e: KeyboardEvent) {
			if (e.key === 'Escape') onClose()
		}
		document.addEventListener('keydown', handleKey)
		return () => document.removeEventListener('keydown', handleKey)
	}, [onClose])

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
			onClick={onClose}
		>
			<div
				className='relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl bg-card shadow-2xl overflow-x-hidden'
				onClick={e => e.stopPropagation()}
				role='dialog'
				aria-modal='true'
				aria-label={`Buyurtma #${order._id}`}
			>
				{/* Header */}
				<div className='flex items-center justify-between p-5 border-b border-border'>
					<div className='flex-col items-center space-y-1.5'>
						<h3 className='text-lg font-bold text-foreground'>
							Buyurtma #{order._id}
						</h3>
						<StatusBadge status={order.status} />
					</div>
					<button
						onClick={onClose}
						className='p-1.5 rounded-full bg-gray-300'
						aria-label='Yopish'
					>
						<X className='h-5 w-5' />
					</button>
				</div>

				<div className='p-5 space-y-5'>
					{/* Customer info */}
					<div className='space-y-2'>
						<h4 className='text-xs font-semibold text-muted-foreground uppercase tracking-wide'>
							{"Mijoz ma'lumotlari"}
						</h4>
						<div className='space-y-1.5 text-sm text-foreground'>
							<p className='font-medium bg-blue-200 w-fit px-1'>
								{order.fullName}
							</p>
							<p className='flex items-center gap-2 text-muted-foreground bg-blue-200 w-fit px-1'>
								<Phone className='h-4 w-4' />
								{order.customerPhone}
							</p>
							<p className='flex items-start gap-2 text-muted-foreground bg-blue-200 w-fit px-1'>
								<MapPin className='h-4 w-4 shrink-0 mt-0.5' />
								{order.address}
							</p>
						</div>
					</div>

					{/* Items table */}
					<div className='space-y-2'>
						<h4 className='text-xs font-semibold text-muted-foreground uppercase tracking-wide'>
							Mahsulotlar
						</h4>
						<div className='rounded-lg border border-border overflow-hidden'>
							<table className='w-full text-sm'>
								<thead className='bg-muted/50'>
									<tr>
										<th className='px-3 py-2 text-left font-medium text-muted-foreground'>
											Nomi
										</th>
										<th className='px-3 py-2 text-center font-medium text-muted-foreground'>
											Miqdori
										</th>
										<th className='px-3 py-2 text-right font-medium text-muted-foreground'>
											Narxi
										</th>
										<th className='px-3 py-2 text-right font-medium text-muted-foreground'>
											Jami
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-border'>
									{order.items.map((item, idx) => (
										<tr key={idx}>
											<td className='px-3 py-2 font-medium text-foreground'>
												{item.title}
											</td>
											<td className='px-3 py-2 text-center text-muted-foreground'>
												{item.quantity} {item.unit}
											</td>
											<td className='px-3 py-2 text-right text-muted-foreground'>
												{formatPrice(item.price)}
												{item.originalPrice && (
													<span className='block text-xs line-through text-muted-foreground/60'>
														{formatPrice(item.originalPrice)}
													</span>
												)}
											</td>
											<td className='px-3 py-2 text-right font-medium text-foreground'>
												{formatPrice(
													item.subPrice ?? item.price * item.quantity,
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					{/* Price breakdown */}
					<div className='space-y-2'>
						<h4 className='text-xs font-semibold text-muted-foreground uppercase tracking-wide'>
							Hisob-kitob
						</h4>
						<div className='rounded-lg border border-border p-4 space-y-2 text-sm'>
							<div className='flex justify-between'>
								<span className='text-muted-foreground'>Mahsulotlar jami</span>
								<span className='font-medium text-foreground'>
									{formatPrice(order.subTotal)}
								</span>
							</div>
							<div className='flex justify-between'>
								<span className='flex items-center gap-1.5 text-muted-foreground'>
									<Truck className='h-3.5 w-3.5' />
									Yetkazib berish
								</span>
								<span className='font-medium text-foreground'>
									{formatPrice(order.deliveryPrice)}
								</span>
							</div>
							<div className='border-t border-border pt-2 flex justify-between font-semibold text-foreground'>
								<span>Umumiy summa</span>
								<span className='text-base'>
									{formatPrice(order.totalPrice)}
								</span>
							</div>
						</div>
					</div>

					{/* Dates */}
					<div className='flex items-center justify-between text-xs text-muted-foreground pt-1'>
						<span>Yaratilgan: {formatDate(order.createdAt)}</span>
						<span>Yangilangan: {formatDate(order.updatedAt)}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

/* ------------------------------------------------------------------ */
/*  Main OrdersTable                                                   */
/* ------------------------------------------------------------------ */

export default function OrdersTable() {
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedSearchQuery = useDebouncedValue(searchQuery, 500)
	const [statusFilter, setStatusFilter] = useState('all')
	const [sort, setSort] = useState('newest')
	const [page, setPage] = useState(1)
	const pageSize = 15
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

	// qaysi param o'zgarsa page 1 bo'lsin (UX)
	useEffect(() => {
		setPage(1)
	}, [debouncedSearchQuery, statusFilter, sort])

	// Reset page on filter change
	const params = useMemo(
		() => ({
			searchQuery: debouncedSearchQuery,
			status: statusFilter as Statusorders,
			sort: sort as SortOrders,
			page,
			pageSize,
		}),
		[debouncedSearchQuery, sort, statusFilter, page, pageSize],
	)

	const { data, isLoading } = useQuery({
		queryKey: ['orders', params],
		queryFn: () => fetchOrders(params),
		placeholderData: prev => prev, // keepPreviousData (v5 uslub)
		staleTime: 60_000,
	})

	const handleViewDetails = useCallback((order: Order) => {
		setSelectedOrder(order)
	}, [])

	const orders = data?.orders ?? []
	const totalOrders = data?.meta?.total ?? 0
	const totalPages = Math.ceil(totalOrders / pageSize)

	const STATUS_FILTERS: { value: string; label: string }[] = [
		{ value: 'all', label: 'Barchasi' },
		{ value: 'pending', label: 'Kutilmoqda' },
		{ value: 'sending', label: 'Yetkazilmoqda' },
		{ value: 'completed', label: 'Yakunlangan' },
	]

	const SORT_OPTIONS: { value: string; label: string }[] = [
		{ value: 'newest', label: 'Yangi' },
		{ value: 'oldest', label: 'Eski' },
		{ value: 'highest', label: 'Narx (yuqori)' },
		{ value: 'lowest', label: 'Narx (past)' },
	]

	const queryClient = useQueryClient()

	const updateStatusMutation = useMutation({
		mutationFn: ({
			orderId,
			newStatus,
		}: {
			orderId: string
			newStatus: OrderStatus
		}) => updateOrderStatus(orderId, newStatus),

		onSuccess: res => {
			toast.success('Buyurtma holati yangilandi')
			// siz aytgandek: 200 bo'lsa qayta chaqirish
			if (res.status === 200) {
				// 1) faqat orders query ni qayta olib keladi
				queryClient.invalidateQueries({ queryKey: ['orders'] })
				// yoki aniq shu params bo'yicha:
				// queryClient.invalidateQueries({ queryKey: ['orders', params] })
			}
		},
	})

	async function onStatusChange(orderId: string, newStatus: OrderStatus) {
		updateStatusMutation.mutate({ orderId, newStatus })
	}

	return (
		<>
			<div className='bg-card rounded-xl shadow-lg overflow-visible text-foreground'>
				{/* Header */}
				<TableHeaders
					header='Buyurtmalarni boshqarish'
					searchQuery={searchQuery}
					filterOptions={STATUS_FILTERS}
					sortOptions={SORT_OPTIONS}
					onSearchChange={setSearchQuery}
					filter={statusFilter}
					onFilterChange={setStatusFilter}
					sort={sort}
					onSortChange={setSort}
				/>

				{/* Table */}
				<div className='overflow-x-auto'>
					{isLoading && <TableSkeleton columns={6} rows={5} />}

					{!isLoading && orders.length === 0 && (
						<UndefinedData header='Buyurtmalar topilmadi' />
					)}

					{!isLoading && orders.length > 0 && (
						<table className='w-full table-fixed'>
							<thead className='bg-light'>
								<tr>
									<th className='w-[24%] px-6 py-4 text-left text-sm font-semibold text-muted-foreground'>
										Mijoz
									</th>
									<th className='w-[18%] px-6 py-4 text-left text-sm font-semibold text-muted-foreground'>
										Mahsulotlar
									</th>
									<th className='w-[14%] px-6 py-4 text-left text-sm font-semibold text-muted-foreground'>
										Summa
									</th>
									<th className='w-[14%] px-6 py-4 text-left text-sm font-semibold text-muted-foreground'>
										Holati
									</th>
									<th className='w-[16%] px-6 py-4 text-left text-sm font-semibold text-muted-foreground'>
										Sana
									</th>
									<th className='w-[14%] px-6 py-4 text-left text-sm font-semibold text-muted-foreground'>
										Amallar
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-border'>
								{orders.map(order => (
									<tr key={order._id} className='hover:bg-light'>
										{/* Customer */}
										<td className='px-6 py-4'>
											<div className='min-w-0'>
												<p className='font-semibold truncate'>
													{order.fullName}
												</p>
												<p className='flex items-center gap-1 text-xs text-muted-foreground mt-0.5'>
													<Phone className='h-3 w-3' />
													<span className='truncate'>
														{order.customerPhone}
													</span>
												</p>
												<p className='flex items-start gap-1 text-xs text-muted-foreground mt-0.5'>
													<MapPin className='h-3 w-3 shrink-0 mt-0.5' />
													<span className='truncate'>{order.address}</span>
												</p>
											</div>
										</td>

										{/* Items summary */}
										<td className='px-6 py-4'>
											<div className='space-y-0.5'>
												{order.items.slice(0, 2).map((item, idx) => (
													<p key={idx} className='text-sm truncate'>
														{item.title}{' '}
														<span className='text-muted-foreground'>
															x{item.quantity}
														</span>
													</p>
												))}
												{order.items.length > 2 && (
													<p className='text-xs text-muted-foreground'>
														+{order.items.length - 2} ta mahsulot
													</p>
												)}
											</div>
										</td>

										{/* Price */}
										<td className='px-6 py-4'>
											<p className='font-semibold text-sm'>
												{formatPrice(order.totalPrice)}
											</p>
											{order.deliveryPrice > 0 && (
												<p className='text-xs text-muted-foreground'>
													Yetkazish: {formatPrice(order.deliveryPrice)}
												</p>
											)}
										</td>

										{/* Status */}
										<td className='px-6 py-4'>
											{onStatusChange ? (
												<StatusChanger
													orderId={order._id}
													current={order.status}
													onStatusChange={onStatusChange}
												/>
											) : (
												<StatusBadge status={order.status} />
											)}
										</td>

										{/* Date */}
										<td className='px-6 py-4 text-sm text-muted-foreground'>
											{formatDate(order.createdAt)}
										</td>

										{/* Actions */}
										<td className='px-6 py-4'>
											<button
												onClick={() => handleViewDetails(order)}
												className='inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors'
											>
												<Eye className='h-4 w-4' />
												Batafsil
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>

				{/* Pagination */}
				{!isLoading && totalPages > 1 && (
					<Pagination
						header='buyurtma'
						page={page}
						totalPages={totalPages}
						totalOrders={totalOrders}
						setPage={setPage}
					/>
				)}
			</div>

			{/* Detail modal */}
			{selectedOrder && (
				<OrderDetailModal
					order={selectedOrder}
					onClose={() => setSelectedOrder(null)}
				/>
			)}
		</>
	)
}
