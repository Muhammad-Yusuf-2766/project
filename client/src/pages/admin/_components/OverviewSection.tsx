import { useQuery } from '@tanstack/react-query'
import {
	DollarSign,
	LucideTrendingDown,
	LucideTrendingUp,
	Package,
	TrendingUp,
	Users,
} from 'lucide-react'
import { useState } from 'react'
import { CartItemSkeleton } from '../../../components/Loader/Loading'
import { formatDate, formatPrice } from '../../../lib/helpers'
import { fetchAdminOverview, fetchAdminSales } from '../../../service/adminApi'

export default function OverviewSection() {
	const [selectedMonth] = useState<string | null>(null)

	const { data: overviewData, isLoading: isOverviewLoading } = useQuery({
		queryKey: ['admin-overview'],
		queryFn: fetchAdminOverview,
		staleTime: 60_000,
	})

	const { data: salesData, isLoading: isSalesLoading } = useQuery({
		queryKey: ['admin-sales', selectedMonth ?? 'all'],
		queryFn: () => fetchAdminSales(selectedMonth),
		staleTime: 30_000,
	})

	const overviewDataValue = overviewData?.overview || null
	const recentActivities = overviewData?.recentActivity || []

	const salesDataValue = salesData?.sales || null

	return (
		<div>
			{isOverviewLoading || (isSalesLoading && <CartItemSkeleton key={4} />)}
			{overviewDataValue && salesDataValue && (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
					{/* barcha mahsulotlar */}

					<div className='bg-card rounded-xl shadow-lg p-6 text-text-secondary'>
						<div className='flex items-center justify-between mb-4'>
							<div
								className={`w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center`}
							>
								<Package className='w-6 h-6 text-white' />
							</div>
						</div>
						<p className='text-sm mb-1'>Barcha mahsulotlar</p>
						<p className='text-3xl font-bold text-text'>
							{overviewDataValue?.totalProducts || 0}
						</p>
					</div>

					{/* barcha buyurtmalar */}
					<div className='bg-card rounded-xl shadow-lg p-6 text-text-secondary'>
						<div className='flex items-center justify-between mb-4'>
							<div
								className={`w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center`}
							>
								<Users className='w-6 h-6 text-white' />
							</div>
						</div>
						<p className='text-sm mb-1'>Barcha buyurtmalar</p>
						<p className='text-3xl font-bold text-text'>
							{overviewDataValue?.totalOrders || 0}
						</p>
					</div>

					{/* barcha savdo */}
					<div className='bg-card rounded-xl shadow-lg p-6 text-text-secondary'>
						<div className='flex items-center justify-between mb-4'>
							<div
								className={`w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center`}
							>
								<DollarSign className='w-6 h-6 text-white' />
							</div>
						</div>
						<p className='text-sm mb-1'>Barcha savdo</p>
						<p className='text-3xl font-bold text-text'>
							{formatPrice(salesDataValue?.totalSales || 0)}
						</p>
					</div>

					{/* O'sish */}
					<div className='bg-card rounded-xl shadow-lg p-6 text-text-secondary'>
						<div className='flex items-center justify-between mb-4'>
							<div
								className={`w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center`}
							>
								<TrendingUp className='w-6 h-6 text-white' />
							</div>
						</div>
						<p className='text-sm mb-1'>Savdo o'sishi</p>
						<p className='text-3xl font-bold text-text'>
							{salesDataValue?.growthPercent || 0}%
							{salesDataValue?.growthPercent &&
							salesDataValue.growthPercent > 1 ? (
								<LucideTrendingUp className='ml-5 inline-block w-5 h-5 text-green-500' />
							) : (
								<LucideTrendingDown className='ml-5 inline-block w-5 h-5 text-red-500' />
							)}
						</p>
					</div>
				</div>
			)}

			<div className='bg-card rounded-xl shadow-lg p-6 text-text'>
				<h2 className='text-2xl font-bold mb-6'>So'nggi faoliyat</h2>
				{isOverviewLoading && <CartItemSkeleton key={2} />}
				{!isOverviewLoading && recentActivities.length === 0 && (
					<p className='text-center text-text-muted py-10'>
						Hozircha faoliyat yo'q
					</p>
				)}

				{!isOverviewLoading && recentActivities.length > 0 && (
					<div className='space-y-4'>
						{recentActivities.map((activity, i) => (
							<div
								key={i}
								className='flex items-center p-4 bg-light rounded-lg'
							>
								<div className='w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4'>
									<Package className='w-5 h-5 text-primary' />
								</div>
								<div className='flex-1'>
									<p className='font-semibold'>{activity.message}</p>
									<p className='text-sm text-text-muted'>
										{typeof activity.detail === 'number'
											? formatPrice(activity.detail)
											: activity.detail === 'pending'
												? 'Buyurtma tayyorlanmoqda'
												: activity.detail === 'sending'
													? 'Yetkazib berilmoqda'
													: activity.detail}
									</p>
									<p className='text-sm text-text-muted'>
										{formatDate(activity.at)}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
