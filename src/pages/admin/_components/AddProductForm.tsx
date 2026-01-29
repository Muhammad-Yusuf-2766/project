import { FolderPlus, Package } from 'lucide-react'
import { useState } from 'react'
import { CategoryType } from '../../../types'
import { CategoryForm, ProductForm } from './addforms'

interface AddProductFormProps {
	categories: CategoryType[]
}

type ActiveTab = 'product' | 'category'

export default function AddProductForm({ categories }: AddProductFormProps) {
	const [activeTab, setActiveTab] = useState<ActiveTab>('product')

	return (
		<div className='bg-card rounded-xl shadow-lg overflow-hidden'>
			{/* Tabs */}
			<div className='flex border-b border-border'>
				<button
					onClick={() => setActiveTab('product')}
					className={`flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base transition-colors ${
						activeTab === 'product'
							? 'bg-primary text-white'
							: 'bg-light text-text hover:bg-border'
					}`}
				>
					<Package className='w-4 h-4 sm:w-5 sm:h-5' />
					Mahsulot qo'shish
				</button>
				<button
					onClick={() => setActiveTab('category')}
					className={`flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base transition-colors ${
						activeTab === 'category'
							? 'bg-primary text-white'
							: 'bg-light text-text hover:bg-border'
					}`}
				>
					<FolderPlus className='w-4 h-4 sm:w-5 sm:h-5' />
					Kategoriya yaratish
				</button>
			</div>

			<div className='p-4 sm:p-6 md:p-8'>
				{/* Add Product Form */}
				{activeTab === 'product' && <ProductForm categories={categories} />}

				{/* Create Category Form */}
				{activeTab === 'category' && <CategoryForm categories={categories} />}
			</div>
		</div>
	)
}
