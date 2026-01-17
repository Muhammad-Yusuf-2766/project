import {
	Award,
	Beef,
	ChefHat,
	Clock,
	Shield,
	ShoppingCart,
	Wheat,
} from 'lucide-react'
import { Link } from 'react-router-dom'

// <CHANGE> Removed HomeProps interface and onNavigate prop

export default function Home() {
	const categories = [
		{
			name: 'Beef',
			icon: Beef,
			image:
				'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=400',
			description: 'Premium quality halal beef',
		},
		{
			name: 'Mutton',
			icon: Beef,
			image:
				'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
			description: 'Fresh halal mutton',
		},
		{
			name: 'Chicken',
			icon: ChefHat,
			image:
				'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
			description: 'Farm-fresh halal chicken',
		},
		{
			name: 'Bread',
			icon: Wheat,
			image:
				'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
			description: 'Freshly baked daily',
		},
	]

	const features = [
		{
			icon: Shield,
			title: '100% Halal Certified',
			description:
				'All products are certified halal and meet the highest standards',
		},
		{
			icon: Clock,
			title: 'Fresh Daily',
			description: 'Products delivered fresh every day from trusted sellers',
		},
		{
			icon: Award,
			title: 'Quality Guaranteed',
			description: 'We ensure the highest quality standards for all products',
		},
	]

	return (
		<div className='min-h-screen bg-white'>
			<div
				className='relative bg-gradient-to-r from-emerald-600 to-emerald-500 text-white'
				style={{
					backgroundImage:
						'linear-gradient(#14141490, #14141499), url(https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32'>
					<div className='max-w-3xl'>
						<h1 className='text-3xl md:text-6xl font-bold mb-6 leading-tight'>
							Premium Halal Products, Delivered Fresh
						</h1>
						<p className='text-xl md:text-2xl mb-8 text-emerald-50'>
							Connect with trusted sellers offering the finest halal meats,
							fresh bread, and quality products for your family.
						</p>
						<div className='flex flex-col sm:flex-row gap-4'>
							{/* <CHANGE> Replaced button with Link */}
							<Link
								to='/products'
								className='px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-center'
							>
								Browse Products
							</Link>
							<button className='px-8 py-4 bg-emerald-700 text-white rounded-lg font-semibold text-lg hover:bg-emerald-800 transition-all shadow-lg'>
								Become a Seller
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='text-center mb-12'>
					<h2 className='text-4xl font-bold text-gray-900 mb-4'>
						Shop by Category
					</h2>
					<p className='text-xl text-gray-600'>
						Explore our wide range of halal products
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{categories.map((category, index) => {
						const Icon = category.icon
						return (
							// <CHANGE> Replaced div onClick with Link
							<Link
								to='/products'
								key={index}
								className='group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105'
							>
								<div className='relative h-48 overflow-hidden'>
									<img
										src={category.image || '/placeholder.svg'}
										alt={category.name}
										className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
									<div className='absolute bottom-4 left-4 text-white'>
										<Icon className='w-8 h-8 mb-2' />
										<h3 className='text-2xl font-bold'>{category.name}</h3>
									</div>
								</div>
								<div className='p-6'>
									<p className='text-gray-600'>{category.description}</p>
									<span className='mt-4 text-emerald-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform'>
										Shop Now
										<ShoppingCart className='w-4 h-4 ml-2' />
									</span>
								</div>
							</Link>
						)
					})}
				</div>
			</div>

			<div className='bg-gray-50 py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h2 className='text-4xl font-bold text-gray-900 mb-4'>
							Why Choose Ansor Market?
						</h2>
						<p className='text-xl text-gray-600'>
							Your trusted partner for quality halal products
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{features.map((feature, index) => {
							const Icon = feature.icon
							return (
								<div
									key={index}
									className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow'
								>
									<div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6'>
										<Icon className='w-8 h-8 text-emerald-600' />
									</div>
									<h3 className='text-2xl font-bold text-gray-900 mb-4'>
										{feature.title}
									</h3>
									<p className='text-gray-600 leading-relaxed'>
										{feature.description}
									</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>

			<div className='bg-emerald-600 text-white py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-4xl font-bold mb-4'>Ready to Start Selling?</h2>
					<p className='text-xl text-emerald-50 mb-8 max-w-2xl mx-auto'>
						Join our community of trusted sellers and reach thousands of
						customers looking for quality halal products.
					</p>
					<button className='px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105'>
						Register as Seller
					</button>
				</div>
			</div>
		</div>
	)
}
