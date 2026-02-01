import { Package } from 'lucide-react'
import { stats } from '../../../constants'

export default function OverviewSection() {
	return (
		<div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
				{stats.map((stat, index) => {
					const Icon = stat.icon
					return (
						<div
							key={index}
							className='bg-card rounded-xl shadow-lg p-6 text-text-secondary'
						>
							<div className='flex items-center justify-between mb-4'>
								<div
									className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
								>
									<Icon className='w-6 h-6 text-white' />
								</div>
							</div>
							<p className='text-sm mb-1'>{stat.label}</p>
							<p className='text-3xl font-bold text-text'>{stat.value}</p>
						</div>
					)
				})}
			</div>

			<div className='bg-card rounded-xl shadow-lg p-6 text-text'>
				<h2 className='text-2xl font-bold mb-6'>So'nggi faoliyat</h2>
				<div className='space-y-4'>
					{[
						{ text: "Yangi mahsulot qo'shildi", time: '2 soat oldin' },
						{ text: 'Buyurtma tasdiqlandi', time: '4 soat oldin' },
						{ text: "Mahsulot ma'lumotlari yangilandi", time: '6 soat oldin' },
					].map((activity, i) => (
						<div key={i} className='flex items-center p-4 bg-light rounded-lg'>
							<div className='w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4'>
								<Package className='w-5 h-5 text-primary' />
							</div>
							<div className='flex-1'>
								<p className='font-semibold'>{activity.text}</p>
								<p className='text-sm text-text-muted'>{activity.time}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
