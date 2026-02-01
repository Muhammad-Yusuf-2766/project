import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Categories } from '../../constants'

// type Props = {
// 	categories: CategoryType[]
// }

export default function CategoriesSection() {
	console.log('')
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-text'>
			<div className='text-center mb-12'>
				<h2 className='text-4xl font-bold mb-4'>
					Kategoriyalar bo'yicha xarid qiling
				</h2>
				<p className='text-xl text-text-secondary'>
					Halol mahsulotlar ro'yhati bilan tanishing
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
				{Categories.map((category, index) => {
					const Icon = category.icon
					return (
						<Link
							to='/products'
							key={index}
							className='group bg-card hover:bg-light cursor-pointer rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105'
						>
							<div className='relative h-48 overflow-hidden'>
								<img
									src={category.image || '/placeholder.svg'}
									alt={category.title}
									className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
								/>
								<div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent'></div>
								<div className='absolute bottom-4 left-4 text-white'>
									<Icon className='w-8 h-8 mb-2' />
									<h3 className='text-2xl font-bold'>{category.title}</h3>
								</div>
							</div>
							<div className='p-6'>
								<p className='text-gray-600'>{category.description}</p>
								<span className='mt-4 text-primary font-semibold flex items-center group-hover:translate-x-2 transition-transform'>
									Harid qilish
									<ShoppingCart className='w-4 h-4 ml-2' />
								</span>
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
