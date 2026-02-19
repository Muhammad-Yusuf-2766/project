import { useQuery } from '@tanstack/react-query'
import { ChevronRight, History, Package, ShoppingBag } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { TableSkeleton } from '../../components/Loader/Loading'
import { useAuth } from '../../context/AuthContext'
import { formatDate, formatPrice } from '../../lib/helpers'
import { fetchUserOrders } from '../../service/userApi'

const MyOrders = () => {
	const { user } = useAuth()
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed':
				return 'bg-green-100 text-green-700'
			case 'sending':
				return 'bg-blue-100 text-blue-700'
			case 'cancelled':
				return 'bg-red-100 text-red-700'
			default:
				return 'bg-gray-100 text-gray-700'
		}
	}

	const { data: ordersData, isLoading } = useQuery({
		queryKey: ['user-orders', user?._id],
		queryFn: async () => fetchUserOrders(),
		enabled: !!user,
	})

	const orders = ordersData?.orders || []

	const navigate = useNavigate()

	return (
		<div>
			{isLoading && <TableSkeleton rows={5} columns={1} />}
			{!isLoading && (
				<div className='bg-card rounded-2xl shadow-md p-6 lg:p-8'>
					<div className='flex items-center justify-between mb-6'>
						<h2 className='text-2xl font-bold text-text'>Buyurtmalar tarixi</h2>
						<Link
							to='/products'
							className='flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all'
						>
							Xarid qilish
							<ShoppingBag className='w-5 h-5' />
						</Link>
					</div>

					<div>
						{!isLoading && orders.length <= 0 && (
							<div className='text-center py-12'>
								<History className='w-16 h-16 text-text-muted mx-auto mb-4' />
								<h3 className='text-xl font-semibold text-text mb-2'>
									Buyurtmalar yo'q
								</h3>
								<p className='text-text-muted mb-6'>
									Siz hali hech qanday buyurtma bermadingiz
								</p>
								<Link
									to='/products'
									className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors'
								>
									<ShoppingBag className='w-5 h-5' />
									Xarid qilishni boshlash
								</Link>
							</div>
						)}

						{orders?.map(order => (
							<div
								key={order._id}
								onClick={() => navigate(`/orders/${order._id}`)}
								className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-light rounded-xl hover:border-primary hover:border cursor-pointer mt-1 gap-3 sm:gap-4'
							>
								<div className='flex items-center gap-3 sm:gap-4 w-full sm:w-auto'>
									<div className='p-2 sm:p-3 bg-primary/10 rounded-lg shrink-0'>
										<Package className='w-5 h-5 sm:w-6 sm:h-6 text-primary' />
									</div>
									<div className='min-w-0 flex-1'>
										<div className='font-semibold text-text text-sm sm:text-base truncate'>
											{order.items.length > 0
												? order.items.map(item => item.title).join(', ')
												: 'Buyurtma'}
										</div>
										<div className='text-text-muted text-xs sm:text-sm'>
											{formatDate(order.createdAt)} • {order.items.length} ta
											mahsulot
										</div>
									</div>
								</div>

								<div className='flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto'>
									<div className='text-left sm:text-right'>
										<div className='font-semibold text-text text-sm sm:text-base'>
											{formatPrice(order.totalPrice)}
										</div>
										<span
											className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(
												order.status,
											)}`}
										>
											{order.status}
										</span>
									</div>
									<ChevronRight className='w-5 h-5 text-text-muted shrink-0' />
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default MyOrders
