import { ListCollapse, Plus } from 'lucide-react'

export type AdminTabType = 'overview' | 'products' | 'add-product' | 'orders'

interface AdminTabsProps {
	activeTab: AdminTabType
	onTabChange: (tab: AdminTabType) => void
}

export default function AdminTabs({ activeTab, onTabChange }: AdminTabsProps) {
	return (
		<div className='flex flex-wrap gap-4 mb-8'>
			<button
				onClick={() => onTabChange('overview')}
				className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-lg ${
					activeTab === 'overview'
						? 'bg-primary text-light'
						: 'bg-card hover:bg-light text-text'
				}`}
			>
				Umumiy
			</button>
			<button
				onClick={() => onTabChange('products')}
				className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-lg ${
					activeTab === 'products'
						? 'bg-primary text-light'
						: 'bg-card text-text hover:bg-light'
				}`}
			>
				Mahsulotlarni boshqarish
			</button>

			<button
				onClick={() => onTabChange('orders')}
				className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center shadow-lg ${
					activeTab === 'orders'
						? 'bg-primary text-white'
						: 'bg-card text-text hover:bg-light'
				}`}
			>
				<ListCollapse className='w-5 h-5 mr-2' />
				Buyurtmalar
			</button>

			<button
				onClick={() => onTabChange('add-product')}
				className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center shadow-lg ${
					activeTab === 'add-product'
						? 'bg-primary text-white'
						: 'bg-card text-text hover:bg-light'
				}`}
			>
				<Plus className='w-5 h-5 mr-2' />
				Mahsulot qo'shish
			</button>
		</div>
	)
}
